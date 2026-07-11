function AboutPage() {
  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">品牌故事</p>
            <h1 className="page-title">Bloom & Grace 的花藝語言</h1>
            <p className="page-description">
              我們相信，一份花禮不只是送出美感，而是在重要時刻，替人安靜而準確地說出祝福、感謝與思念。
            </p>
          </div>
        </div>

        <section className="about-hero-panel">
          <div className="about-hero-copy">
            <p className="section-kicker">品牌信念</p>
            <h2>用留白、秩序與質感，讓花成為情感被看見的方式</h2>
            <p>
              Bloom & Grace 的視覺語言來自歐式花藝工作室與編輯感生活誌。我們不追求花材堆疊的喧鬧，而是希望每一束花都能在對的場合，被好好理解。
            </p>
          </div>
          <div className="about-quote-card">
            <span>編輯感花藝</span>
            <strong>安靜的高級感、舒服的留白，還有每一束都帶著用心編排的花禮。</strong>
          </div>
        </section>

        <div className="about-grid">
          <article className="about-card">
            <h2>為送禮情境而生</h2>
            <p>從開幕誌慶、升遷祝賀，到節慶送禮與追思花禮，每一份作品都以真實情境為起點，而不是只追求好看。</p>
          </article>

          <article className="about-card">
            <h2>像精品選品一樣呈現</h2>
            <p>我們用更安靜的色彩、更乾淨的排版與更穩定的資訊結構，讓使用者能慢慢挑，也能很快決定。</p>
          </article>

          <article className="about-card">
            <h2>為正式電商鋪路</h2>
            <p>從會員價、購物袋、結帳到付款查詢，這次 UI 重構已經把日後延伸正式會員與訂單系統的骨架先整理好。</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
