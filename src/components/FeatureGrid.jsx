const features = [
  {
    title: '編輯感花禮瀏覽',
    description: '用更清楚的版面節奏整理蝴蝶蘭、花籃與盆花，讓挑選體驗更像精品選品而不是雜亂商品牆。',
  },
  {
    title: '會員優先的結帳流程',
    description: '保留登入會員後才能結帳的驗收需求，同時把登入、購物袋、結帳與完成頁串成一條完整購物路徑。',
  },
  {
    title: '綠界付款結果驗證',
    description: '付款完成回站後，前端會再次透過本地 server 查單，讓示意頁也保有接近正式站的驗證感。',
  },
]

function FeatureGrid() {
  return (
    <section className="feature-grid-section">
      {features.map((feature, index) => (
        <article key={feature.title} className="feature-card">
          <span className="feature-index">0{index + 1}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      ))}
    </section>
  )
}

export default FeatureGrid
