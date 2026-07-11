import { useMemo, useState } from 'react'
import FloralLogo from '../components/FloralLogo'
import { memberVisuals } from '../data/memberAssets'
import { navigateTo } from '../hooks/useRouter'

const passwordRules = [
  { key: 'length', label: '8 碼以上', test: (value) => value.length >= 8 },
  { key: 'uppercase', label: '包含英文大寫', test: (value) => /[A-Z]/.test(value) },
  { key: 'number', label: '包含數字', test: (value) => /\d/.test(value) },
]

function getPasswordStrength(password) {
  const score = passwordRules.filter((rule) => rule.test(password)).length
  if (!password) return { label: '尚未輸入', tone: 'muted', score: 0 }
  if (score <= 1) return { label: '弱', tone: 'danger', score }
  if (score === 2) return { label: '中', tone: 'warning', score }
  return { label: '高', tone: 'success', score }
}

function SignInPage({ isMember, onMemberLogin, onMemberLogout, onNotify }) {
  const [mode, setMode] = useState('login')
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    resetCode: '',
  })
  const [forgotStep, setForgotStep] = useState('request')
  const [formError, setFormError] = useState('')
  const passwordStrength = useMemo(() => getPasswordStrength(formValue.password), [formValue.password])

  const resetForm = () => {
    setFormError('')
    setForgotStep('request')
    setFormValue({ name: '', email: '', password: '', confirmPassword: '', resetCode: '' })
  }

  const handleModeChange = (nextMode) => {
    setMode(nextMode)
    setFormError('')
    setForgotStep('request')
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
          setFormError('請先輸入你的會員 Email。')
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
      if (passwordStrength.score < 3) {
        setFormError('請把密碼強度提高到「高」，會比較像正式站喔。')
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
      if (passwordStrength.score < 3) {
        setFormError('請設定更完整的密碼，至少 8 碼並包含大寫英文與數字。')
        return
      }
      onMemberLogin({
        name: formValue.name || 'Grace Lin',
        email: formValue.email || 'member@bloomandgrace.tw',
      })
      onNotify('註冊成功，已自動登入會員')
      resetForm()
      return
    }

    if (!formValue.email || !formValue.password) {
      setFormError('請輸入 Email 與密碼。')
      return
    }

    onMemberLogin({
      name: 'Grace Lin',
      email: formValue.email || 'member@bloomandgrace.tw',
    })
    onNotify('會員登入成功，已套用會員價')
    resetForm()
  }

  const titleMap = {
    login: '會員登入',
    register: '註冊會員',
    forgot: forgotStep === 'request' ? '重設密碼' : '設定新密碼',
  }

  const descriptionMap = {
    login: '登入後即可查看會員價、帶入收件資料，並接續目前購物與付款流程。',
    register: '建立帳號後可啟用會員價、保存送禮資料與後續訂單紀錄。',
    forgot: forgotStep === 'request'
      ? '先確認會員 Email，我們會寄出 6 碼驗證碼（示意）給你。'
      : '請輸入驗證碼並設定新密碼，流程會更像正式電商會員頁。',
  }

  if (isMember) {
    return (
      <div className="page-stack auth-page-stack">
        <section className="content-section auth-page-shell sign-page-shell-rebuild">
          <div className="member-modal member-modal-page sign-page-panel-rebuild member-page-logged-in">
            <p>你目前已登入會員，可以直接前往會員中心查看資料，或接續購物袋與結帳流程。</p>
            <div className="member-modal-actions member-page-actions">
              <button type="button" className="secondary-button" onClick={onMemberLogout}>登出</button>
              <button type="button" className="primary-button" onClick={() => navigateTo('/profile')}>前往會員中心</button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page-stack auth-page-stack">
      <section className="content-section auth-page-shell sign-page-shell-rebuild">
        <div className="section-heading auth-page-heading sign-page-heading-rebuild">
          <div>
            <p className="section-kicker">會員登入入口</p>
            <h1 className="page-title">登入 Bloom & Grace 會員帳戶</h1>
            <p className="page-description">這一頁重新收斂成更貼近 Stitch 的雙欄登入入口：左側品牌敘事與會員權益，右側是登入、註冊與重設密碼表單。</p>
          </div>
        </div>

        <div className="member-modal member-modal-page sign-page-panel-rebuild" role="region" aria-label="會員登入與註冊區塊">
          <div className="sign-page-layout">
            <div className="sign-page-visual-column">
              <div className="sign-page-brand-card">
                <span className="member-modal-brand-mark sign-page-brand-mark"><FloralLogo /></span>
                <div>
                  <p className="section-kicker">Bloom & Grace 會員禮遇</p>
                  <h2>{titleMap[mode]}</h2>
                  <p className="member-modal-description">{descriptionMap[mode]}</p>
                </div>
              </div>

              <div className="sign-page-hero-card">
                <img src={memberVisuals.welcome} alt="Bloom & Grace 會員登入視覺" className="sign-page-hero-image" />
                <div className="sign-page-hero-copy">
                  <span className="cart-banner-label">會員專屬入口</span>
                  <strong>登入後就能接續購物袋與結帳流程</strong>
                  <p>登入後即可延續購物袋、套用會員價格，並直接進入結帳與付款流程。</p>
                </div>
              </div>

              <div className="sign-page-benefit-grid">
                <article>
                  <span>01</span>
                  <strong>會員價格同步</strong>
                  <p>蝴蝶蘭、花籃與季節花禮都能同步顯示會員價差異。</p>
                </article>
                <article>
                  <span>02</span>
                  <strong>常用收件資料</strong>
                  <p>常用收件人與配送資訊可快速帶入，結帳更順。</p>
                </article>
              </div>
            </div>

            <div className="sign-page-form-column">
              <div className="member-tab-group sign-page-tab-group">
                <button type="button" className={mode === 'login' ? 'member-tab active' : 'member-tab'} onClick={() => handleModeChange('login')}>登入</button>
                <button type="button" className={mode === 'register' ? 'member-tab active' : 'member-tab'} onClick={() => handleModeChange('register')}>註冊</button>
                <button type="button" className={mode === 'forgot' ? 'member-tab active' : 'member-tab'} onClick={() => handleModeChange('forgot')}>重設密碼</button>
              </div>

              {mode === 'forgot' ? (
                <div className="member-process-strip">
                  <span className={forgotStep === 'request' ? 'active' : 'is-complete'}>1. 驗證 Email</span>
                  <span className={forgotStep === 'verify' ? 'active' : ''}>2. 設定新密碼</span>
                </div>
              ) : null}

              <form className="member-modal-body member-form-shell sign-page-form-shell" onSubmit={handleSubmit}>
                <div className={mode === 'login' ? 'member-form-grid member-form-grid-login' : 'member-form-grid'}>
                  {mode === 'register' ? (
                    <label>
                      姓名
                      <input name="name" value={formValue.name} onChange={handleInputChange} placeholder="請輸入你的姓名" required />
                    </label>
                  ) : null}

                  <label>
                    Email
                    <input name="email" type="email" value={formValue.email} onChange={handleInputChange} placeholder="member@bloomandgrace.tw" required />
                  </label>

                  {mode !== 'forgot' || forgotStep === 'verify' ? (
                    <label>
                      {mode === 'forgot' ? '新密碼' : '密碼'}
                      <input name="password" type="password" value={formValue.password} onChange={handleInputChange} placeholder="請輸入安全密碼" required />
                    </label>
                  ) : null}

                  {mode === 'register' || (mode === 'forgot' && forgotStep === 'verify') ? (
                    <label>
                      確認密碼
                      <input name="confirmPassword" type="password" value={formValue.confirmPassword} onChange={handleInputChange} placeholder="請再次輸入密碼" required />
                    </label>
                  ) : null}

                  {mode === 'forgot' && forgotStep === 'verify' ? (
                    <label>
                      6 碼驗證碼
                      <input name="resetCode" value={formValue.resetCode} onChange={handleInputChange} inputMode="numeric" maxLength={6} placeholder="例如：482913" required />
                    </label>
                  ) : null}
                </div>

                {mode === 'register' || (mode === 'forgot' && forgotStep === 'verify') ? (
                  <div className="password-strength-card">
                    <div className="password-strength-header">
                      <strong>{mode === 'register' ? '建立安全密碼' : '新密碼強度'}</strong>
                      <span className={`password-strength-pill tone-${passwordStrength.tone}`}>{passwordStrength.label}</span>
                    </div>
                    <div className="password-strength-bar">
                      <span style={{ width: `${(passwordStrength.score / 3) * 100}%` }} />
                    </div>
                    <div className="password-rule-list">
                      {passwordRules.map((rule) => (
                        <span key={rule.key} className={rule.test(formValue.password) ? 'is-pass' : ''}>{rule.label}</span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {formError ? <div className="member-form-error">{formError}</div> : null}

                <div className="member-modal-actions member-page-actions sign-page-actions">
                  <button type="button" className="secondary-button" onClick={() => navigateTo('/')}>返回首頁</button>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignInPage
