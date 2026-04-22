import PriceBlock from './PriceBlock'
import { createPlaceholderImage } from '../lib/imagePlaceholders'

function getCategoryTheme(category) {
  if (category === 'basket') {
    return 'theme-gold'
  }

  if (category === 'potted') {
    return 'theme-green'
  }

  if (category === 'sympathy') {
    return 'theme-lavender'
  }

  return 'theme-rose'
}

function ProductCard({ product, isMember, onAddToCart, onViewDetail, actionLabel = '查看詳情' }) {
  return (
    <article className={`product-card ${getCategoryTheme(product.category)}`}>
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
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
        <span className="product-tag">{product.tag}</span>
      </div>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-category">{product.categoryLabel}</span>
          <h3>{product.name}</h3>
        </div>

        <p className="product-description">{product.description}</p>
        <PriceBlock
          originalPrice={product.originalPrice}
          memberPrice={product.memberPrice}
          isMember={isMember}
        />

        <div className="product-card-actions">
          <button type="button" className="secondary-button" onClick={() => onViewDetail(product.id)}>
            {actionLabel}
          </button>
          <button type="button" className="primary-button" onClick={() => onAddToCart(product, 1)}>
            加入購物車
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
