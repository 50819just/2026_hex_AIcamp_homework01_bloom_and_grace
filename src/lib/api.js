const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

function buildApiUrl(path) {
  return `${apiBaseUrl}${path}`
}

export async function requestJson(url, options = {}) {
  const response = await fetch(buildApiUrl(url), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json()

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
