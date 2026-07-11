import { useMemo, useState } from 'react'
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
  const gallery = useMemo(() => product?.gallery || [product?.image].filter(Boolean), [product])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!product) {
    return (
      <EmptyState
        title="找不到這項花禮"
        description="這個品項可能已經下架了，先回到花藝選集看看其他款式吧。"
        actionLabel="回到選購頁"
        onAction={() => navigateTo('/shop')}
      />
    )
  }

  const selectedImage = gallery[selectedImageIndex] || product.image

  return (
    <div className="page-stack">
      <section className="page-container product-detail-page">
        <div className="product-detail-breadcrumbs">
          <button type="button" onClick={() => navigateTo('/')}>
            首頁
          </button>
          <span>›</span>
          <button type="button" onClick={() => navigateTo('/shop')}>
            花藝選集
          </button>
          <span>›</span>
          <span>{product.categoryLabel}</span>
        </div>

        <div className="product-detail-layout">
          <div className="product-gallery">
            <div className="product-gallery-main">
              <img
                src={selectedImage}
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

            <div className="product-gallery-thumbs" aria-label="商品圖庫縮圖">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={selectedImageIndex === index ? 'product-gallery-thumb is-active' : 'product-gallery-thumb'}
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`查看第 ${index + 1} 張圖片`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
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
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail-info">
            <p className="section-kicker">{product.categoryLabel}</p>
            <h1 className="page-title">{product.name}</h1>
            <p className="page-description">{product.description}</p>

            <PriceBlock
              originalPrice={product.originalPrice}
              memberPrice={product.memberPrice}
              isMember={isMember}
            />

            {product.swatches ? (
              <div className="product-swatches">
                <div className="product-swatches-label">
                  <span>花器顏色</span>
                  <strong>{product.variantLabel}</strong>
                </div>
                <div className="product-swatches-list" aria-label="花器色票">
                  {product.swatches.map((swatch, index) => (
                    <span key={swatch} className={index === 0 ? 'product-swatch is-active' : 'product-swatch'} title={swatch} />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="product-purchase-bar">
              <QuantitySelector
                value={quantity}
                onDecrease={onDecreaseQuantity}
                onIncrease={onIncreaseQuantity}
              />
              <button type="button" className="primary-button" onClick={() => onAddToCart(product, quantity)}>
                加入購物袋
              </button>
            </div>

            <div className="product-accordion">
              <details open>
                <summary>照顧方式</summary>
                <div className="accordion-body">
                  <p>蝴蝶蘭適合明亮散光的環境，澆水少量即可，讓根部保持透氣。</p>
                  <ul>
                    {(product.careNotes || []).map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </details>

              <details>
                <summary>配送與退換</summary>
                <div className="accordion-body">
                  <p>{product.deliveryCopy}</p>
                  <p>退換規則會依照目前的門市政策與配送條件處理。</p>
                </div>
              </details>

              <details>
                <summary>花材來源</summary>
                <div className="accordion-body">
                  <p>{product.sourcingCopy}</p>
                  <p>
                    每一份花禮都以優雅、平衡與安靜的質感完成編排。
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="product-related-section">
          <div className="page-container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">延伸推薦</p>
                <h2>你可能也會喜歡</h2>
              </div>
            </div>

            <div className="product-grid product-grid-related">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  isMember={isMember}
                  onViewDetail={(productId) => navigateTo(`/products/${productId}`)}
                  onQuickAdd={(item) => onAddToCart(item, 1)}
                  showDescription={false}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default ProductDetailPage
