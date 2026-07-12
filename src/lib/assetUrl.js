export function withBaseUrl(path = '') {
  if (!path) {
    return ''
  }

  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path
  }

  const normalizedBase = import.meta.env.BASE_URL || '/'
  const cleanBase = normalizedBase.endsWith('/') ? normalizedBase : `${normalizedBase}/`
  const cleanPath = String(path).replace(/^\/+/, '')

  return `${cleanBase}${cleanPath}`
}
