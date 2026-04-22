import { useMemo, useState } from 'react'
import FloralLogo from './FloralLogo'
import { memberVisuals } from '../data/memberAssets'

const passwordRules = [
  {
    key: 'length',
    label: '8 碼以上',
    test: (value) => value.length >= 8,
  },
  {
    key: 'uppercase',
    label: '包含英文大寫',
    test: (value) => /[A-Z]/.test(value),
  },
  {
    key: 'number',
    label: '包含數字',
    test: (value) => /\d/.test(value),
  },
]

function getPasswordStrength(password) {
  const score = passwordRules.filter((rule) => rule.test(password)).length

  if (!password) {
    return { label: '尚未輸入', tone: 'muted', score: 0 }
  }

  if (score <= 1) {
    return { label: '弱', tone: 'danger', score }
  }

  if (score === 2) {
    return { label: '中', tone: 'warning', score }
  }

  return { label: '高', tone: 'success', score }
}

function MemberModal({ isOpen, isMember, onClose, onMemberLogin, onMemberLogout, onNotify }) {
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

  if (!isOpen) {
    return null
  }

  const resetForm = () => {
    setFormError('')
    setForgotStep('request')
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
    setForgotStep(nextMode === 'forgot' ? 'request' : 'request')
  }

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
    forgot: '重設密碼',
  }

  const descriptionMap = {
    login: '登入後即可查看會員價、帶入收件資料，並享有更完整的結帳體驗。',
    register: '建立帳號後可啟用會員價、保存送禮資料與後續訂單紀錄。',
    forgot: forgotStep === 'request'
      ? '先確認會員 Email，我們會寄出 6 碼驗證碼（示意）給你。'
      : '請輸入驗證碼並設定新密碼，流程會更像正式電商會員頁。',
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div className="member-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="member-modal-header">
          <div className="member-modal-branding">
            <div className="member-modal-brand-row">
              <span className="member-modal-brand-mark">
                <FloralLogo />
              </span>
              <div>
                <p className="section-kicker">Bloom & Grace Member</p>
                <h2>{titleMap[mode]}</h2>
                <p className="member-modal-slogan">把祝福、感謝與思念，交給一份溫柔有質感的花禮</p>
                <p className="member-modal-description">{descriptionMap[mode]}</p>
              </div>
            </div>
            <div className="member-modal-hero-panel">
              <div className="member-modal-hero-image-wrap">
                <img
                  className="member-modal-hero-image"
                  src={mode === 'forgot' ? memberVisuals.addressBook : memberVisuals.welcome}
                  alt="Bloom & Grace 會員體驗示意"
                />
              </div>
              <div className="member-modal-highlight-card">
                <strong>{mode === 'login' ? '會員快速登入' : mode === 'register' ? '建立品牌會員帳號' : '安全重設密碼'}</strong>
                <p>
                  {mode === 'login'
                    ? '登入後即可同步會員價、常用收件資訊與購物流程。'
                    : mode === 'register'
                      ? '完成註冊後會自動登入，之後結帳體驗會更完整。'
                      : '先驗證 Email，再更新新密碼，流程更接近正式會員站。'}
                </p>
              </div>
            </div>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="關閉視窗">
            ×
          </button>
        </div>

        {!isMember ? (
          <>
            <div className="member-tab-group">
              <button
                type="button"
                className={mode === 'login' ? 'member-tab active' : 'member-tab'}
                onClick={() => handleModeChange('login')}
              >
                登入
              </button>
              <button
                type="button"
                className={mode === 'register' ? 'member-tab active' : 'member-tab'}
                onClick={() => handleModeChange('register')}
              >
                註冊
              </button>
              <button
                type="button"
                className={mode === 'forgot' ? 'member-tab active' : 'member-tab'}
                onClick={() => handleModeChange('forgot')}
              >
                忘記密碼
              </button>
            </div>

            {mode === 'forgot' ? (
              <div className="member-process-strip">
                <span className={forgotStep === 'request' ? 'active' : 'is-complete'}>1. 驗證 Email</span>
                <span className={forgotStep === 'verify' ? 'active' : ''}>2. 設定新密碼</span>
              </div>
            ) : null}

            <form className="member-modal-body member-form-shell" onSubmit={handleSubmit}>
              <div className="member-form-grid">
                {mode === 'register' ? (
                  <label>
                    姓名
                    <input
                      name="name"
                      value={formValue.name}
                      onChange={handleInputChange}
                      placeholder="請輸入你的姓名"
                      required
                    />
                  </label>
                ) : null}

                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    value={formValue.email}
                    onChange={handleInputChange}
                    placeholder="member@bloomandgrace.tw"
                    required
                  />
                </label>

                {mode !== 'forgot' || forgotStep === 'verify' ? (
                  <label>
                    {mode === 'forgot' ? '新密碼' : '密碼'}
                    <input
                      name="password"
                      type="password"
                      value={formValue.password}
                      onChange={handleInputChange}
                      placeholder="請輸入安全密碼"
                      required
                    />
                  </label>
                ) : null}

                {mode === 'register' || (mode === 'forgot' && forgotStep === 'verify') ? (
                  <label>
                    確認密碼
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formValue.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="請再次輸入密碼"
                      required
                    />
                  </label>
                ) : null}

                {mode === 'forgot' && forgotStep === 'verify' ? (
                  <label>
                    6 碼驗證碼
                    <input
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
              </div>

              {mode === 'register' || (mode === 'forgot' && forgotStep === 'verify') ? (
                <>
                  <div className="password-strength-card">
                    <div className="password-strength-header">
                      <strong>密碼強度</strong>
                      <span className={`password-strength-pill tone-${passwordStrength.tone}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="password-strength-bar">
                      <span style={{ width: `${(passwordStrength.score / 3) * 100}%` }} />
                    </div>
                    <div className="password-rule-list">
                      {passwordRules.map((rule) => (
                        <span key={rule.key} className={rule.test(formValue.password) ? 'is-pass' : ''}>
                          {rule.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}

              {mode === 'login' ? (
                <div className="member-inline-note">
                  <span>安全登入示意</span>
                  <p>正式站通常會搭配裝置驗證、登入通知與風險偵測，這裡先做成高擬真前端流程。</p>
                </div>
              ) : null}

              {formError ? <div className="member-form-error">{formError}</div> : null}

              <div className="member-modal-actions">
                <button type="button" className="secondary-button" onClick={onClose}>
                  稍後再說
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
          </>
        ) : (
          <div className="member-modal-logged-in">
            <p>你目前已登入會員，可以直接前往會員中心查看資料，或從購物車快速進入結帳流程。</p>
            <div className="member-modal-actions">
              <button type="button" className="secondary-button" onClick={onMemberLogout}>
                登出
              </button>
              <button type="button" className="primary-button" onClick={onClose}>
                關閉
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MemberModal
