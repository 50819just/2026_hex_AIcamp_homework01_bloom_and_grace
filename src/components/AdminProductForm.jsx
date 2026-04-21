const defaultFormValue = {
  name: '',
  category: 'orchid',
  originalPrice: 0,
  memberPrice: 0,
  description: '',
  tag: '',
  image: '',
}

function AdminProductForm({
  formValue,
  onChange,
  onSubmit,
  onReset,
  isEditing,
}) {
  const value = formValue || defaultFormValue

  return (
    <section className="admin-form-card">
      <div className="section-heading">
        <div>
          <p className="section-kicker">商品管理</p>
          <h2>{isEditing ? '編輯商品' : '上架新商品'}</h2>
        </div>
      </div>

      <form className="admin-form-grid" onSubmit={onSubmit}>
        <label>
          商品名稱
          <input
            name="name"
            value={value.name}
            onChange={onChange}
            placeholder="例如：香檳金雙梗蝴蝶蘭"
            required
          />
        </label>

        <label>
          商品分類
          <select name="category" value={value.category} onChange={onChange}>
            <option value="orchid">蝴蝶蘭</option>
            <option value="basket">花籃</option>
            <option value="potted">盆花</option>
            <option value="sympathy">追思花禮</option>
          </select>
        </label>

        <label>
          原價
          <input
            name="originalPrice"
            type="number"
            min="1"
            value={value.originalPrice}
            onChange={onChange}
            required
          />
        </label>

        <label>
          會員價
          <input
            name="memberPrice"
            type="number"
            min="1"
            value={value.memberPrice}
            onChange={onChange}
            required
          />
        </label>

        <label className="full-span">
          商品描述
          <textarea
            name="description"
            rows="4"
            value={value.description}
            onChange={onChange}
            placeholder="描述花禮適合的情境、配色與風格"
            required
          />
        </label>

        <label>
          標籤
          <input
            name="tag"
            value={value.tag}
            onChange={onChange}
            placeholder="例如：新品上架、開幕首選"
          />
        </label>

        <label>
          商品圖片 URL（可留空）
          <input
            name="image"
            value={value.image}
            onChange={onChange}
            placeholder="留空會自動使用 placeholder"
          />
        </label>

        <div className="admin-form-actions full-span">
          <button type="button" className="secondary-button" onClick={onReset}>
            清空表單
          </button>
          <button type="submit" className="primary-button">
            {isEditing ? '更新商品' : '立即上架'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AdminProductForm
