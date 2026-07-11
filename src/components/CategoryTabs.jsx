function CategoryTabs({ categories, currentCategory, onChange }) {
  const getTabTheme = (categoryKey) => {
    if (categoryKey === 'orchid') {
      return 'tab-theme-rose'
    }

    if (categoryKey === 'basket') {
      return 'tab-theme-gold'
    }

    if (categoryKey === 'potted') {
      return 'tab-theme-green'
    }

    if (categoryKey === 'sympathy') {
      return 'tab-theme-lavender'
    }

    return 'tab-theme-all'
  }

  return (
    <div className="category-tabs-wrap category-tabs-wrap-editorial">
      <div className="category-tabs-label">花禮分類篩選</div>
      <div className="category-tabs" role="tablist" aria-label="商品分類">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            className={`${currentCategory === category.key ? 'tab-button active' : 'tab-button'} ${getTabTheme(category.key)}`}
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
