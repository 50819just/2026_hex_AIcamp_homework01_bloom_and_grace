import { useEffect, useMemo, useState } from 'react'
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

const memberHighlights = {
  login: [
    {
      title: '會員快速登入',
      body: '登入後即可同步會員價、常用收件資訊與購物流程。',
      image: memberVisuals.welcome,
      badge: '現正顯示',
    },
    {
      title: '最新消息｜母親節花禮開放預訂',
      body: '熱門花籃與蝴蝶蘭檔期已開跑，會員可更快查看專屬價格與備註需求。',
      image: memberVisuals.profile,
      badge: '最新消息',
    },
    {
      title: '送花流程更順手',
      body: '常用收件資料與送禮偏好可快速帶入，下一次下單不用重新填一輪。',
      image: memberVisuals.addressBook,
      badge: '會員流程',
    },
  ],
  register: [
    {
      title: '註冊後即可開啟更完整的會員流程',
      body: '建立帳號後會自動登入，後續查看會員價、帶入常用收件資料與整理送花資訊時，都會更直覺也更順手。',
      image: memberVisuals.welcome,
      badge: '歡迎畫面',
    },
    {
      title: '最新消息｜會員專屬價格同步展示',
      body: '註冊完成後，蝴蝶蘭、花籃與節慶花禮都能直接看到會員價差異。',
      image: memberVisuals.profile,
      badge: '最新消息',
    },
    {
      title: '常用資訊一次整理好',
      body: '收件人資料、卡片稱謂與常見送禮情境都能慢慢補齊，之後會更省時間。',
      image: memberVisuals.addressBook,
      badge: '會員建立',
    },
  ],
  forgot: [
    {
      title: '安全重設密碼',
      body: '先驗證電子郵件，再更新新密碼，流程更接近正式會員站。',
      image: memberVisuals.addressBook,
      badge: '安全',
    },
    {
      title: '最新消息｜登入保護持續升級',
      body: '之後可再接裝置驗證、登入通知與異常提醒，現在先把前端流程整理完整。',
      image: memberVisuals.profile,
      badge: '最新消息',
    },
  ],
}

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
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0)

  const passwordStrength = useMemo(() => getPasswordStrength(formValue.password), [formValue.password])

  const highlightItems = memberHighlights[mode]
  const activeHighlight = highlightItems[activeHighlightIndex] || highlightItems[0]


  useEffect(() => {
    if (!isOpen || highlightItems.length <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveHighlightIndex((previous) => (previous + 1) % highlightItems.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [highlightItems, isOpen])

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
    setActiveHighlightIndex(0)
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

  const titleMap = {
    login: '會員登入',
    register: '註冊會員',
    forgot: '重設密碼',
  }

  const descriptionMap = {
    login: '登入後即可查看會員價、帶入收件資料，並享有更完整的結帳體驗。',
    register: '建立帳號後可啟用會員價、保存送禮資料與後續訂單紀錄。',
    forgot: forgotStep === 'request'
      ? '先確認會員電子郵件，我們會寄出 6 碼驗證碼（示意）給你。'
      : '請輸入驗證碼並設定新密碼，流程會更像正式電商會員頁。',
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div className="member-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="icon-button member-modal-close" onClick={onClose} aria-label="關閉視窗">
          ×
        </button>

        {!isMember ? (
          <div className="member-modal-shell">
            <div className="member-modal-brand-row member-modal-brand-row-shell">
              <span className="member-modal-brand-mark">
                <FloralLogo />
              </span>
              <div>
                <p className="section-kicker">會員入口</p>
                <h2>{titleMap[mode]}</h2>
                <p className="member-modal-slogan">把送花這件事，整理成更溫柔、順手也更有質感的會員體驗</p>
                <p className="member-modal-description">{descriptionMap[mode]}</p>
              </div>
            </div>

            <div className="member-modal-panel member-modal-panel-intro">
              <div className="member-modal-hero-panel">
                <div className="member-modal-carousel-card">
                  <div className="member-modal-carousel-meta">
                    <span className="member-modal-carousel-kicker">會員放映室</span>
                    <span className="member-modal-carousel-badge">{activeHighlight.badge}</span>
                  </div>

                  <div className="member-modal-hero-image-wrap member-modal-register-image-wrap">
                    <img
                      className="member-modal-hero-image member-modal-register-image"
                      src={activeHighlight.image}
                      alt={activeHighlight.title}
                    />
                  </div>

                  <div className="member-modal-highlight-card member-modal-highlight-card-carousel">
                    <strong>{activeHighlight.title}</strong>
                    <p>{activeHighlight.body}</p>
                    {mode === 'register' ? (
                      <div className="member-modal-benefit-list" aria-label="註冊會員好處">
                        <span>查看會員專屬價格</span>
                        <span>快速帶入收件資料</span>
                        <span>保留常用送花資訊</span>
                      </div>
                    ) : null}
                  </div>

                  <div className="member-modal-carousel-controls" aria-label="放映室切換">
                    {highlightItems.map((item, index) => (
                      <button
                        key={item.title}
                        type="button"
                        className={index === activeHighlightIndex ? 'member-modal-carousel-dot active' : 'member-modal-carousel-dot'}
                        onClick={() => setActiveHighlightIndex(index)}
                        aria-label={`查看：${item.title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="member-modal-panel member-modal-panel-form">
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
              </div>

              {mode === 'forgot' ? (
                <div className="member-process-strip">
                  <span className={forgotStep === 'request' ? 'active' : 'is-complete'}>1. 驗證電子郵件</span>
                  <span className={forgotStep === 'verify' ? 'active' : ''}>2. 設定新密碼</span>
                </div>
              ) : null}

              <form className="member-modal-body member-form-shell" onSubmit={handleSubmit}>
                <div className={mode === 'login' ? 'member-form-grid member-form-grid-login' : 'member-form-grid'}>
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
                    電子郵件
                    <input
                      name="email"
                      type="email"
                      value={formValue.email}
                      onChange={handleInputChange}
                      placeholder="請輸入電子郵件"
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
                  <div className={mode === 'register' ? 'password-strength-card is-register' : 'password-strength-card'}>
                    <div className="password-strength-header">
                      <strong>{mode === 'register' ? '建立安全密碼' : '新密碼強度'}</strong>
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
                ) : null}

                {mode === 'login' ? (
                  <button
                    type="button"
                    className="member-subtle-link"
                    onClick={() => handleModeChange('forgot')}
                  >
                    忘記密碼？
                  </button>
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
            </div>
          </div>
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
