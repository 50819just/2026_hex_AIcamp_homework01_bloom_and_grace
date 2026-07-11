import { navigateTo } from '../hooks/useRouter'
import BrandLogo from './BrandLogo'
import NavIcon from './NavIcon'

const navItems = [
  { label: '商品選購', path: '/shop' },
  { label: '購物袋', path: '/cart' },
  { label: '品牌故事', path: '/about' },
  { label: '會員中心', path: '/profile' },
]

function isActivePath(currentPath, targetPath) {
  if (targetPath === '/shop') {
    return currentPath === '/shop' || currentPath.startsWith('/products/')
  }

  if (targetPath === '/profile') {
    return currentPath === '/profile'
  }

  return currentPath === targetPath
}

function Navbar({ currentPath, cartCount, isMember, onToggleMemberModal, variant = 'home' }) {
  return (
    <header className={`site-header site-header-${variant}`}>
      <button
        type="button"
        className="header-brand-button"
        onClick={() => navigateTo('/')}
        aria-label="回到首頁"
      >
        <BrandLogo variant="primary" size="lg" className="site-brand-logo" />
      </button>

      <nav className="header-nav header-nav-center" aria-label="主要導覽">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={isActivePath(currentPath, item.path) ? 'nav-link is-active' : 'nav-link'}
            onClick={() => {
              if (item.path === '/profile' && !isMember) {
                onToggleMemberModal()
                return
              }

              navigateTo(item.path)
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-actions" aria-label="快捷操作">
        <button type="button" className="icon-button" onClick={() => navigateTo('/shop')} aria-label="搜尋花禮">
          <NavIcon type="search" />
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={() => {
            if (isMember) {
              navigateTo('/profile')
              return
            }

            onToggleMemberModal()
          }}
          aria-label={isMember ? '會員中心' : '登入會員'}
        >
          <NavIcon type="member" />
        </button>
        <button type="button" className="icon-button icon-button-cart" onClick={() => navigateTo('/cart')} aria-label="購物袋">
          <NavIcon type="cart" isActive={cartCount > 0} />
          {cartCount > 0 ? <span className="nav-badge">{cartCount}</span> : null}
        </button>
      </div>
    </header>
  )
}

export default Navbar
