import { navigateTo } from '../hooks/useRouter'

const originParagraphs = [
  'Bloom & Grace 的起點很簡單：希望花禮不只好看，也能真的說中送禮者的心意。',
  '於是，我們從花材選擇、包裝比例到卡片文字都慢慢收斂，讓每一份作品更像一份被好好完成的禮物。',
]

const philosophyCards = [
  {
    title: '以感受為設計起點',
    body: '從色調、姿態與用途出發，讓每個作品都保有情感與秩序。',
    src: '/images/products/potted/glass-potted-01.jpg',
    alt: '以感受為設計起點的花藝示意',
  },
  {
    title: '層次比堆疊更重要',
    body: '透過比例與留白，讓祝福能被看見，也不會過度喧鬧。',
    src: '/images/products/baskets/pink-rose-arrangement-01.jpg',
    alt: '花材層次與比例示意',
  },
]

const processSteps = [
  '挑選當季花材，先看色調與狀態是否適合當下的節奏。',
  '依照送禮情境安排層次，讓主花、配花與葉材彼此協調。',
  '整理包裝與留白，避免裝飾過度，讓視覺保持安靜。',
  '把祝福卡片與附註一起放入，讓文字與花禮互相呼應。',
  '配送前再次確認保護與運送細節，讓花禮穩穩抵達。',
]

const brandValues = [
  {
    title: '細緻思量',
    body: '每一份花禮都先從情境開始思考，而不是先從裝飾開始。',
  },
  {
    title: '編排工藝',
    body: '色彩、層次、包裝與留白彼此協調，讓作品保有成熟的安定感。',
  },
  {
    title: '溫柔節奏',
    body: '我們希望花不是喧鬧的存在，而是剛剛好的陪伴。',
  },
  {
    title: '情感連結',
    body: '祝福、感謝、想念與祝賀，都可以安靜地被花好好承接。',
  },
]

const galleryImages = [
  {
    src: '/images/products/orchids/white-orchid-03.jpg',
    alt: '白蝴蝶蘭的細節展示',
  },
  {
    src: '/images/products/baskets/pink-rose-bouquet-01.jpg',
    alt: '粉色花束的工作室桌面視角',
  },
  {
    src: '/images/products/potted/green-potted-01.jpg',
    alt: '綠植與玻璃器皿的清爽擺設',
  },
  {
    src: '/images/products/sympathy/sympathy-white-02.jpg',
    alt: '白色弔唁花禮的安靜層次',
  },
]

function AboutPage() {
  return (
    <div className="page-stack story-page">
      <section className="page-container story-hero">
        <div className="story-hero-copy">
          <p className="section-kicker">品牌故事</p>
          <h1 className="story-title">花，為重要時刻而生</h1>
          <p className="story-lead">
            Bloom & Grace 相信，花能承接那些有時不容易說出口的情感。從祝賀、感謝到思念，每一份花禮都被安靜而細緻地安排。
          </p>
          <div className="story-actions">
            <button type="button" className="primary-button" onClick={() => navigateTo('/shop')}>
              前往選購
            </button>
            <button type="button" className="secondary-button" onClick={() => navigateTo('/sign-in')}>
              會員登入 / 註冊
            </button>
          </div>
        </div>

        <div className="story-hero-visual">
          <img src="/images/products/baskets/opening-bouquet-01.jpg" alt="Bloom & Grace 品牌主視覺花禮" loading="eager" />
          <div className="story-hero-quote">
            <span className="section-kicker">我們的故事</span>
            <strong>花不是裝飾，而是一種能被記住的情感語言。</strong>
            <p>我們把留白、秩序與柔和層次整理好，讓每一份送禮都更有分寸，也更有溫度。</p>
          </div>
        </div>
      </section>

      <section className="page-container story-split">
        <div className="story-split-visual">
          <img src="/images/products/orchids/white-orchid-01.jpg" alt="品牌起點的蝴蝶蘭花禮" loading="lazy" />
        </div>
        <div className="story-split-copy">
          <p className="section-kicker">品牌起源</p>
          <h2 className="story-section-title">從一束想被好好送出的花開始</h2>
          {originParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="page-container story-philosophy">
        <div className="story-section-heading">
          <div>
            <p className="section-kicker">花藝哲學</p>
            <h2>設計有感，情緒有位置</h2>
          </div>
          <p className="story-section-lead">
            我們相信花藝不是把花堆滿，而是讓每一種花材都在適合的位置，安靜地發揮它的存在感。
          </p>
        </div>

        <div className="story-philosophy-grid">
          {philosophyCards.map((card) => (
            <article key={card.title} className="story-philosophy-card">
              <img src={card.src} alt={card.alt} loading="lazy" />
              <div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-container story-process">
        <div className="story-section-heading">
          <div>
            <p className="section-kicker">製作流程</p>
            <h2>每一束花都從細節開始</h2>
          </div>
        </div>
        <div className="story-process-grid">
          {processSteps.map((step, index) => (
            <article key={step} className="story-process-card">
              <span>{`0${index + 1}`}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-container story-values">
        <div className="story-section-heading">
          <div>
            <p className="section-kicker">品牌價值</p>
            <h2>四個我們一直放在心上的詞</h2>
          </div>
        </div>

        <div className="story-values-grid">
          {brandValues.map((value) => (
            <article key={value.title} className="story-value-card">
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-container story-gallery">
        <div className="story-section-heading">
          <div>
            <p className="section-kicker">工作室細節</p>
            <h2>把花材、包裝與空氣感都照顧好</h2>
          </div>
        </div>

        <div className="story-gallery-grid">
          {galleryImages.map((image) => (
            <figure key={image.src} className="story-gallery-item">
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="page-container story-quote">
        <blockquote>
          “每一份花禮都希望能承接一種感受、記住一個時刻，並在收到的那一刻留下溫柔的印象。”
        </blockquote>
      </section>

      <section className="page-container story-cta">
        <div className="story-cta-copy">
          <p className="section-kicker">下一步</p>
          <h2>如果你也想為某個重要時刻挑一份花禮，我們已經準備好了。</h2>
        </div>
        <div className="story-actions">
          <button type="button" className="primary-button" onClick={() => navigateTo('/shop')}>
            前往選購
          </button>
          <button type="button" className="secondary-button" onClick={() => navigateTo('/sign-in')}>
            會員登入 / 註冊
          </button>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
