function CategoryTabs({ categories, currentCategory, onChange }) {
  return (
    <div className="category-tabs-wrap">
      <div className="category-tabs" role="tablist" aria-label="商品分類">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            className={currentCategory === category.key ? 'tab-button active' : 'tab-button'}
            onClick={() => onChange(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryTabs
