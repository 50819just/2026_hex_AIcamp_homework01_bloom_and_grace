import EmptyState from '../components/EmptyState'
import QuantitySelector from '../components/QuantitySelector'
import { formatPrice } from '../lib/formatters'
import { navigateTo } from '../hooks/useRouter'
import { createPlaceholderImage } from '../lib/imagePlaceholders'

function CartPage({
  cartItems,
  isMember,
  totals,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onCheckout,
}) {
  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="購物車還是空的"
        description="先去看看蝴蝶蘭與花籃吧，選一份溫柔又有質感的花禮帶回家。"
        actionLabel="前往商品列表"
        onAction={() => navigateTo('/shop')}
      />
    )
  }

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Cart</p>
            <h1 className="page-title">購物車</h1>
            <p className="page-description">確認花禮品項、數量與會員優惠差異。</p>
          </div>
        </div>

        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map((item) => (
              <article key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = createPlaceholderImage(
                      item.name,
                      item.category === 'basket'
                        ? 'gold'
                        : item.category === 'potted'
                          ? 'green'
                          : item.category === 'sympathy'
                            ? 'lavender'
                            : 'rose',
                    )
                  }}
                />

                <div className="cart-item-content">
                  <div>
                    <p className="cart-item-category">{item.categoryLabel}</p>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div className="cart-item-row">
                    <QuantitySelector
                      value={item.quantity}
                      onDecrease={() => onDecreaseQuantity(item.id)}
                      onIncrease={() => onIncreaseQuantity(item.id)}
                    />
                    <div className="cart-prices">
                      <span className="line-through-price">{formatPrice(item.originalPrice)}</span>
                      <strong>{formatPrice(isMember ? item.memberPrice : item.originalPrice)}</strong>
                      <small>小計 {formatPrice((isMember ? item.memberPrice : item.originalPrice) * item.quantity)}</small>
                    </div>
                    <button type="button" className="text-button danger" onClick={() => onRemoveItem(item.id)}>
                      移除
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>訂單摘要</h2>
            <dl>
              <div>
                <dt>原價合計</dt>
                <dd>{formatPrice(totals.originalTotal)}</dd>
              </div>
              <div>
                <dt>{isMember ? '會員價合計' : '目前購物合計'}</dt>
                <dd>{formatPrice(totals.currentTotal)}</dd>
              </div>
              <div>
                <dt>會員可省下</dt>
                <dd>{formatPrice(totals.discount)}</dd>
              </div>
            </dl>

            <div className="cart-summary-note">
              {isMember ? '你目前已登入會員，結帳時可享會員價。' : '登入會員後，結帳即可套用會員價格。'}
            </div>

            <button type="button" className="primary-button full-width" onClick={onCheckout}>
              前往結帳
            </button>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default CartPage
