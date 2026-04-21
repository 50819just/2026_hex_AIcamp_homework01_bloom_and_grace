import crypto from 'node:crypto'

export const productCategories = {
  orchid: { key: 'orchid', label: '蝴蝶蘭', tone: 'rose' },
  basket: { key: 'basket', label: '花籃', tone: 'gold' },
  potted: { key: 'potted', label: '盆花', tone: 'green' },
  sympathy: { key: 'sympathy', label: '追思花禮', tone: 'lavender' },
}

function createPlaceholderImage(title, tone = 'rose') {
  const palette = {
    rose: { background: '#F8E8EF', accent: '#B76E79', detail: '#F3C9D7' },
    gold: { background: '#FBF3E4', accent: '#A77B43', detail: '#EFD9B4' },
    green: { background: '#EEF5EA', accent: '#6E8B62', detail: '#CFE1C8' },
    lavender: { background: '#F1ECF8', accent: '#8A7AA6', detail: '#D8CCE9' },
  }

  const current = palette[tone] || palette.rose
  const safeTitle = String(title).replace(/[<&>"]/g, '')

  return `data:image/svg+xml;charset=UTF-8,
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
    <rect width='800' height='600' fill='${current.background}' />
    <circle cx='130' cy='130' r='80' fill='${current.detail}' opacity='0.8' />
    <circle cx='680' cy='90' r='62' fill='${current.detail}' opacity='0.7' />
    <circle cx='720' cy='480' r='94' fill='${current.detail}' opacity='0.65' />
    <rect x='110' y='144' width='580' height='312' rx='40' fill='white' opacity='0.92' />
    <path d='M250 360 C240 285 308 248 352 281 C395 219 484 231 514 300 C552 301 581 336 571 384 C560 433 514 464 445 464 C362 464 273 438 250 360 Z'
      fill='${current.accent}' opacity='0.85' />
    <text x='400' y='212' text-anchor='middle' fill='${current.accent}'
      font-family='Segoe UI, Arial, sans-serif' font-size='28' font-weight='700'>Bloom &amp; Grace</text>
    <text x='400' y='262' text-anchor='middle' fill='#6F6677'
      font-family='Segoe UI, Arial, sans-serif' font-size='36' font-weight='700'>${safeTitle}</text>
    <text x='400' y='515' text-anchor='middle' fill='#8D7F95'
      font-family='Segoe UI, Arial, sans-serif' font-size='22'>premium florist collection</text>
  </svg>`.replace(/\n\s+/g, '')
}

export function normalizeProductPayload(payload) {
  const categoryConfig = productCategories[payload.category] || productCategories.orchid
  const name = String(payload.name || '').trim()
  const description = String(payload.description || '').trim()
  const tag = String(payload.tag || '新品上架').trim()
  const originalPrice = Math.max(0, Number(payload.originalPrice) || 0)
  const memberPrice = Math.max(0, Number(payload.memberPrice) || 0)

  return {
    id: payload.id || crypto.randomUUID(),
    name,
    category: categoryConfig.key,
    image: String(payload.image || '').trim() || createPlaceholderImage(name || '花店花禮', categoryConfig.tone),
    originalPrice,
    memberPrice,
    description,
    tag,
    createdAt: payload.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export function validateProductPayload(payload) {
  if (!payload.name || String(payload.name).trim().length < 2) {
    return '商品名稱至少需要 2 個字'
  }

  if (!productCategories[payload.category]) {
    return '商品分類不正確'
  }

  if (!payload.description || String(payload.description).trim().length < 6) {
    return '商品描述至少需要 6 個字'
  }

  if (Number(payload.originalPrice) <= 0 || Number(payload.memberPrice) <= 0) {
    return '原價與會員價都必須大於 0'
  }

  if (Number(payload.memberPrice) > Number(payload.originalPrice)) {
    return '會員價不可高於原價'
  }

  return ''
}
