import { useEffect, useMemo, useState } from 'react'
import AdminProductForm from '../components/AdminProductForm'
import EmptyState from '../components/EmptyState'
import { fetchAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct } from '../lib/api'
import { formatPrice } from '../lib/formatters'
import { createPlaceholderImage } from '../lib/imagePlaceholders'

const defaultFormValue = {
  id: '',
  name: '',
  category: 'orchid',
  originalPrice: 3600,
  memberPrice: 3200,
  description: '',
  tag: '',
  image: '',
}

function AdminPage({ onProductsUpdate, onNotify }) {
  const [adminProducts, setAdminProducts] = useState([])
  const [formValue, setFormValue] = useState(defaultFormValue)
  const [isLoading, setIsLoading] = useState(true)

  const isEditing = Boolean(formValue.id)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await fetchAdminProducts()
        setAdminProducts(result)
      } catch (error) {
        onNotify(error.message || '後台商品載入失敗')
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [onNotify])

  const sortedProducts = useMemo(
    () => [...adminProducts].sort((current, next) => current.name.localeCompare(next.name, 'zh-Hant')),
    [adminProducts],
  )

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValue((previous) => ({
      ...previous,
      [name]: ['originalPrice', 'memberPrice'].includes(name) ? Number(value) : value,
    }))
  }

  const resetForm = () => {
    setFormValue(defaultFormValue)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (isEditing) {
        const updatedProduct = await updateAdminProduct(formValue.id, formValue)
        const nextProducts = adminProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        )
        setAdminProducts(nextProducts)
        onProductsUpdate(nextProducts)
        onNotify(`商品「${updatedProduct.name}」已更新`)
      } else {
        const createdProduct = await createAdminProduct(formValue)
        const nextProducts = [createdProduct, ...adminProducts]
        setAdminProducts(nextProducts)
        onProductsUpdate(nextProducts)
        onNotify(`商品「${createdProduct.name}」已上架成功`)
      }

      resetForm()
    } catch (error) {
      onNotify(error.message || '商品儲存失敗')
    }
  }

  const handleEdit = (product) => {
    setFormValue({
      id: product.id,
      name: product.name,
      category: product.category,
      originalPrice: product.originalPrice,
      memberPrice: product.memberPrice,
      description: product.description,
      tag: product.tag,
      image: product.image.startsWith('data:image') ? '' : product.image,
    })
    onNotify(`正在編輯「${product.name}」`)
  }

  const handleDelete = async (product) => {
    try {
      await deleteAdminProduct(product.id)
      const nextProducts = adminProducts.filter((item) => item.id !== product.id)
      setAdminProducts(nextProducts)
      onProductsUpdate(nextProducts)
      onNotify(`商品「${product.name}」已刪除`)
      if (formValue.id === product.id) {
        resetForm()
      }
    } catch (error) {
      onNotify(error.message || '刪除商品失敗')
    }
  }

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Admin</p>
            <h1 className="page-title">花店上架後台</h1>
            <p className="page-description">
              這裡可以直接新增、編輯與刪除花店商品，資料會寫入本地 server 的 JSON 檔案。
            </p>
          </div>
        </div>

        <AdminProductForm
          formValue={formValue}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onReset={resetForm}
          isEditing={isEditing}
        />

        <section className="admin-table-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">已上架商品</p>
              <h2>目前共 {sortedProducts.length} 項</h2>
            </div>
          </div>

          {isLoading ? (
            <p>商品資料載入中...</p>
          ) : sortedProducts.length === 0 ? (
            <EmptyState title="目前還沒有商品" description="先用上方表單上架第一項花禮吧。" />
          ) : (
            <div className="admin-product-list">
              {sortedProducts.map((product) => (
                <article key={product.id} className="admin-product-item">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="admin-product-image"
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = createPlaceholderImage(
                        product.name,
                        product.category === 'basket'
                          ? 'gold'
                          : product.category === 'potted'
                            ? 'green'
                            : product.category === 'sympathy'
                              ? 'lavender'
                              : 'rose',
                      )
                    }}
                  />
                  <div className="admin-product-content">
                    <div>
                      <p className="cart-item-category">{product.category}</p>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </div>
                    <div className="admin-product-meta">
                      <span>原價 {formatPrice(product.originalPrice)}</span>
                      <span>會員價 {formatPrice(product.memberPrice)}</span>
                      <span>標籤：{product.tag}</span>
                    </div>
                  </div>
                  <div className="admin-product-actions">
                    <button type="button" className="secondary-button" onClick={() => handleEdit(product)}>
                      編輯
                    </button>
                    <button type="button" className="text-button danger" onClick={() => handleDelete(product)}>
                      刪除
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  )
}

export default AdminPage
