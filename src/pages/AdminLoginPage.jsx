import { useId, useState } from 'react'
import BrandLogo from '../components/BrandLogo'
import { navigateTo } from '../hooks/useRouter'
import { withBaseUrl } from '../lib/assetUrl'

const adminCredentials = {
  email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@flower.tw',
  password: import.meta.env.VITE_ADMIN_PASSWORD || '12345678',
}

function AdminLoginPage({ onAdminLogin, onNotify }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')
  const emailId = useId()
  const passwordId = useId()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormError('')
    setFormValue((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormError('')

    if (formValue.email !== adminCredentials.email || formValue.password !== adminCredentials.password) {
      const message = '管理員帳號或密碼不正確，請直接使用頁面提供的測試帳密。'
      setFormError(message)
      onNotify(message)
      return
    }

    onAdminLogin({
      email: formValue.email,
    })
    onNotify('管理員登入成功，已進入後台驗收頁')
  }

  return (
    <div className="page-stack admin-hub-page">
      <section className="page-container admin-hub-shell">
        <div className="admin-hub-grid">
          <aside className="admin-hub-visual-card">
            <figure className="admin-hub-figure">
              <img
                src={withBaseUrl('images/products/orchids/white-orchid-03.jpg')}
                alt="花店後台登入示意"
                className="admin-hub-image"
                loading="eager"
              />
              <figcaption className="admin-hub-figure-note">
                <strong>內部限定</strong>
                <p>登入成功後會直接進入後台驗收頁，不會改動前台購物或付款流程。</p>
              </figcaption>
            </figure>

            <div className="admin-hub-visual-copy">
              <p className="section-kicker">花藝後台入口</p>
              <h1 className="admin-hub-title">後台登入</h1>
              <p className="admin-hub-lead">
                這裡保留給內部驗收使用，登入後可進入商品與會員資料管理頁。若不是測試環境，請使用前台入口。
              </p>
            </div>
          </aside>

          <section className="admin-hub-form-card">
            <div className="admin-hub-brand-row">
              <BrandLogo variant="primary" size="md" className="admin-hub-brand-logo" />
              <div>
                <p className="section-kicker">後台管理</p>
                <h2 className="admin-hub-panel-title">花店後台登入</h2>
              </div>
            </div>

            <p className="admin-hub-lead">
              這裡保留給內部驗收使用，登入後可進入商品與會員資料管理頁。若不是測試環境，請勿使用這個入口。
            </p>

            <p className="admin-login-side-note">
              <span className="section-kicker">內部限定</span>
              這一頁只連結目前既有的後台驗證流程，不另外接客戶登入 API。
            </p>

            <form className="admin-hub-form" onSubmit={handleSubmit}>
              <label className="admin-hub-field">
                <span>管理員信箱</span>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  value={formValue.email}
                  onChange={handleInputChange}
                  placeholder="請輸入管理員信箱"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="admin-hub-field admin-hub-password-field">
                <span>密碼</span>
                <div className="admin-hub-password-row">
                  <input
                    id={passwordId}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formValue.password}
                    onChange={handleInputChange}
                    placeholder="請輸入測試密碼"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? '隱藏密碼' : '顯示密碼'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? '隱藏' : '顯示'}
                  </button>
                </div>
              </label>

              {formError ? (
                <div className="member-hub-error auth-form-error" role="alert" aria-live="polite">
                  {formError}
                </div>
              ) : null}

              <div className="admin-hub-actions">
                <button type="button" className="secondary-button" onClick={() => navigateTo('/about')}>
                  查看品牌故事
                </button>
                <button type="submit" className="primary-button full-width">
                  進入後台管理頁
                </button>
              </div>
            </form>

            <p className="admin-login-side-note">
              <span className="section-kicker">內部限定</span>
              這一頁只連結目前既有的後台驗證流程，不另外接客戶登入 API。
            </p>
          </section>
        </div>

        <div className="auth-minimal-footer admin-hub-footer">
          <span>後台管理入口</span>
          <button type="button" className="text-button" onClick={() => navigateTo('/')}>
            返回前台首頁
          </button>
        </div>
      </section>
    </div>
  )
}

export default AdminLoginPage
