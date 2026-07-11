import BrandLogo from './BrandLogo'
import { navigateTo } from '../hooks/useRouter'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content footer-content-rebuild">
        <div className="footer-brand footer-brand-rebuild">
          <BrandLogo variant="light" size="md" className="footer-brand-logo" />
          <p className="footer-brand-copy">以溫柔、安靜而有質感的花藝敘事，陪你把祝福、感謝與思念好好送達。</p>
        </div>

        <div className="footer-links footer-links-rebuild">
          <span>蝴蝶蘭系列</span>
          <span>開幕誌慶花禮</span>
          <span>植感送禮選品</span>
          <span>致意追思花禮</span>
        </div>

        <div className="footer-admin-entry footer-admin-entry-rebuild">
          <p>品牌營運入口</p>
          <a
            href="/admin"
            className="footer-admin-button footer-admin-button-rebuild"
            onClick={(event) => {
              event.preventDefault()
              navigateTo('/admin')
            }}
          >
            後台上架
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
