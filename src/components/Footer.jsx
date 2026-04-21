import FloralLogo from './FloralLogo'
import { navigateTo } from '../hooks/useRouter'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="footer-brand-mark">
          <FloralLogo size="sm" />
        </span>
        <div>
        <p className="footer-title">Bloom & Grace 花藝選品</p>
        <p>以溫柔的花語，陪你送出每一份祝福與思念。</p>
        </div>
      </div>
      <div className="footer-links">
        <span>開幕誌慶</span>
        <span>升遷祝賀</span>
        <span>節慶送禮</span>
        <span>追思花禮</span>
      </div>
      <div className="footer-admin-entry">
        <p>內部管理入口</p>
        <a
          href="/admin"
          className="footer-admin-button"
          onClick={(event) => {
            event.preventDefault()
            navigateTo('/admin')
          }}
        >
          後台上架
        </a>
      </div>
    </footer>
  )
}

export default Footer
