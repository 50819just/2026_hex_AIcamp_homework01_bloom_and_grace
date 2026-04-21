import { navigateTo } from '../hooks/useRouter'
import FloralLogo from './FloralLogo'
import NavIcon from './NavIcon'

function Navbar({ cartCount, isMember, onToggleMemberModal }) {
  return (
    <header className="site-header">
      <div className="brand-block" onClick={() => navigateTo('/')} role="button" tabIndex={0}>
        <span className="brand-mark">
          <FloralLogo />
        </span>
        <div>
          <p className="brand-name">Bloom & Grace</p>
          <p className="brand-subtitle">premium florist atelier</p>
        </div>
      </div>

      <nav className="main-nav" aria-label="主要導覽">
        <button type="button" onClick={() => navigateTo('/about')}>
          <span className="nav-button-icon nav-button-icon-about">
            <NavIcon type="about" />
          </span>
          企業理念
        </button>
        <button type="button" onClick={() => navigateTo('/shop')}>
          <span className="nav-button-icon nav-button-icon-shop">
            <NavIcon type="shop" />
          </span>
          商品選購
        </button>
        <button type="button" onClick={() => navigateTo('/cart')}>
          <span
            className={
              cartCount > 0
                ? 'nav-button-icon nav-button-icon-cart nav-button-icon-cart-filled'
                : 'nav-button-icon nav-button-icon-cart nav-button-icon-cart-empty'
            }
          >
            <NavIcon type="cart" isActive={cartCount > 0} />
          </span>
          購物車 {cartCount > 0 ? <span className="nav-badge">{cartCount}</span> : null}
        </button>
        <button
          type="button"
          onClick={() => {
            if (isMember) {
              navigateTo('/profile')
              return
            }

            onToggleMemberModal()
          }}
        >
          <span className="nav-button-icon nav-button-icon-member">
            <NavIcon type="member" />
          </span>
          {isMember ? '會員中心' : '會員登入'}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
