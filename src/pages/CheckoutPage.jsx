import { useMemo, useState } from 'react'
import { createEcpayOrder } from '../lib/api'
import { submitEcpayCheckoutForm } from '../lib/ecpay'
import { formatPrice } from '../lib/formatters'
import EmptyState from '../components/EmptyState'
import OrderSummary from '../components/OrderSummary'
import { memberVisuals } from '../data/memberAssets'
import { navigateTo } from '../hooks/useRouter'

const deliveryOptions = [
  {
    key: 'home',
    label: '宅配到府',
    description: '由花禮專車或合作物流配送，適合指定收件地址。',
  },
  {
    key: 'store',
    label: '門市自取',
    description: '保留花禮於門市，方便自行取件與確認卡片內容。',
  },
]

const paymentOptions = [
  {
    key: 'ecpay',
    label: '綠界線上付款',
    description: '送出後將跳轉綠界測試付款頁，可模擬信用卡或 ATM 流程。',
    badge: '安全加密',
  },
]

const invoiceOptions = [
  { key: 'personal', label: '個人電子發票' },
  { key: 'company', label: '公司統編發票' },
  { key: 'donation', label: '愛心捐贈碼' },
]

function CheckoutPage({ cartItems, isMember, totals, onNotify, onCheckoutSuccess }) {
  const [formValue, setFormValue] = useState({
    recipientName: '',
    recipientPhone: '',
    recipientEmail: '',
    deliveryMethod: 'home',
    city: '',
    district: '',
    address: '',
    note: '',
    paymentMethod: 'ecpay',
    invoiceType: 'personal',
    invoiceTitle: '',
    invoiceTaxId: '',
    donationCode: '',
    agreeTerms: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const itemsSummary = useMemo(
    () => cartItems.map((item) => `${item.name} x${item.quantity}`).join('#'),
    [cartItems],
  )

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="目前沒有可結帳的商品"
        description="先把喜歡的花禮加入購物袋，再繼續結帳流程喔。"
        actionLabel="回到選品頁"
        onAction={() => navigateTo('/shop')}
      />
    )
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormError('')
    setFormValue((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const validateForm = () => {
    if (!formValue.recipientName || !formValue.recipientPhone || !formValue.recipientEmail) {
      return '請先完整填寫簽收人聯絡資訊。'
    }

    if (formValue.deliveryMethod === 'home' && (!formValue.city || !formValue.district || !formValue.address)) {
      return '宅配到府需要完整縣市、區域與地址。'
    }

    if (formValue.invoiceType === 'company' && (!formValue.invoiceTitle || !formValue.invoiceTaxId)) {
      return '公司統編發票需要填寫公司抬頭與統一編號。'
    }

    if (formValue.invoiceType === 'donation' && !formValue.donationCode) {
      return '請填寫愛心捐贈碼。'
    }

    if (!formValue.agreeTerms) {
      return '請先同意服務條款與付款說明。'
    }

    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationMessage = validateForm()

    if (validationMessage) {
      setFormError(validationMessage)
      onNotify(validationMessage)
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createEcpayOrder({
        customerName: formValue.recipientName,
        email: formValue.recipientEmail,
        itemName: itemsSummary.slice(0, 200),
        amount: totals.currentTotal,
        tradeDescription: 'BloomGraceOrder',
      })

      onNotify('訂單資料已確認，正在前往綠界付款頁。')
      onCheckoutSuccess()
      submitEcpayCheckoutForm(result.action, result.fields)
    } catch (error) {
      onNotify(error.message || '建立綠界訂單失敗')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-stack">
      <section className="content-section checkout-page-shell">
        <div className="section-heading checkout-page-heading">
          <div>
            <p className="section-kicker">結帳流程</p>
            <h1 className="page-title">把這次花禮安排成一份完整訂單</h1>
            <p className="page-description">這個畫面會先整理商品、收件資訊、發票與付款方式，確認後再交給綠界進行付款。</p>
          </div>
        </div>

        <div className="checkout-steps-bar checkout-steps-bar-editorial">
          <article className="checkout-step-pill is-active">
            <span>01</span>
            <div>
              <strong>確認購物袋</strong>
              <p>確認花禮與數量</p>
            </div>
          </article>
          <article className="checkout-step-pill is-active">
            <span>02</span>
            <div>
              <strong>收件與配送</strong>
              <p>整理收件與發票資訊</p>
            </div>
          </article>
          <article className="checkout-step-pill is-active">
            <span>03</span>
            <div>
              <strong>安全付款</strong>
              <p>導向綠界測試付款</p>
            </div>
          </article>
        </div>

        <div className="checkout-process-banner checkout-process-banner-editorial">
          <div className="checkout-process-copy">
            <div className="checkout-banner-head">
              <span className="cart-banner-label">結帳提醒</span>
              <span className="checkout-test-card-note">
                測試用的：信用卡 4311-9522-2222-2222／到期年月任意未來日期／安全碼任意 3 碼／3D 驗證碼 1234
              </span>
            </div>
            <strong>付款仍會走綠界測試流程，先確認收件與發票資料會更順。</strong>
            <p>送出後會由本地端建立訂單，再導向綠界測試站完成付款，回站後也會照舊查單確認結果。</p>
            <div className="checkout-security-badges">
              <span>SSL 安全傳輸</span>
              <span>綠界測試環境</span>
              <span>{isMember ? '會員價已套用' : '訪客價格'}</span>
            </div>
          </div>
          <div className="checkout-process-visual">
            <img src={memberVisuals.profile} alt="結帳與付款流程示意" className="checkout-process-image" />
          </div>
        </div>

        <div className="checkout-editorial-layout">
          <div className="checkout-steps checkout-steps-editorial">
            <article className="checkout-step-card checkout-step-card-editorial">
              <span className="checkout-step-number">01</span>
              <h2>確認這次挑選的花禮</h2>
              <div className="checkout-product-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-product-row checkout-product-row-editorial">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.categoryLabel}</p>
                    </div>
                    <div className="checkout-product-meta">
                      <span>x {item.quantity}</span>
                      <span>{formatPrice((isMember ? item.memberPrice : item.originalPrice) * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <form className="checkout-form-layout" onSubmit={handleSubmit}>
              <article className="checkout-step-card checkout-step-card-editorial">
                <span className="checkout-step-number">02</span>
                <h2>收件人與配送資訊</h2>
                <p className="checkout-section-note">
                  <strong>必填：</strong>收件人姓名、聯絡電話、電子郵件、送貨方式。
                  {formValue.deliveryMethod === 'home' ? ' 宅配到府時，縣市、區域與詳細地址也都需要填寫。' : ' 門市自取時，宅配地址可保留為選填。'}
                  <br />
                  <strong>選填：</strong>卡片 / 配送備註。
                </p>
                <div className="checkout-form-grid">
                  <label>
                    簽收人姓名（必填）
                    <input
                      name="recipientName"
                      value={formValue.recipientName}
                      onChange={handleInputChange}
                      placeholder="請輸入簽收人姓名"
                      required
                    />
                  </label>
                  <label>
                    聯絡電話（必填）
                    <input
                      name="recipientPhone"
                      value={formValue.recipientPhone}
                      onChange={handleInputChange}
                      placeholder="請輸入聯絡電話"
                      required
                    />
                  </label>
                  <label>
                    電子郵件（必填）
                    <input
                      name="recipientEmail"
                      type="email"
                      value={formValue.recipientEmail}
                      onChange={handleInputChange}
                      placeholder="請輸入電子郵件"
                      required
                    />
                  </label>
                  <label>
                    送貨方式（必填）
                    <select name="deliveryMethod" value={formValue.deliveryMethod} onChange={handleInputChange}>
                      {deliveryOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    縣市{formValue.deliveryMethod === 'home' ? '（宅配必填）' : '（選填）'}
                    <input
                      name="city"
                      value={formValue.city}
                      onChange={handleInputChange}
                      placeholder="例如：台北市"
                      required={formValue.deliveryMethod === 'home'}
                    />
                  </label>
                  <label>
                    區域{formValue.deliveryMethod === 'home' ? '（宅配必填）' : '（選填）'}
                    <input
                      name="district"
                      value={formValue.district}
                      onChange={handleInputChange}
                      placeholder="例如：大安區"
                      required={formValue.deliveryMethod === 'home'}
                    />
                  </label>
                  <label className="full-span">
                    詳細地址{formValue.deliveryMethod === 'home' ? '（宅配必填）' : '（選填）'}
                    <input
                      name="address"
                      value={formValue.address}
                      onChange={handleInputChange}
                      placeholder={formValue.deliveryMethod === 'store' ? '若門市自取，可填寫備用聯絡地址' : '請輸入完整地址'}
                      required={formValue.deliveryMethod === 'home'}
                    />
                  </label>
                  <label className="full-span">
                    卡片 / 配送備註（選填）
                    <textarea
                      name="note"
                      rows="3"
                      value={formValue.note}
                      onChange={handleInputChange}
                      placeholder="例如：卡片署名、希望上午送達、門市自取時間等"
                    />
                  </label>
                </div>
              </article>

              <article className="checkout-step-card checkout-step-card-editorial">
                <span className="checkout-step-number">03</span>
                <h2>付款方式與發票資訊</h2>
                <div className="payment-option-list">
                  {paymentOptions.map((option) => (
                    <label key={option.key} className={formValue.paymentMethod === option.key ? 'payment-option-card selected' : 'payment-option-card'}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.key}
                        checked={formValue.paymentMethod === option.key}
                        onChange={handleInputChange}
                      />
                      <div>
                        <div className="payment-option-header">
                          <strong>{option.label}</strong>
                          <span>{option.badge}</span>
                        </div>
                        <p>{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="checkout-inline-grid">
                  <label>
                    發票類型
                    <select name="invoiceType" value={formValue.invoiceType} onChange={handleInputChange}>
                      {invoiceOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {formValue.invoiceType === 'company' ? (
                    <>
                      <label>
                        公司抬頭
                        <input
                          name="invoiceTitle"
                          value={formValue.invoiceTitle}
                          onChange={handleInputChange}
                          placeholder="請輸入公司抬頭"
                        />
                      </label>
                      <label>
                        統一編號
                        <input
                          name="invoiceTaxId"
                          value={formValue.invoiceTaxId}
                          onChange={handleInputChange}
                          placeholder="請輸入 8 碼統編"
                        />
                      </label>
                    </>
                  ) : null}

                  {formValue.invoiceType === 'donation' ? (
                    <label>
                      愛心捐贈碼
                      <input
                        name="donationCode"
                        value={formValue.donationCode}
                        onChange={handleInputChange}
                        placeholder="請輸入捐贈碼"
                      />
                    </label>
                  ) : null}
                </div>

                <div className="checkout-trust-box">
                  <strong>付款前提醒</strong>
                  <ul>
                    {deliveryOptions.map((option) => (
                      <li key={option.key}>{option.label}：{option.description}</li>
                    ))}
                    <li>測試信用卡卡號：4311-9522-2222-2222</li>
                    <li>到期年月：任意未來日期</li>
                    <li>安全碼：任意 3 碼</li>
                    <li>3D 驗證碼：1234</li>
                  </ul>
                </div>

                <label className="checkout-agreement">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formValue.agreeTerms}
                    onChange={handleInputChange}
                  />
                  <span>我已確認配送資訊、付款方式與發票內容，並同意送出後前往綠界測試付款頁。</span>
                </label>

                {formError ? <div className="checkout-form-error">{formError}</div> : null}

                <div className="checkout-submit-row">
                  <button type="button" className="secondary-button" onClick={() => navigateTo('/cart')}>
                    回到購物袋
                  </button>
                  <button type="submit" className="primary-button" disabled={isSubmitting}>
                    {isSubmitting ? '正在整理付款資料…' : '前往綠界付款'}
                  </button>
                </div>
              </article>
            </form>
          </div>

          <OrderSummary
            kicker="付款前摘要"
            title="付款前最後確認"
            rows={[
              { label: '原價合計', value: formatPrice(totals.originalTotal) },
              { label: isMember ? '會員合計' : '目前合計', value: formatPrice(totals.currentTotal) },
              { label: '會員差額', value: formatPrice(totals.discount) },
            ]}
            totalLabel="合計"
            totalValue={formatPrice(totals.currentTotal)}
            serviceItems={['新鮮花禮配送整理', '祝福卡片留言', '付款回站查詢']}
            note="送出後會照舊由本地端建立綠界訂單，再前往測試付款頁。"
            className="checkout-summary-card-editorial"
          />
        </div>
      </section>
    </div>
  )
}

export default CheckoutPage
