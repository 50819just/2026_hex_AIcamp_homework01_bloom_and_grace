const features = [
  {
    title: '快速選購',
    description: '從商品列表、詳情到購物車，流程簡單清楚，方便老師直接驗收。',
  },
  {
    title: '會員登入後結帳',
    description: '保留作業要求的登入門檻，未登入時可先加入購物車，但不能直接結帳。',
  },
  {
    title: '綠界付款驗證',
    description: '付款回站後，前端會再透過本地 server 查詢綠界結果，不只停在畫面示意。',
  },
]

function FeatureGrid() {
  return (
    <section className="feature-grid-section">
      {features.map((feature) => (
        <article key={feature.title} className="feature-card">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      ))}
    </section>
  )
}

export default FeatureGrid
