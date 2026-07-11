import { navigateTo } from '../hooks/useRouter'
import BrandLogo from './BrandLogo'
import NavIcon from './NavIcon'

function Navbar({ cartCount, isMember, onToggleMemberModal }) {
  return (
    <header className="site-header">
      <div className="brand-block" onClick={() => navigateTo('/')} role="button" tabIndex={0}>
        <BrandLogo variant="primary" size="lg" className="site-brand-logo" />
      </div>

      <nav className="main-nav" aria-label="主要導覽">
        <button type="button" onClick={() => navigateTo('/about')}>
          <span className="nav-button-icon nav-button-icon-about">
            <NavIcon type="about" />
          </span>
          品牌故事
        </button>
        <button type="button" onClick={() => navigateTo('/shop')}>
          <span className="nav-button-icon nav-button-icon-shop">
            <NavIcon type="shop" />
          </span>
          線上選品
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
          購物袋 {cartCount > 0 ? <span className="nav-badge">{cartCount}</span> : null}
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
          {isMember ? '會員帳戶' : '登入 / 註冊'}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
