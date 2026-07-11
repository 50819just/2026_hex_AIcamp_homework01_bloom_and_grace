function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar search-bar-editorial">
      <span>搜尋花禮</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="搜尋花禮名稱、分類或標籤"
      />
    </label>
  )
}

export default SearchBar
