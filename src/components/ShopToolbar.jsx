import CategoryTabs from './CategoryTabs'
import SearchBar from './SearchBar'

function ShopToolbar({ categories, currentCategory, searchText, onCategoryChange, onSearchChange }) {
  return (
    <div className="shop-toolbar shop-toolbar-editorial">
      <CategoryTabs
        categories={categories}
        currentCategory={currentCategory}
        onChange={onCategoryChange}
      />
      <SearchBar value={searchText} onChange={onSearchChange} />
    </div>
  )
}

export default ShopToolbar
