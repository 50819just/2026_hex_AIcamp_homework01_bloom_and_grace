import { products } from '../data/products'
import HeroSection from '../components/HeroSection'
import FeatureGrid from '../components/FeatureGrid'
import MemberPromo from '../components/MemberPromo'
import ProductCard from '../components/ProductCard'
import { navigateTo } from '../hooks/useRouter'

function HomePage({ isMember, onAddToCart, onOpenMemberModal }) {
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="page-stack">
      <HeroSection />
      <FeatureGrid />

      <section className="content-section home-featured-shell">
        <div className="section-heading home-featured-heading">
          <div>
            <p className="section-kicker">本季主打選品</p>
            <h2>適合每一個值得被好好送出的時刻</h2>
          </div>
          <button type="button" className="text-button" onClick={() => navigateTo('/shop')}>
            查看完整花禮
          </button>
        </div>

        <div className="home-featured-banner">
          <div>
            <span className="cart-banner-label">首頁精選花禮</span>
            <strong>{isMember ? '會員價格已啟用，可以直接把喜歡的花禮收進購物袋' : '先慢慢挑選，登入會員後就能直接套用會員價格'}</strong>
            <p>首頁這一區改成比較像 Stitch 畫面裡的精選段落，讓你一進站就能抓到品牌的節奏與主打品項。</p>
          </div>
          <button type="button" className="secondary-button" onClick={onOpenMemberModal}>
            {isMember ? '前往會員中心' : '會員登入 / 註冊'}
          </button>
        </div>

        <div className="product-grid product-grid-editorial">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isMember={isMember}
              onAddToCart={onAddToCart}
              onViewDetail={(productId) => navigateTo(`/products/${productId}`)}
            />
          ))}
        </div>
      </section>

      <MemberPromo isMember={isMember} onOpenMemberModal={onOpenMemberModal} />
    </div>
  )
}

export default HomePage
