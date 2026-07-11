import { useEffect, useMemo, useState } from 'react'
import AdminProductForm from '../components/AdminProductForm'
import EmptyState from '../components/EmptyState'
import {
  fetchAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  fetchAdminMembers,
} from '../lib/api'
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
  const [activeTab, setActiveTab] = useState('products')
  const [adminProducts, setAdminProducts] = useState([])
  const [memberList, setMemberList] = useState([])
  const [memberSearch, setMemberSearch] = useState('')
  const [selectedMemberId, setSelectedMemberId] = useState('')
  const [formValue, setFormValue] = useState(defaultFormValue)
  const [isLoading, setIsLoading] = useState(true)
  const [isMemberLoading, setIsMemberLoading] = useState(true)

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

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const result = await fetchAdminMembers(memberSearch)
        setMemberList(result)
        if (!selectedMemberId && result.length > 0) {
          setSelectedMemberId(result[0].id)
        }
        if (selectedMemberId && !result.find((member) => member.id === selectedMemberId)) {
          setSelectedMemberId(result[0]?.id || '')
        }
      } catch (error) {
        onNotify(error.message || '會員資料載入失敗')
      } finally {
        setIsMemberLoading(false)
      }
    }

    loadMembers()
  }, [memberSearch, onNotify, selectedMemberId])

  const sortedProducts = useMemo(
    () => [...adminProducts].sort((current, next) => current.name.localeCompare(next.name, 'zh-Hant')),
    [adminProducts],
  )

  const selectedMember = useMemo(
    () => memberList.find((member) => member.id === selectedMemberId) || memberList[0] || null,
    [memberList, selectedMemberId],
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
            <p className="section-kicker">後台管理</p>
            <h1 className="page-title">花店後台管理</h1>
            <p className="page-description">
              這裡現在除了商品上架，也能查看會員資料、常用地址與近期訂單，整體更像簡單資料庫後台。
            </p>
          </div>
        </div>

        <div className="admin-switcher">
          <button
            type="button"
            className={activeTab === 'products' ? 'admin-switcher-tab active' : 'admin-switcher-tab'}
            onClick={() => setActiveTab('products')}
          >
            商品管理
          </button>
          <button
            type="button"
            className={activeTab === 'members' ? 'admin-switcher-tab active' : 'admin-switcher-tab'}
            onClick={() => setActiveTab('members')}
          >
            會員資料
          </button>
        </div>

        {activeTab === 'products' ? (
          <>
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
          </>
        ) : (
          <section className="admin-table-card">
            <div className="section-heading">
              <div>
                <p className="section-kicker">會員資料庫</p>
                <h2>會員名單與近期狀態</h2>
              </div>
            </div>

            <div className="admin-member-toolbar">
              <label className="search-bar admin-member-search">
                搜尋會員
                <input
                  value={memberSearch}
                  onChange={(event) => setMemberSearch(event.target.value)}
                  placeholder="輸入姓名、電子郵件、電話或等級"
                />
              </label>
              <div className="admin-member-summary-cards">
                <article>
                  <span>會員總數</span>
                  <strong>{memberList.length}</strong>
                </article>
                <article>
                  <span>高階會員</span>
                  <strong>{memberList.filter((member) => member.level.includes('Select')).length}</strong>
                </article>
              </div>
            </div>

            {isMemberLoading ? (
              <p>會員資料載入中...</p>
            ) : memberList.length === 0 ? (
              <EmptyState title="找不到會員資料" description="可以換個關鍵字再試試看喔。" />
            ) : (
              <div className="admin-member-layout">
                <aside className="admin-member-sidebar">
                  {memberList.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      className={selectedMember?.id === member.id ? 'admin-member-card active' : 'admin-member-card'}
                      onClick={() => setSelectedMemberId(member.id)}
                    >
                      <strong>{member.name}</strong>
                      <span>電子郵件已綁定</span>
                      <em>{member.level}</em>
                    </button>
                  ))}
                </aside>

                {selectedMember ? (
                  <div className="admin-member-detail">
                    <div className="admin-member-detail-header">
                      <div>
                        <p className="section-kicker">會員資料</p>
                        <h3>{selectedMember.name}</h3>
                        <p>電子郵件已綁定 ・ {selectedMember.phone}</p>
                      </div>
                      <div className="admin-member-badges">
                        <span>{selectedMember.level}</span>
                        <span>加入：{selectedMember.joinedAt}</span>
                      </div>
                    </div>

                    <div className="admin-member-grid">
                      <article className="admin-member-panel">
                        <h4>基本資料</h4>
                        <dl className="admin-member-info-list">
                          <div><dt>會員 ID</dt><dd>{selectedMember.id}</dd></div>
                          <div><dt>生日</dt><dd>{selectedMember.birthday}</dd></div>
                          <div><dt>偏好品項</dt><dd>{selectedMember.favoriteCategories.join('、')}</dd></div>
                          <div><dt>優惠狀態</dt><dd>{selectedMember.stats.memberDiscountLabel}</dd></div>
                        </dl>
                      </article>

                      <article className="admin-member-panel">
                        <h4>會員統計</h4>
                        <div className="admin-member-stats-grid">
                          <div><span>購物車</span><strong>{selectedMember.stats.cartCount}</strong></div>
                          <div><span>地址簿</span><strong>{selectedMember.stats.savedRecipients}</strong></div>
                          <div><span>年度訂單</span><strong>{selectedMember.stats.yearlyOrders}</strong></div>
                        </div>
                      </article>

                      <article className="admin-member-panel admin-member-panel-full">
                        <h4>常用收件資料</h4>
                        <div className="admin-member-table-wrap">
                          <table className="admin-member-table">
                            <thead>
                              <tr>
                                <th>標籤</th>
                                <th>收件人</th>
                                <th>電話</th>
                                <th>地址</th>
                                <th>備註</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedMember.addresses.map((address) => (
                                <tr key={address.id}>
                                  <td>{address.label}</td>
                                  <td>{address.recipient}</td>
                                  <td>{address.phone}</td>
                                  <td>{address.address}</td>
                                  <td>{address.note}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </article>

                      <article className="admin-member-panel admin-member-panel-full">
                        <h4>近期訂單</h4>
                        <div className="admin-member-table-wrap">
                          <table className="admin-member-table">
                            <thead>
                              <tr>
                                <th>訂單編號</th>
                                <th>日期</th>
                                <th>商品</th>
                                <th>金額</th>
                                <th>狀態</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedMember.orders.map((order) => (
                                <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>{order.date}</td>
                                  <td>{order.item}</td>
                                  <td>{formatPrice(order.amount)}</td>
                                  <td><span className="admin-order-status">{order.status}</span></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </article>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </section>
        )}
      </section>
    </div>
  )
}

export default AdminPage
