import EmptyState from '../components/EmptyState'
import OrderSummary from '../components/OrderSummary'
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
        title="購物袋是空的"
        description="先到花藝選集看看，挑幾款喜歡的花禮加入購物袋吧。"
        actionLabel="回到選購頁"
        onAction={() => navigateTo('/shop')}
      />
    )
  }

  return (
    <div className="page-stack">
      <section className="page-container cart-page">
        <div className="cart-intro">
          <p className="section-kicker">你的選擇</p>
          <h1 className="page-title">購物袋</h1>
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
                  <div className="cart-item-header">
                    <div>
                      <p className="cart-item-category">{item.categoryLabel}</p>
                      <h3>{item.name}</h3>
                      <p className="cart-item-subtitle">{item.variantLabel || item.tag}</p>
                    </div>
                    <strong className="cart-item-price">
                      {formatPrice(isMember ? item.memberPrice : item.originalPrice)}
                    </strong>
                  </div>

                  <div className="cart-item-footer">
                    <QuantitySelector
                      value={item.quantity}
                      onDecrease={() => onDecreaseQuantity(item.id)}
                      onIncrease={() => onIncreaseQuantity(item.id)}
                    />

                    <div className="cart-item-actions">
                      <span>{formatPrice((isMember ? item.memberPrice : item.originalPrice) * item.quantity)}</span>
                      <button type="button" className="text-button danger" onClick={() => onRemoveItem(item.id)}>
                        移除
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <OrderSummary
            kicker="訂單摘要"
            title="訂單摘要"
            rows={[
              { label: '小計', value: formatPrice(totals.originalTotal) },
              { label: '配送', value: '結帳時計算' },
              { label: '會員折扣', value: `-${formatPrice(totals.discount)}` },
            ]}
            totalLabel="合計"
            totalValue={formatPrice(totals.currentTotal)}
            serviceItems={['新鮮花禮配送整理', '祝福卡片留言', '付款回站查詢']}
            action={(
              <button type="button" className="primary-button full-width" onClick={onCheckout}>
                前往結帳
              </button>
            )}
            className="cart-summary-editorial"
          />
        </div>
      </section>
    </div>
  )
}

export default CartPage
