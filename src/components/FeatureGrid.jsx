const features = [
  {
    title: '送禮情境挑選',
    description: '依據開幕誌慶、升遷祝賀、節慶送禮與追思花禮快速瀏覽適合品項。',
  },
  {
    title: '會員價格清楚呈現',
    description: '原價與會員價同步顯示，登入後可立即感受會員優惠差異。',
  },
  {
    title: '可持續擴充的前端架構',
    description: '從商品瀏覽、購物車到會員視覺流程，保留後續串接完整電商功能的空間。',
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
