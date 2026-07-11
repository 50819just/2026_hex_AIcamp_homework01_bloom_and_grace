const defaultApiBaseUrl = typeof window === 'undefined'
  ? 'http://localhost:3000'
  : `${window.location.protocol}//${window.location.hostname}:3000`

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl

function buildApiUrl(path) {
  return `${apiBaseUrl}${path}`
}

function getNetworkErrorMessage(url) {
  if (url.includes('/api/ecpay/')) {
    return '本地付款服務目前連不上，請先啟動 server（可用 npm run server 或 npm run dev:all）後再試一次。'
  }

  return '本地資料服務目前連不上，請先確認 server 是否已啟動。'
}

export async function requestJson(url, options = {}) {
  let response

  try {
    response = await fetch(buildApiUrl(url), {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })
  } catch (error) {
    const networkMessage = getNetworkErrorMessage(url)
    throw new Error(error instanceof Error && error.message ? networkMessage : '連線失敗')
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.success === false) {
    throw new Error(data.message || '請求失敗')
  }

  return data
}

export async function fetchProducts() {
  const result = await requestJson('/api/products')
  return result.data
}

export async function fetchAdminProducts() {
  const result = await requestJson('/api/admin/products')
  return result.data
}

export async function createAdminProduct(payload) {
  const result = await requestJson('/api/admin/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return result.data
}

export async function updateAdminProduct(productId, payload) {
  const result = await requestJson(`/api/admin/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
  return result.data
}

export async function deleteAdminProduct(productId) {
  const result = await requestJson(`/api/admin/products/${productId}`, {
    method: 'DELETE',
  })
  return result
}

export async function createEcpayOrder(payload) {
  return requestJson('/api/ecpay/create-order', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function queryEcpayOrder(merchantTradeNo) {
  const result = await requestJson('/api/ecpay/query', {
    method: 'POST',
    body: JSON.stringify({ merchantTradeNo }),
  })
  return result.data
}

export async function fetchMemberProfile(email) {
  const query = email ? `?email=${encodeURIComponent(email)}` : ''
  const result = await requestJson(`/api/member/profile${query}`)
  return result.data
}

export async function fetchAdminMembers(search = '') {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  const result = await requestJson(`/api/admin/members${query}`)
  return result.data
}
