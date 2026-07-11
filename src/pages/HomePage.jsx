import { homeCategories, products } from '../data/products'
import HeroSection from '../components/HeroSection'
import FeatureGrid from '../components/FeatureGrid'
import MemberPromo from '../components/MemberPromo'
import ProductCard from '../components/ProductCard'
import { navigateTo } from '../hooks/useRouter'
import { createPlaceholderImage } from '../lib/imagePlaceholders'

const featuredProductIds = ['peony-blush-01', 'midnight-ranunculus-02', 'dune-hydrangea-03', 'spring-awakening-04']

function HomePage({ isMember, onOpenMemberModal, onQuickAdd }) {
  const featuredProducts = featuredProductIds
    .map((productId) => products.find((product) => product.id === productId))
    .filter(Boolean)

  return (
    <div className="page-stack home-page">
      <HeroSection />
      <FeatureGrid />

      <section className="page-container home-section">
        <div className="section-heading section-heading-home">
          <div>
            <p className="section-kicker">精選分類</p>
            <h2>依花禮分類瀏覽</h2>
          </div>
        </div>

        <div className="category-grid">
          {homeCategories.map((category) => (
            <button
              key={category.key}
              type="button"
              className="category-card"
              onClick={() => navigateTo('/shop')}
            >
              <img
                src={category.image}
                alt={category.label}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = createPlaceholderImage(category.label, 'green')
                }}
              />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="page-container home-section">
        <div className="section-heading section-heading-home">
          <div>
            <p className="section-kicker">新品上架</p>
            <h2>最新花禮</h2>
          </div>
          <button type="button" className="text-button" onClick={() => navigateTo('/shop')}>
            查看全部
          </button>
        </div>

        <div className="product-grid product-grid-home">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isMember={isMember}
              onViewDetail={(productId) => navigateTo(`/products/${productId}`)}
              onQuickAdd={onQuickAdd}
              showDescription={false}
            />
          ))}
        </div>
      </section>

      <MemberPromo isMember={isMember} onOpenMemberModal={onOpenMemberModal} />
    </div>
  )
}

export default HomePage
