import BrandLogo from './BrandLogo'
import { navigateTo } from '../hooks/useRouter'

const footerLinks = [
  {
    title: '選購',
    links: [
      { label: '全部花禮', path: '/shop' },
      { label: '蝴蝶蘭', path: '/shop' },
      { label: '盆栽植栽', path: '/shop' },
      { label: '弔唁花禮', path: '/shop' },
    ],
  },
  {
    title: '聯絡與登入',
    links: [
      { label: '品牌故事', path: '/about' },
      { label: '聯絡我們', path: '/about' },
      { label: '會員中心', path: '/profile' },
    ],
  },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-inner">
          <div className="footer-brand-block">
            <BrandLogo variant="light" size="md" className="footer-brand-logo" />
            <p>
              以安靜、俐落又帶有溫度的方式整理花藝與選品，讓每一份送禮都更有節奏。
            </p>
          </div>

          <div className="footer-links-grid">
            {footerLinks.map((group) => (
              <div key={group.title} className="footer-link-group">
                <p>{group.title}</p>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <button type="button" onClick={() => navigateTo(link.path)}>
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
