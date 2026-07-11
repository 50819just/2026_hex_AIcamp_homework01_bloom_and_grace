import http from 'node:http'
import { URL } from 'node:url'
import { appConfig } from './config.js'
import { createCheckoutPayload, queryTradeInfo, verifyCheckMacValue } from './ecpay.js'
import { readEcpayOrder, upsertEcpayOrder } from './ecpayOrderStore.js'
import { normalizeProductPayload, validateProductPayload } from './productHelpers.js'
import { readProducts, writeProducts } from './productStore.js'
import { readMembers } from './memberStore.js'

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })

  response.end(JSON.stringify(data))
}

function sendText(response, statusCode, text, headers = {}) {
  response.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    ...headers,
  })
  response.end(text)
}

function collectBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      resolve(body)
    })

    request.on('error', reject)
  })
}

function parseRequestBody(body, contentType) {
  if (contentType.includes('application/json')) {
    return body ? JSON.parse(body) : {}
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(body))
  }

  return {}
}

function isApiRoute(pathname, routePath) {
  return pathname === routePath || pathname === `${routePath}/`
}

function derivePaymentStatus({ queryResult, browserReturnResult, returnNotifyResult }) {
  if (String(queryResult?.tradeStatus || '') === '1') {
    return 'paid'
  }

  if (String(browserReturnResult?.RtnCode || '') === '1' || String(returnNotifyResult?.RtnCode || '') === '1') {
    return 'paid'
  }

  if (queryResult || browserReturnResult || returnNotifyResult) {
    return 'pending'
  }

  return 'created'
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, appConfig.appBaseUrl)
  const { pathname } = requestUrl

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    response.end()
    return
  }

  try {
    if (request.method === 'GET' && isApiRoute(pathname, '/api/health')) {
      sendJson(response, 200, {
        success: true,
        message: 'server running',
        storage: {
          mode: 'json-file',
          location: 'server/data/*.json',
        },
      })
      return
    }

    if (request.method === 'GET' && isApiRoute(pathname, '/api/products')) {
      const category = requestUrl.searchParams.get('category') || 'all'
      const search = (requestUrl.searchParams.get('search') || '').trim().toLowerCase()
      const products = readProducts().filter((product) => {
        const matchCategory = category === 'all' || product.category === category
        const matchSearch =
          !search ||
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          product.tag.toLowerCase().includes(search)

        return matchCategory && matchSearch
      })

      sendJson(response, 200, { success: true, data: products })
      return
    }

    if (request.method === 'GET' && isApiRoute(pathname, '/api/admin/products')) {
      sendJson(response, 200, { success: true, data: readProducts() })
      return
    }

    if (request.method === 'GET' && isApiRoute(pathname, '/api/member/profile')) {
      const email = requestUrl.searchParams.get('email') || 'member@flower.tw'
      const members = readMembers()
      const member = members.find((item) => item.email === email) || members[0]

      sendJson(response, 200, {
        success: true,
        data: member,
      })
      return
    }

    if (request.method === 'GET' && isApiRoute(pathname, '/api/admin/members')) {
      const search = (requestUrl.searchParams.get('search') || '').trim().toLowerCase()
      const members = readMembers().filter((member) => {
        if (!search) {
          return true
        }

        return (
          member.name.toLowerCase().includes(search) ||
          member.email.toLowerCase().includes(search) ||
          member.phone.toLowerCase().includes(search) ||
          member.level.toLowerCase().includes(search)
        )
      })

      sendJson(response, 200, {
        success: true,
        data: members,
      })
      return
    }

    if (request.method === 'POST' && isApiRoute(pathname, '/api/admin/products')) {
      const rawBody = await collectBody(request)
      const body = parseRequestBody(rawBody, request.headers['content-type'] || '')
      const validationMessage = validateProductPayload(body)

      if (validationMessage) {
        sendJson(response, 400, { success: false, message: validationMessage })
        return
      }

      const products = readProducts()
      const createdProduct = normalizeProductPayload(body)
      products.unshift(createdProduct)
      writeProducts(products)

      sendJson(response, 201, {
        success: true,
        message: '商品已成功上架',
        data: createdProduct,
      })
      return
    }

    if (pathname.startsWith('/api/admin/products/')) {
      const productId = pathname.split('/').pop()
      const products = readProducts()
      const targetIndex = products.findIndex((product) => product.id === productId)

      if (targetIndex === -1) {
        sendJson(response, 404, { success: false, message: '找不到指定商品' })
        return
      }

      if (request.method === 'PUT') {
        const rawBody = await collectBody(request)
        const body = parseRequestBody(rawBody, request.headers['content-type'] || '')
        const validationMessage = validateProductPayload(body)

        if (validationMessage) {
          sendJson(response, 400, { success: false, message: validationMessage })
          return
        }

        const updatedProduct = normalizeProductPayload({
          ...products[targetIndex],
          ...body,
          id: products[targetIndex].id,
          createdAt: products[targetIndex].createdAt,
        })

        products[targetIndex] = updatedProduct
        writeProducts(products)

        sendJson(response, 200, {
          success: true,
          message: '商品已更新',
          data: updatedProduct,
        })
        return
      }

      if (request.method === 'DELETE') {
        const removedProduct = products[targetIndex]
        const nextProducts = products.filter((product) => product.id !== productId)
        writeProducts(nextProducts)

        sendJson(response, 200, {
          success: true,
          message: `商品「${removedProduct.name}」已刪除`,
        })
        return
      }
    }

    if (request.method === 'POST' && isApiRoute(pathname, '/api/ecpay/create-order')) {
      const rawBody = await collectBody(request)
      const body = parseRequestBody(rawBody, request.headers['content-type'] || '')
      const payload = createCheckoutPayload(body)

      upsertEcpayOrder({
        merchantTradeNo: payload.merchantTradeNo,
        orderInput: body,
        checkoutFields: payload.fields,
        paymentStatus: 'created',
        createdAt: new Date().toISOString(),
      })

      sendJson(response, 200, {
        success: true,
        message: '訂單建立成功',
        ...payload,
      })
      return
    }

    if (request.method === 'POST' && isApiRoute(pathname, '/api/ecpay/query')) {
      const rawBody = await collectBody(request)
      const body = parseRequestBody(rawBody, request.headers['content-type'] || '')

      if (!body.merchantTradeNo) {
        sendJson(response, 400, { success: false, message: '缺少 merchantTradeNo' })
        return
      }

      const result = await queryTradeInfo(body.merchantTradeNo)
      const existingRecord = readEcpayOrder(body.merchantTradeNo)
      const mergedRecord = upsertEcpayOrder({
        merchantTradeNo: body.merchantTradeNo,
        queryResult: result,
        paymentStatus: derivePaymentStatus({
          queryResult: result,
          browserReturnResult: existingRecord?.browserReturnResult,
          returnNotifyResult: existingRecord?.returnNotifyResult,
        }),
        lastQueriedAt: new Date().toISOString(),
      })

      sendJson(response, 200, {
        success: true,
        message: '查詢完成',
        data: mergedRecord,
      })
      return
    }

    if (request.method === 'GET' && pathname.startsWith('/api/ecpay/orders/')) {
      const merchantTradeNo = pathname.split('/').pop()
      const data = readEcpayOrder(merchantTradeNo)

      if (!data) {
        sendJson(response, 404, { success: false, message: '找不到訂單資料' })
        return
      }

      sendJson(response, 200, { success: true, data })
      return
    }

    if (request.method === 'POST' && isApiRoute(pathname, '/api/ecpay/order-result')) {
      const rawBody = await collectBody(request)
      const result = parseRequestBody(rawBody, request.headers['content-type'] || '')
      const merchantTradeNo = result.MerchantTradeNo || 'unknown'
      const isVerified = verifyCheckMacValue(result)
      const existingRecord = readEcpayOrder(merchantTradeNo)

      if (isVerified) {
        upsertEcpayOrder({
          merchantTradeNo,
          browserReturnResult: result,
          browserCallbackVerified: true,
          paymentStatus: derivePaymentStatus({
            queryResult: existingRecord?.queryResult,
            browserReturnResult: result,
            returnNotifyResult: existingRecord?.returnNotifyResult,
          }),
          browserReturnedAt: new Date().toISOString(),
        })
      } else {
        console.warn('[ECPay OrderResultURL] CheckMacValue 驗證失敗', merchantTradeNo)
      }

      response.writeHead(303, {
        Location: `${appConfig.frontendBaseUrl}/payment-result?merchantTradeNo=${merchantTradeNo}`,
      })
      response.end()
      return
    }

    if (request.method === 'POST' && isApiRoute(pathname, '/api/ecpay/return')) {
      const rawBody = await collectBody(request)
      const result = parseRequestBody(rawBody, request.headers['content-type'] || '')
      const merchantTradeNo = result.MerchantTradeNo || 'unknown'
      const isVerified = verifyCheckMacValue(result)
      const existingRecord = readEcpayOrder(merchantTradeNo)

      if (isVerified) {
        upsertEcpayOrder({
          merchantTradeNo,
          returnNotifyResult: result,
          returnCallbackVerified: true,
          paymentStatus: derivePaymentStatus({
            queryResult: existingRecord?.queryResult,
            browserReturnResult: existingRecord?.browserReturnResult,
            returnNotifyResult: result,
          }),
          returnNotifiedAt: new Date().toISOString(),
        })
      } else {
        console.warn('[ECPay ReturnURL] CheckMacValue 驗證失敗', merchantTradeNo)
      }

      sendText(response, 200, '1|OK')
      return
    }

    sendJson(response, 404, { success: false, message: '找不到 API 路由' })
  } catch (error) {
    sendJson(response, 500, {
      success: false,
      message: error instanceof Error ? error.message : '伺服器發生未知錯誤',
    })
  }
})

server.listen(appConfig.port, () => {
  console.log(`Local server running at ${appConfig.appBaseUrl}`)
})
