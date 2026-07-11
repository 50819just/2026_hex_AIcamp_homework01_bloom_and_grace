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

  if (category === 'dried') {
    return 'theme-sand'
  }

  return 'theme-rose'
}

function ProductCard({
  product,
  isMember,
  onViewDetail,
  onQuickAdd,
  showDescription = true,
}) {
  return (
    <article className={`product-card ${getCategoryTheme(product.category)}`}>
      <a
        href={`/products/${product.id}`}
        className="product-card-link"
          onClick={(event) => {
          event.preventDefault()
          onViewDetail(product.id)
        }}
        aria-label={`查看 ${product.name}`}
      >
        <div className="product-image-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
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
            <span className="product-card-index">{product.categoryLabel}</span>
            {product.badge || product.tag ? <span className="product-tag">{product.badge || product.tag}</span> : null}
          </div>
        </div>

        <div className="product-card-body">
          <div className="product-card-meta">
            <p className="section-kicker">精選花禮</p>
            <h3>{product.name}</h3>
          </div>

          {showDescription ? <p className="product-description">{product.description}</p> : null}

          <div className="product-card-footer">
            <PriceBlock
              originalPrice={product.originalPrice}
              memberPrice={product.memberPrice}
              isMember={isMember}
              compact
            />

            <div className="product-card-actions">
              <button
                type="button"
                className="secondary-button product-card-action"
                onClick={() => onViewDetail(product.id)}
              >
                看更多
              </button>
              {onQuickAdd ? (
                <button
                  type="button"
                  className="primary-button product-card-action product-card-quick-add"
                  onClick={(event) => {
                    event.preventDefault()
                    onQuickAdd(product)
                  }}
                >
                  加入購物車
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </a>
    </article>
  )
}

export default ProductCard
