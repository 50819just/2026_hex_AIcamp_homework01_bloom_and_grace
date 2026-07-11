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
        title="購物袋還是空的"
        description="先去看看蝴蝶蘭與花籃吧，挑一份有質感又剛剛好的花禮，再慢慢整理成你的送禮清單。"
        actionLabel="回到選品頁"
        onAction={() => navigateTo('/shop')}
      />
    )
  }

  return (
    <div className="page-stack">
      <section className="content-section cart-page-shell">
        <div className="section-heading cart-page-heading">
          <div>
            <p className="section-kicker">購物袋總覽</p>
            <h1 className="page-title">你的 Bloom & Grace 購物袋</h1>
            <p className="page-description">先確認這次想送出的花禮、數量與會員價格，下一步就能順著這份心意繼續前往結帳。</p>
          </div>
        </div>

        <div className="cart-editorial-banner">
          <div>
            <span className="cart-banner-label">本次送禮清單</span>
            <strong>{cartItems.length} 款花禮已加入本次送禮清單</strong>
            <p>{isMember ? '會員價格已自動套用，結帳時會直接以目前金額建立訂單。' : '登入會員後可直接套用會員價格，購物袋內容也會保留。'}</p>
          </div>
          <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
            繼續挑選花禮
          </button>
        </div>

        <div className="cart-layout cart-layout-editorial">
          <div className="cart-list cart-list-editorial">
            {cartItems.map((item, index) => (
              <article key={item.id} className="cart-item cart-item-editorial">
                <div className="cart-item-order">0{index + 1}</div>
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

                <div className="cart-item-content cart-item-content-editorial">
                  <div className="cart-item-main">
                    <div>
                      <p className="cart-item-category">{item.categoryLabel}</p>
                      <h3>{item.name}</h3>
                    </div>
                    <span className="detail-tag">{item.tag}</span>
                  </div>

                  <p className="cart-item-description">{item.description}</p>

                  <div className="cart-item-row cart-item-row-editorial">
                    <div className="cart-item-quantity-block">
                      <span className="field-label">數量</span>
                      <QuantitySelector
                        value={item.quantity}
                        onDecrease={() => onDecreaseQuantity(item.id)}
                        onIncrease={() => onIncreaseQuantity(item.id)}
                      />
                    </div>

                    <div className="cart-prices cart-prices-editorial">
                      <span className="line-through-price">{formatPrice(item.originalPrice)}</span>
                      <strong>{formatPrice(isMember ? item.memberPrice : item.originalPrice)}</strong>
                      <small>小計 {formatPrice((isMember ? item.memberPrice : item.originalPrice) * item.quantity)}</small>
                    </div>

                    <button type="button" className="text-button danger" onClick={() => onRemoveItem(item.id)}>
                      移除品項
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary cart-summary-editorial">
            <p className="section-kicker">訂單摘要</p>
            <h2>這次花禮訂單摘要</h2>
            <p className="cart-summary-intro">所有品項與會員價差都會在這裡先整理好，確認沒問題就能前往下一步。</p>

            <dl>
              <div>
                <dt>原價合計</dt>
                <dd>{formatPrice(totals.originalTotal)}</dd>
              </div>
              <div>
                <dt>{isMember ? '會員合計' : '目前合計'}</dt>
                <dd>{formatPrice(totals.currentTotal)}</dd>
              </div>
              <div>
                <dt>折抵差額</dt>
                <dd>{formatPrice(totals.discount)}</dd>
              </div>
            </dl>

            <div className="cart-summary-note cart-summary-note-editorial">
              {isMember
                ? '你目前已登入會員，接下來建立訂單時會直接沿用會員價格。'
                : '登入會員後，這一份購物袋內容會保留，結帳時就能直接套用會員價。'}
            </div>

            <div className="cart-summary-service-list">
              <span>品牌花藝包裝</span>
              <span>祝福卡片代寫</span>
              <span>綠界安全付款</span>
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
