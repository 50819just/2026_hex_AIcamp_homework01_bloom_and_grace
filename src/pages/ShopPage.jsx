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
      <section className="content-section shop-page-shell">
        <div className="section-heading shop-page-heading">
          <div>
            <p className="section-kicker">選品花藝店</p>
            <h1 className="page-title">為不同情境挑一份剛剛好的花禮</h1>
            <p className="page-description">
              從開幕誌慶、節慶送禮到安靜溫柔的日常祝福，這一頁會把花禮整理得更像精品選品，而不是只是商品清單。
            </p>
          </div>
        </div>

        <div className="shop-editorial-banner">
          <div>
            <span className="cart-banner-label">花禮系列總覽</span>
            <strong>{products.length} 款花禮正在展開中</strong>
            <p>{isMember ? '你目前已登入會員，頁面上的價格會直接以會員價為主。' : '先慢慢挑選，登入會員後就能直接套用會員價格。'}</p>
          </div>
          <button type="button" className="secondary-button" onClick={() => navigateTo('/about')}>
            了解品牌故事
          </button>
        </div>

        <ShopToolbar
          categories={categories}
          currentCategory={currentCategory}
          searchText={searchText}
          onCategoryChange={onCategoryChange}
          onSearchChange={onSearchChange}
        />

        {products.length > 0 ? (
          <div className="product-grid product-grid-editorial">
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
