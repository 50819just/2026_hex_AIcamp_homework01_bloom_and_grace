import { navigateTo } from '../hooks/useRouter'
import { referenceImages } from '../data/referenceImages'

function HeroSection() {
  return (
    <section className="hero-section hero-section-reference">
      <div className="hero-copy">
        <p className="section-kicker">L'Atelier Botanique</p>
        <h1 className="hero-title">讓每一份花禮，都像一頁被細心編排的祝福</h1>
        <p className="hero-description">
          Bloom & Grace 以編輯感留白、深森林綠與高質感花藝攝影，整理出更安靜、優雅也更完整的送禮購物體驗。
        </p>
        <div className="hero-actions">
          <button type="button" className="primary-button" onClick={() => navigateTo('/shop')}>
            進入選品頁
          </button>
          <button type="button" className="secondary-button" onClick={() => navigateTo('/about')}>
            查看品牌故事
          </button>
        </div>
      </div>

      <div className="hero-visual hero-visual-reference">
        <img src={referenceImages.heroBanner} alt="Bloom & Grace 首頁花藝主視覺" className="hero-reference-image" />
      </div>
    </section>
  )
}

export default HeroSection
