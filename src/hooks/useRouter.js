import { useEffect, useState } from 'react'

function getCurrentPath() {
  return window.location.pathname
}

export function navigateTo(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function useRouter() {
  const [path, setPath] = useState(getCurrentPath())

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(getCurrentPath())
    }

    window.addEventListener('popstate', handleLocationChange)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  return {
    path,
    navigate: navigateTo,
  }
}
