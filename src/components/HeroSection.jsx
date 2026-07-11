import { navigateTo } from '../hooks/useRouter'
import { referenceImages } from '../data/referenceImages'

function HeroSection() {
  return (
    <section className="hero-banner">
      <div className="hero-banner-media">
        <img src={referenceImages.heroBanner} alt="花店首頁主視覺" loading="eager" />
      </div>

      <div className="page-container hero-banner-content">
        <div className="hero-banner-copy">
          <p className="section-kicker hero-banner-kicker">花藝編輯選集</p>
          <h1>讓每一份心意都盛開</h1>
          <p>
            為人生重要時刻細緻安排的花禮，以安靜優雅的節奏，留下剛剛好的溫柔。
          </p>
          <div className="hero-banner-actions">
            <button type="button" className="primary-button" onClick={() => navigateTo('/shop')}>
              前往選購
            </button>
            <button type="button" className="secondary-button" onClick={() => navigateTo('/about')}>
              了解品牌故事
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
