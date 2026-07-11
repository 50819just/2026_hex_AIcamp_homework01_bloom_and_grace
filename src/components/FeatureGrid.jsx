const features = [
  {
    title: '細膩設計',
    description:
      '以留白、對比與層次整理整體畫面，讓選購過程安靜、清楚又不擁擠。',
  },
  {
    title: '精選花材',
    description:
      '每一份花禮都以編輯感呈現，讓花材、容器與包裝彼此協調。',
  },
  {
    title: '安心配送',
    description:
      '保留實際可操作的購物流程，讓美感和功能可以同時成立。',
  },
]

function FeatureGrid() {
  return (
    <section className="page-container feature-strip">
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
