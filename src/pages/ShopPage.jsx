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
  onAddToCart,
}) {
  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Shop</p>
            <h1 className="page-title">花店選品</h1>
            <p className="page-description">
              依照送禮情境、花禮風格與會員價格，輕鬆挑選適合的花店品項。
            </p>
          </div>
        </div>

        <ShopToolbar
          categories={categories}
          currentCategory={currentCategory}
          searchText={searchText}
          onCategoryChange={onCategoryChange}
          onSearchChange={onSearchChange}
        />

        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isMember={isMember}
                onAddToCart={onAddToCart}
                onViewDetail={(productId) => navigateTo(`/products/${productId}`)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="目前沒有符合條件的花禮"
            description="可以試著更換分類或搜尋關鍵字，看看其他溫柔花禮喔。"
            actionLabel="清除搜尋條件"
            onAction={() => {
              onCategoryChange('all')
              onSearchChange('')
            }}
          />
        )}
      </section>
    </div>
  )
}

export default ShopPage
