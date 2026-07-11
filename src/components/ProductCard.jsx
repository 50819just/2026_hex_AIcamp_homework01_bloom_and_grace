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

function ProductCard({ product, isMember, onAddToCart, onViewDetail, actionLabel = '查看花禮細節' }) {
  return (
    <article className={`product-card product-card-editorial ${getCategoryTheme(product.category)}`}>
      <div className="product-image-wrap product-image-wrap-editorial">
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
        <div className="product-card-topline">
          <span className="product-tag">{product.tag}</span>
          <span className="product-card-index">{product.categoryLabel}</span>
        </div>
      </div>

        <div className="product-card-body product-card-body-editorial">
          <div className="product-card-meta product-card-meta-editorial">
            <p className="section-kicker">精選花藝單品</p>
            <h3>{product.name}</h3>
          </div>

        <p className="product-description">{product.description}</p>
        <PriceBlock
          originalPrice={product.originalPrice}
          memberPrice={product.memberPrice}
          isMember={isMember}
        />

        <div className="product-card-actions product-card-actions-editorial">
          <button type="button" className="secondary-button" onClick={() => onViewDetail(product.id)}>
            {actionLabel}
          </button>
          <button type="button" className="primary-button" onClick={() => onAddToCart(product, 1)}>
            加入購物袋
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
