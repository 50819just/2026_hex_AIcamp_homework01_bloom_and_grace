import { useEffect, useState } from 'react'
import { products } from '../data/products'
import { navigateTo } from '../hooks/useRouter'

const heroSlides = [
  {
    eyebrow: '本月精選',
    title: products[1]?.name || '月映白金蝴蝶蘭',
    description: products[1]?.description || '高雅白金系，適合品牌致贈、升遷祝賀與開幕誌慶。',
    accent: '柔霧白金',
    image: products[1]?.image,
    productId: products[1]?.id,
  },
  {
    eyebrow: '開幕誌慶',
    title: products[3]?.name || '盛放祝賀花籃',
    description: products[3]?.description || '大器明亮的花籃視覺，適合企業開幕、喬遷與演出祝賀。',
    accent: '明亮祝賀',
    image: products[3]?.image,
    productId: products[3]?.id,
  },
  {
    eyebrow: '溫柔致意',
    title: products[9]?.name || '靜心追思花禮',
    description: products[9]?.description || '以白色與淡紫花材構成安靜而莊重的祝福，傳遞真誠思念。',
    accent: '安然留白',
    image: products[9]?.image,
    productId: products[9]?.id,
  },
]

function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrevSlide = () => {
    setActiveIndex((previous) => (previous - 1 + heroSlides.length) % heroSlides.length)
  }

  const handleNextSlide = () => {
    setActiveIndex((previous) => (previous + 1) % heroSlides.length)
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      handleNextSlide()
    }, 3200)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const activeSlide = heroSlides[activeIndex]

  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="section-kicker">Bloom & Grace</p>
        <h1 className="hero-title">把祝福、感謝與思念，交給一份溫柔有質感的花禮</h1>
        <p className="hero-description">
          以蝴蝶蘭、花籃與盆花為主軸，打造適合開幕誌慶、升遷祝賀、節慶送禮與追思致意的品牌花店體驗。
        </p>
        <div className="hero-actions">
          <button type="button" className="primary-button" onClick={() => navigateTo('/shop')}>
            立即選花
          </button>
          <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
            查看會員優惠
          </button>
        </div>
      </div>

      <div className="hero-visual hero-carousel">
        <div className="hero-carousel-window">
          <div
            className="hero-carousel-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {heroSlides.map((slide) => (
              <article key={slide.title} className="hero-slide">
                <button
                  type="button"
                  className="hero-slide-panel"
                  onClick={() => slide.productId && navigateTo(`/products/${slide.productId}`)}
                >
                  <div className="hero-slide-image-wrap">
                    <img src={slide.image} alt={slide.title} className="hero-slide-image" />
                  </div>
                  <div className="hero-slide-content">
                    <span>{slide.eyebrow}</span>
                    <strong>{slide.title}</strong>
                    <p>{slide.description}</p>
                    <small>{slide.accent}</small>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-carousel-arrow-group">
          <button type="button" className="hero-arrow-button" onClick={handlePrevSlide} aria-label="上一張">
            ←
          </button>
          <button type="button" className="hero-arrow-button" onClick={handleNextSlide} aria-label="下一張">
            →
          </button>
        </div>

        <div className="hero-carousel-controls">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={index === activeIndex ? 'hero-dot active' : 'hero-dot'}
              onClick={() => setActiveIndex(index)}
              aria-label={`切換到 ${slide.title}`}
            />
          ))}
        </div>

        <div className="hero-highlight-card">
          <span>{activeSlide.eyebrow}</span>
          <strong>{activeSlide.title}</strong>
          <p>{activeSlide.description}</p>
          <button
            type="button"
            className="text-button hero-inline-link"
            onClick={() => activeSlide.productId && navigateTo(`/products/${activeSlide.productId}`)}
          >
            查看這款花禮
          </button>
        </div>

        <div className="hero-ambient-shape shape-one"></div>
        <div className="hero-ambient-shape shape-two"></div>
      </div>
    </section>
  )
}

export default HeroSection
