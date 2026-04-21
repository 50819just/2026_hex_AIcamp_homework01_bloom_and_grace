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

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">精選花禮</p>
            <h2>適合每一個值得好好送出的時刻</h2>
          </div>
          <button type="button" className="text-button" onClick={() => navigateTo('/shop')}>
            查看全部商品
          </button>
        </div>

        <div className="product-grid">
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
