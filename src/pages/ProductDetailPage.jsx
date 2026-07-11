import EmptyState from '../components/EmptyState'
import PriceBlock from '../components/PriceBlock'
import ProductCard from '../components/ProductCard'
import QuantitySelector from '../components/QuantitySelector'
import { navigateTo } from '../hooks/useRouter'
import { createPlaceholderImage } from '../lib/imagePlaceholders'

function ProductDetailPage({
  product,
  relatedProducts,
  quantity,
  isMember,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onAddToCart,
}) {
  if (!product) {
    return (
      <EmptyState
        title="找不到這個商品"
        description="這個花禮可能已下架，或你可以回到選品頁重新看看。"
        actionLabel="回到商品列表"
        onAction={() => navigateTo('/shop')}
      />
    )
  }

  return (
    <div className="page-stack">
      <section className="product-detail-layout product-detail-layout-editorial">
        <div className="product-detail-image-panel product-detail-image-panel-editorial">
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = createPlaceholderImage(
                product.name,
                product.category === 'basket'
                  ? 'gold'
                  : product.category === 'potted'
                    ? 'green'
                    : product.category === 'sympathy'
                      ? 'lavender'
                      : 'rose',
              )
            }}
          />
        </div>

        <div className="product-detail-info product-detail-info-editorial">
          <div className="product-detail-heading-block">
            <p className="section-kicker">{product.categoryLabel}</p>
            <h1 className="page-title">{product.name}</h1>
            <p className="page-description">{product.description}</p>
          </div>

          <PriceBlock
            originalPrice={product.originalPrice}
            memberPrice={product.memberPrice}
            isMember={isMember}
          />

          <div className="detail-meta detail-meta-editorial">
            <span className="detail-tag">{product.tag}</span>
            <span>適合開幕誌慶、節慶致禮與溫柔送心意</span>
          </div>

          <div className="product-detail-note-card">
            <strong>花藝包裝說明</strong>
            <p>這款花禮會以 Bloom & Grace 的品牌包裝方式整理，保留乾淨留白、細緻卡片與更穩定的送禮質感。</p>
          </div>

          <div className="detail-actions detail-actions-editorial">
            <div className="detail-actions-topline">
              <div>
                <p className="field-label">選擇數量</p>
                <QuantitySelector
                  value={quantity}
                  onDecrease={onDecreaseQuantity}
                  onIncrease={onIncreaseQuantity}
                />
              </div>
              <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
                回到選品頁
              </button>
            </div>
            <button type="button" className="primary-button full-width" onClick={() => onAddToCart(product, quantity)}>
              加入購物袋
            </button>
          </div>
        </div>
      </section>

      <section className="content-section related-products-shell">
        <div className="section-heading">
          <div>
            <p className="section-kicker">延伸推薦</p>
            <h2>相似調性的花禮推薦</h2>
          </div>
        </div>

        <div className="product-grid product-grid-editorial">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              isMember={isMember}
              onAddToCart={onAddToCart}
              onViewDetail={(productId) => navigateTo(`/products/${productId}`)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductDetailPage
