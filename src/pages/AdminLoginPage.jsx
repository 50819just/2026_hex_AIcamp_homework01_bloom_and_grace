import { useState } from 'react'

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
    onAdminLogin({
      email: formValue.email || 'admin@bloomandgrace.tw',
    })
    onNotify('管理員登入成功，已進入後台上架頁')
  }

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Admin Access</p>
            <h1 className="page-title">後台登入</h1>
            <p className="page-description">登入管理員帳號後，才能進入花店商品上架與編輯後台。</p>
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
                placeholder="admin@bloomandgrace.tw"
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
                placeholder="••••••••"
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
