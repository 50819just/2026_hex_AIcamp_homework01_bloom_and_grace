import { useMemo, useState } from 'react'
import { createEcpayOrder } from '../lib/api'
import { submitEcpayCheckoutForm } from '../lib/ecpay'
import { formatPrice } from '../lib/formatters'
import EmptyState from '../components/EmptyState'
import { navigateTo } from '../hooks/useRouter'

const deliveryOptions = [
  { key: 'home', label: '宅配到府' },
  { key: 'store', label: '門市自取' },
]

const paymentOptions = [
  { key: 'ecpay', label: '綠界付款' },
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
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const itemsSummary = useMemo(
    () => cartItems.map((item) => `${item.name} x${item.quantity}`).join('#'),
    [cartItems],
  )

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="目前沒有可結帳的商品"
        description="先把喜歡的花禮加入購物車，再繼續結帳流程喔。"
        actionLabel="回到商品列表"
        onAction={() => navigateTo('/shop')}
      />
    )
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValue((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
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
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Checkout</p>
            <h1 className="page-title">前往結帳</h1>
            <p className="page-description">依序確認商品、送貨資訊與付款方式，完成後會跳轉到綠界付款頁。</p>
          </div>
        </div>

        <div className="checkout-steps-bar">
          <article className="checkout-step-pill">
            <span>01</span>
            <div>
              <strong>確認商品</strong>
              <p>檢查花禮品項、數量與金額</p>
            </div>
          </article>
          <article className="checkout-step-pill">
            <span>02</span>
            <div>
              <strong>填寫送貨資訊</strong>
              <p>確認收件人、電話與地址</p>
            </div>
          </article>
          <article className="checkout-step-pill">
            <span>03</span>
            <div>
              <strong>綠界付款</strong>
              <p>送出後跳轉至綠界付款頁</p>
            </div>
          </article>
        </div>

        <div className="checkout-steps">
          <article className="checkout-step-card">
            <span className="checkout-step-number">01</span>
            <h2>確認商品</h2>
            <div className="checkout-product-list">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-product-row">
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
            <article className="checkout-step-card">
              <span className="checkout-step-number">02</span>
              <h2>確認送貨地址與簽收人</h2>
              <div className="checkout-form-grid">
                <label>
                  簽收人姓名
                  <input
                    name="recipientName"
                    value={formValue.recipientName}
                    onChange={handleInputChange}
                    placeholder="請輸入簽收人姓名"
                    required
                  />
                </label>
                <label>
                  聯絡電話
                  <input
                    name="recipientPhone"
                    value={formValue.recipientPhone}
                    onChange={handleInputChange}
                    placeholder="請輸入聯絡電話"
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    name="recipientEmail"
                    type="email"
                    value={formValue.recipientEmail}
                    onChange={handleInputChange}
                    placeholder="請輸入 Email"
                    required
                  />
                </label>
                <label>
                  送貨方式
                  <select name="deliveryMethod" value={formValue.deliveryMethod} onChange={handleInputChange}>
                    {deliveryOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  縣市
                  <input
                    name="city"
                    value={formValue.city}
                    onChange={handleInputChange}
                    placeholder="例如：台北市"
                    required
                  />
                </label>
                <label>
                  區域
                  <input
                    name="district"
                    value={formValue.district}
                    onChange={handleInputChange}
                    placeholder="例如：大安區"
                    required
                  />
                </label>
                <label className="full-span">
                  詳細地址
                  <input
                    name="address"
                    value={formValue.address}
                    onChange={handleInputChange}
                    placeholder="請輸入完整地址"
                    required
                  />
                </label>
                <label className="full-span">
                  備註
                  <textarea
                    name="note"
                    rows="3"
                    value={formValue.note}
                    onChange={handleInputChange}
                    placeholder="例如：希望上午送達、需附卡片等"
                  />
                </label>
              </div>
            </article>

            <article className="checkout-step-card">
              <span className="checkout-step-number">03</span>
              <h2>付款方式</h2>
              <div className="payment-option-list">
                {paymentOptions.map((option) => (
                  <label key={option.key} className="payment-option-card">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.key}
                      checked={formValue.paymentMethod === option.key}
                      onChange={handleInputChange}
                    />
                    <div>
                      <strong>{option.label}</strong>
                      <p>安全付款，送出後將直接前往綠界頁面。</p>
                    </div>
                  </label>
                ))}
              </div>
            </article>

            <aside className="checkout-summary-card">
              <h2>訂單總覽</h2>
              <dl>
                <div>
                  <dt>商品原價合計</dt>
                  <dd>{formatPrice(totals.originalTotal)}</dd>
                </div>
                <div>
                  <dt>{isMember ? '會員價合計' : '本次結帳金額'}</dt>
                  <dd>{formatPrice(totals.currentTotal)}</dd>
                </div>
                <div>
                  <dt>會員優惠差額</dt>
                  <dd>{formatPrice(totals.discount)}</dd>
                </div>
              </dl>

              <div className="cart-summary-note">
                送出後會建立綠界訂單，並導向綠界測試付款頁完成付款。
              </div>

              <button type="submit" className="primary-button full-width" disabled={isSubmitting}>
                {isSubmitting ? '建立綠界訂單中...' : '確認送出，前往綠界付款'}
              </button>
            </aside>
          </form>
        </div>
      </section>
    </div>
  )
}

export default CheckoutPage
