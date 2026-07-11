import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import ShopToolbar from '../components/ShopToolbar'
import { categories } from '../data/products'
import { navigateTo } from '../hooks/useRouter'

function ShopPage({
  products,
  isMember,
  currentCategory,
  searchText,
  onCategoryChange,
  onSearchChange,
  onQuickAdd,
}) {
  return (
    <div className="page-stack">
      <section className="page-container shop-page">
        <div className="shop-intro">
          <p className="section-kicker">精選花藝</p>
          <h1 className="page-title">花藝選集</h1>
          <p className="page-description">
            這裡整理了招牌花束、植栽與送禮花禮，每一款都保留安靜、俐落又有層次的編輯感。
          </p>
        </div>

        <ShopToolbar
          categories={categories}
          currentCategory={currentCategory}
          searchText={searchText}
          onCategoryChange={onCategoryChange}
          onSearchChange={onSearchChange}
        />

        {products.length > 0 ? (
          <div className="product-grid product-grid-shop">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isMember={isMember}
                onViewDetail={(productId) => navigateTo(`/products/${productId}`)}
                onQuickAdd={onQuickAdd}
                showDescription
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="沒有找到符合的花禮"
            description="可以試試其他分類，或換個關鍵字再找找看。"
            actionLabel="清除篩選"
            onAction={() => {
              onCategoryChange('all')
              onSearchChange('')
            }}
          />
        )}

        <div className="shop-footer-cta">
          <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
            查看更多花禮
          </button>
        </div>
      </section>
    </div>
  )
}

export default ShopPage
