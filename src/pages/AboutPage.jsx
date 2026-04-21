function AboutPage() {
  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Brand Story</p>
            <h1 className="page-title">企業理念</h1>
            <p className="page-description">
              Bloom & Grace 相信，一份花禮不只是送出美感，而是在重要時刻替人說出祝福、感謝與思念。
            </p>
          </div>
        </div>

        <section className="about-hero-panel">
          <div className="about-hero-copy">
            <p className="section-kicker">Our Belief</p>
            <h2>讓花禮成為情感的語言，而不只是商品</h2>
            <p>
              我們希望每一份作品都能對應真實情境：開幕的喜悅、升遷的祝賀、節日的心意，以及追思時刻的溫柔陪伴。
            </p>
          </div>
          <div className="about-quote-card">
            <span>Bloom & Grace</span>
            <strong>用花替人說出那些珍貴卻不易親口說出的話。</strong>
          </div>
        </section>

        <div className="about-grid">
          <article className="about-card">
            <h2>以花傳遞心意</h2>
            <p>
              從開幕誌慶、升遷祝賀，到節慶送禮與追思花禮，我們希望每一份作品都能精準回應送禮者的情感。
            </p>
          </article>

          <article className="about-card">
            <h2>溫柔且有質感</h2>
            <p>
              品牌風格以乾淨留白、柔和色彩與細緻花材配置為核心，讓花禮在每一個場景都能被好好看見。
            </p>
          </article>

          <article className="about-card">
            <h2>為未來電商體驗鋪路</h2>
            <p>
              這個網站從商品瀏覽、會員價格到購物與結帳流程，都保留後續擴充成完整花店電商的架構彈性。
            </p>
          </article>
        </div>

        <section className="about-values-section">
          <article className="about-value-item">
            <span>01</span>
            <div>
              <h3>真誠選花</h3>
              <p>不追求浮誇堆疊，而是回到送禮本質，讓花材、色調與包裝更貼近場合需要。</p>
            </div>
          </article>
          <article className="about-value-item">
            <span>02</span>
            <div>
              <h3>細節體驗</h3>
              <p>從會員價格、商品資訊到購物流程，都希望讓使用者感受到清楚、安心與被照顧的感覺。</p>
            </div>
          </article>
          <article className="about-value-item">
            <span>03</span>
            <div>
              <h3>溫柔品牌感</h3>
              <p>我們相信品牌不一定要很喧鬧，留白、秩序與柔和層次，反而能讓花禮本身成為主角。</p>
            </div>
          </article>
        </section>
      </section>
    </div>
  )
}

export default AboutPage
