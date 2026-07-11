const tonePalette = {
  rose: {
    background: '#F8E8EF',
    accent: '#B76E79',
    detail: '#F3C9D7',
  },
  gold: {
    background: '#FBF3E4',
    accent: '#A77B43',
    detail: '#EFD9B4',
  },
  green: {
    background: '#EEF5EA',
    accent: '#6E8B62',
    detail: '#CFE1C8',
  },
  lavender: {
    background: '#F1ECF8',
    accent: '#8A7AA6',
    detail: '#D8CCE9',
  },
}

function encodeSvg(svg) {
  return encodeURIComponent(svg)
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
}

export function createPlaceholderImage(title, tone = 'rose') {
  const current = tonePalette[tone] || tonePalette.rose
  const safeTitle = String(title || 'Bloom & Grace')
    .replace(/[<&>"]/g, '')
    .slice(0, 24)

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="${current.background}" />
      <circle cx="130" cy="130" r="80" fill="${current.detail}" opacity="0.8" />
      <circle cx="680" cy="90" r="62" fill="${current.detail}" opacity="0.7" />
      <circle cx="720" cy="480" r="94" fill="${current.detail}" opacity="0.65" />
      <rect x="110" y="144" width="580" height="312" rx="40" fill="white" opacity="0.92" />
      <path d="M250 360 C240 285 308 248 352 281 C395 219 484 231 514 300 C552 301 581 336 571 384 C560 433 514 464 445 464 C362 464 273 438 250 360 Z"
        fill="${current.accent}" opacity="0.85" />
      <text x="400" y="212" text-anchor="middle" fill="${current.accent}"
        font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">花店品牌</text>
      <text x="400" y="262" text-anchor="middle" fill="#6F6677"
        font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="700">${safeTitle}</text>
      <text x="400" y="515" text-anchor="middle" fill="#8D7F95"
        font-family="Segoe UI, Arial, sans-serif" font-size="22">精品花藝系列</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=UTF-8,${encodeSvg(svg)}`
}
