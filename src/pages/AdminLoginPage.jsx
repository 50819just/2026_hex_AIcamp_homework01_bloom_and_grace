import { useState } from 'react'

const adminCredentials = {
  email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@hexschool.com',
  password: import.meta.env.VITE_ADMIN_PASSWORD || '12345678',
}

function AdminLoginPage({ onAdminLogin, onNotify }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValue((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formValue.email !== adminCredentials.email || formValue.password !== adminCredentials.password) {
      onNotify('管理員帳號或密碼不正確，請直接使用頁面提供的測試帳密')
      return
    }

    onAdminLogin({
      email: formValue.email,
    })
    onNotify('管理員登入成功，已進入後台驗收頁')
  }

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Admin Access</p>
            <h1 className="page-title">後台登入</h1>
            <p className="page-description">這裡保留給老師驗收使用，可直接使用下方測試帳號密碼登入後台。</p>
          </div>
        </div>

        <div className="admin-login-helper-card">
          <div>
            <p className="section-kicker">Teacher Review</p>
            <h2>測試帳號密碼放置區</h2>
            <p>若老師要快速驗收，直接複製下面帳密即可，不需要另外註冊或申請權限。</p>
          </div>

          <div className="admin-login-credentials">
            <article>
              <span>測試帳號</span>
              <strong>{adminCredentials.email}</strong>
            </article>
            <article>
              <span>測試密碼</span>
              <strong>{adminCredentials.password}</strong>
            </article>
          </div>
        </div>

        <div className="admin-login-card">
          <form className="member-modal-body" onSubmit={handleSubmit}>
            <label>
              管理員 Email
              <input
                name="email"
                type="email"
                value={formValue.email}
                onChange={handleInputChange}
                placeholder={adminCredentials.email}
                required
              />
            </label>
            <label>
              密碼
              <input
                name="password"
                type="password"
                value={formValue.password}
                onChange={handleInputChange}
                placeholder="請輸入測試密碼"
                required
              />
            </label>
            <div className="member-modal-actions">
              <button type="submit" className="primary-button full-width">
                登入後台
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default AdminLoginPage
