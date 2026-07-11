import { useId, useState } from 'react'
import BrandLogo from '../components/BrandLogo'
import { memberVisuals } from '../data/memberAssets'
import { navigateTo } from '../hooks/useRouter'

function SignInPage({ isMember, onMemberLogin, onMemberLogout, onNotify }) {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [forgotStep, setForgotStep] = useState('request')
  const [formError, setFormError] = useState('')
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    resetCode: '',
  })

  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const confirmId = useId()
  const resetCodeId = useId()
  const helperId = useId()
  const errorId = useId()

  const resetForm = () => {
    setFormError('')
    setForgotStep('request')
    setShowPassword(false)
    setFormValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      resetCode: '',
    })
  }

  const handleModeChange = (nextMode) => {
    setMode(nextMode)
    setFormError('')
    setForgotStep('request')
    setShowPassword(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormError('')
    setFormValue((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormError('')

    if (mode === 'forgot') {
      if (forgotStep === 'request') {
        if (!formValue.email) {
          setFormError('請先輸入你的會員電子郵件。')
          return
        }
        setForgotStep('verify')
        onNotify(`驗證碼已寄到 ${formValue.email}（示意）`)
        return
      }

      if (!formValue.resetCode || formValue.resetCode.length < 6) {
        setFormError('請輸入 6 碼驗證碼。')
        return
      }

      if (formValue.password !== formValue.confirmPassword) {
        setFormError('新密碼與確認密碼不一致。')
        return
      }

      const passwordIsStrong =
        formValue.password.length >= 8 && /[A-Z]/.test(formValue.password) && /\d/.test(formValue.password)

      if (!passwordIsStrong) {
        setFormError('請把密碼設定得更完整，至少 8 碼、包含英文大寫與數字。')
        return
      }

      onNotify('密碼已重設完成，請使用新密碼重新登入')
      resetForm()
      setMode('login')
      return
    }

    if (mode === 'register') {
      if (formValue.password !== formValue.confirmPassword) {
        setFormError('密碼與確認密碼不一致。')
        return
      }

      const passwordIsStrong =
        formValue.password.length >= 8 && /[A-Z]/.test(formValue.password) && /\d/.test(formValue.password)

      if (!passwordIsStrong) {
        setFormError('請設定更完整的密碼，至少 8 碼並包含大寫英文與數字。')
        return
      }

      onMemberLogin({
        name: formValue.name || '會員姓名',
        email: formValue.email || 'member@flower.tw',
      })
      onNotify('註冊成功，已自動登入會員')
      resetForm()
      return
    }

    if (!formValue.email || !formValue.password) {
      setFormError('請輸入電子郵件與密碼。')
      return
    }

    onMemberLogin({
      name: '會員姓名',
      email: formValue.email || 'member@flower.tw',
    })
    onNotify('會員登入成功，已套用會員價')
    resetForm()
  }

  if (isMember) {
    return (
      <div className="page-stack member-hub-page member-hub-page-logged-in">
        <section className="page-container member-hub-shell">
          <div className="member-hub-intro member-hub-intro-logged-in">
            <div className="member-hub-brand-row">
              <BrandLogo variant="primary" size="md" className="member-hub-brand-logo" />
              <div>
                <p className="section-kicker">會員服務中心</p>
                <h1 className="member-hub-title">你目前已經登入會員</h1>
              </div>
            </div>
            <p className="member-hub-lead">
              會員價已套用完成，現在可以直接前往會員中心查看資料，或回到選品頁繼續挑花。
            </p>
          </div>

          <div className="member-hub-logged-card">
            <div className="member-hub-logged-copy">
              <p className="section-kicker">登入狀態</p>
              <h2>登入成功，會員流程已準備好</h2>
              <p>如果想繼續購物，可以直接回到選品頁；如果想查看會員資料，也可以前往會員中心。</p>
            </div>
            <div className="member-hub-logged-actions">
              <button type="button" className="secondary-button" onClick={onMemberLogout}>
                登出
              </button>
              <button type="button" className="primary-button" onClick={() => navigateTo('/profile')}>
                前往會員中心
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page-stack member-hub-page">
      <section className="page-container member-hub-shell">
        <div className="member-hub-grid">
          <aside className="member-hub-story-card">
            <figure className="member-hub-visual">
              <img
                src={memberVisuals.welcome}
                alt="會員中心花禮示意"
                className="member-hub-visual-image"
                loading="eager"
              />
              <figcaption className="member-hub-visual-note">
                <span className="section-kicker">會員視角</span>
                <strong>把常用資料整理好，下一次送花就會輕鬆很多。</strong>
                <p>登入後可以更快帶入收件資料，也能直接保留會員價。</p>
              </figcaption>
            </figure>
          </aside>

          <section className="member-hub-auth-card">
            <div className="member-hub-auth-head">
              <div className="member-hub-brand-row member-hub-auth-brand-row">
                <BrandLogo variant="primary" size="md" className="member-hub-brand-logo" />
                <div>
                  <p className="section-kicker">會員登入</p>
                  <h1 className="member-hub-title">花店會員入口</h1>
                </div>
              </div>
              <p>登入、註冊與重設密碼。</p>
            </div>

            <div className="member-hub-mode-row" role="tablist" aria-label="會員流程切換">
              <button
                type="button"
                className={mode === 'login' ? 'member-hub-mode active' : 'member-hub-mode'}
                onClick={() => handleModeChange('login')}
                role="tab"
                aria-selected={mode === 'login'}
              >
                登入
              </button>
              <button
                type="button"
                className={mode === 'register' ? 'member-hub-mode active' : 'member-hub-mode'}
                onClick={() => handleModeChange('register')}
                role="tab"
                aria-selected={mode === 'register'}
              >
                註冊
              </button>
              <button
                type="button"
                className={mode === 'forgot' ? 'member-hub-mode active' : 'member-hub-mode'}
                onClick={() => handleModeChange('forgot')}
                role="tab"
                aria-selected={mode === 'forgot'}
              >
                重設密碼
              </button>
            </div>

            <p className="member-hub-demo-credentials">測試帳號：member@flower.tw ／ 測試用密碼：Flower1234</p>

            <form className="member-hub-form" onSubmit={handleSubmit}>
              {mode === 'register' ? (
                <label className="member-hub-field">
                  <span>姓名</span>
                  <input
                    id={nameId}
                    name="name"
                    value={formValue.name}
                    onChange={handleInputChange}
                    placeholder="請輸入你的姓名"
                    autoComplete="name"
                    required
                  />
                </label>
              ) : null}

              <label className="member-hub-field">
                <span>電子郵件</span>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  value={formValue.email}
                  onChange={handleInputChange}
                  placeholder={mode === 'login' ? '輸入帳號' : '請輸入電子郵件'}
                  autoComplete="email"
                  aria-describedby={`${helperId} ${formError ? errorId : ''}`.trim()}
                  required
                />
              </label>

              {mode !== 'forgot' || forgotStep === 'verify' ? (
                <label className="member-hub-field member-hub-password-field">
                  <span>{mode === 'forgot' ? '新密碼' : '密碼'}</span>
                  <div className="member-hub-password-row">
                    <input
                    id={passwordId}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formValue.password}
                    onChange={handleInputChange}
                    placeholder={mode === 'login' ? '輸入密碼' : '請輸入安全密碼'}
                    autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                    aria-describedby={`${helperId} ${formError ? errorId : ''}`.trim()}
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
              ) : null}

              {mode === 'register' || (mode === 'forgot' && forgotStep === 'verify') ? (
                <label className="member-hub-field">
                  <span>確認密碼</span>
                  <input
                    id={confirmId}
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formValue.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="請再次輸入密碼"
                    autoComplete="new-password"
                    required
                  />
                </label>
              ) : null}

              {mode === 'forgot' && forgotStep === 'verify' ? (
                <label className="member-hub-field">
                  <span>6 碼驗證碼</span>
                  <input
                    id={resetCodeId}
                    name="resetCode"
                    value={formValue.resetCode}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="例如：482913"
                    required
                  />
                </label>
              ) : null}

              {mode === 'register' || (mode === 'forgot' && forgotStep === 'verify') ? (
                <p className="member-hub-helper member-hub-password-hint">
                  密碼至少 8 碼，並包含英文大寫與數字，會比較穩定。
                </p>
              ) : null}

              <p className="member-hub-helper" id={helperId}>
                測試用帳號：member@flower.tw ｜ 測試用密碼：Flower1234
              </p>

              {formError ? (
                <div className="member-hub-error" id={errorId} role="alert" aria-live="polite">
                  {formError}
                </div>
              ) : null}

              <div className="member-hub-actions">
                <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
                  前往選購
                </button>
                <button type="submit" className="primary-button">
                  {mode === 'login'
                    ? '安全登入會員'
                    : mode === 'register'
                      ? '建立帳號並登入'
                      : forgotStep === 'request'
                        ? '寄送驗證碼'
                        : '更新密碼'}
                </button>
              </div>

            </form>
          </section>
        </div>

        <footer className="member-hub-footer">
          <span>會員中心入口</span>
          <button type="button" className="text-button" onClick={() => navigateTo('/profile')}>
            前往會員資料頁
          </button>
        </footer>
      </section>
    </div>
  )
}

export default SignInPage
