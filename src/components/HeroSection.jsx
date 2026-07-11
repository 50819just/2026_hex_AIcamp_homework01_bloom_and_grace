import { navigateTo } from '../hooks/useRouter'
import { referenceImages } from '../data/referenceImages'

function HeroSection() {
  return (
    <section className="hero-section hero-section-reference">
      <div className="hero-copy">
        <p className="section-kicker">Bloom & Grace</p>
        <h1 className="hero-title">讓花裝點生活每一刻</h1>
        <p className="hero-description">
          精選蝴蝶蘭、花籃與盆花，由花藝師整理成更適合送禮與居家擺設的作業版花店購物體驗。
        </p>
        <div className="hero-actions">
          <button type="button" className="primary-button" onClick={() => navigateTo('/shop')}>
            立即選購
          </button>
          <button type="button" className="secondary-button" onClick={() => navigateTo('/cart')}>
            查看購物車
          </button>
        </div>
      </div>

      <div className="hero-visual hero-visual-reference">
        <img src={referenceImages.heroBanner} alt="花店主視覺" className="hero-reference-image" />
      </div>
    </section>
  )
}

export default HeroSection
