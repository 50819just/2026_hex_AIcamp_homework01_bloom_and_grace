import FloralLogo from '../components/FloralLogo'
import { memberVisuals } from '../data/memberAssets'
import { navigateTo } from '../hooks/useRouter'

function formatDate(value) {
  if (!value) {
    return '—'
  }

  return value.replaceAll('-', ' / ')
}

function formatCurrency(value) {
  return `NT$ ${Number(value || 0).toLocaleString('zh-TW')}`
}

function ProfilePage({ isMember, memberProfile, cartCount, onOpenMemberModal }) {
  const addresses = memberProfile?.addresses || []
  const orders = memberProfile?.orders || []
  const favoriteCategories = memberProfile?.favoriteCategories || []
  const profileStats = {
    cartCount,
    savedRecipients: memberProfile?.stats?.savedRecipients || addresses.length,
    yearlyOrders: memberProfile?.stats?.yearlyOrders || orders.length,
    memberDiscountLabel: memberProfile?.stats?.memberDiscountLabel || '95 折示意',
  }

  if (!isMember) {
    return (
      <div className="page-stack">
        <section className="content-section profile-page-shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">會員中心</p>
              <h1 className="page-title">登入後開啟你的 Bloom & Grace 會員頁</h1>
              <p className="page-description">會員中心會整理常用收件資料、訂單紀錄與會員價格體驗，讓下次送禮更順手。</p>
            </div>
          </div>

          <div className="profile-brand-panel profile-guest-panel">
            <div className="profile-brand-grid">
              <div className="profile-brand-badge">
                <span className="profile-brand-mark">
                  <FloralLogo />
                </span>
                <div>
                  <p className="section-kicker">Bloom & Grace 會員禮遇</p>
                  <h2>把祝福、感謝與思念，交給一份溫柔有質感的花禮</h2>
                  <p className="profile-brand-copy">登入後即可啟用會員價、快速帶入收件資料，未來也能延伸成完整會員與訂單系統。</p>
                </div>
              </div>
              <div className="profile-visual-card">
                <img src={memberVisuals.welcome} alt="會員花禮體驗" className="profile-visual-image" />
              </div>
            </div>

            <div className="profile-brand-actions">
              <button type="button" className="primary-button" onClick={onOpenMemberModal}>
                會員登入 / 註冊
              </button>
              <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
                瀏覽花禮選品
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page-stack">
      <section className="content-section profile-page-shell">
        <div className="section-heading">
          <div>
            <p className="section-kicker">會員資料總覽</p>
            <h1 className="page-title">你的會員資料、收件資訊與訂單紀錄</h1>
            <p className="page-description">這裡已經整理成比較完整的會員頁骨架，之後要接真實登入、訂單與地址 API 也會更順。</p>
          </div>
        </div>

        <div className="profile-brand-panel profile-brand-panel-editorial">
          <div className="profile-brand-grid">
            <div className="profile-brand-badge">
              <span className="profile-brand-mark">
                <FloralLogo />
              </span>
              <div>
                <p className="section-kicker">Bloom Select</p>
                <h2>{memberProfile?.name || 'Grace Lin'}</h2>
                <p className="profile-brand-copy">{memberProfile?.email || 'member@bloomandgrace.tw'} ・ 會員價啟用中 ・ 送禮體驗已準備好</p>
              </div>
            </div>
            <div className="profile-visual-card">
              <img src={memberVisuals.profile} alt="Bloom 會員中心" className="profile-visual-image" />
            </div>
          </div>

          <div className="profile-chip-list">
            <span>會員等級｜{memberProfile?.level || 'Bloom Select'}</span>
            <span>加入日期｜{formatDate(memberProfile?.joinedAt)}</span>
            <span>偏好品項｜{favoriteCategories.join('、') || '蝴蝶蘭、花籃'}</span>
          </div>
        </div>

        <div className="profile-stats-grid profile-stats-grid-editorial">
          <article className="profile-stat-card">
            <span>購物袋商品數</span>
            <strong>{profileStats.cartCount}</strong>
          </article>
          <article className="profile-stat-card">
            <span>常用收件資料</span>
            <strong>{profileStats.savedRecipients}</strong>
          </article>
          <article className="profile-stat-card">
            <span>年度訂單筆數</span>
            <strong>{profileStats.yearlyOrders}</strong>
          </article>
          <article className="profile-stat-card">
            <span>會員優惠</span>
            <strong>{profileStats.memberDiscountLabel}</strong>
          </article>
        </div>

        <div className="profile-layout profile-layout-expanded">
          <article className="profile-card profile-main-card profile-main-card-expanded">
            <div className="profile-avatar">BG</div>
            <div className="profile-main-content">
              <p className="section-kicker">帳戶總覽</p>
              <h2>{memberProfile?.name || 'Grace Lin'}</h2>
              <p>這份資料目前支援前端示意與本地 mock API，後續可以直接接會員後端。</p>
            </div>
          </article>

          <article className="profile-card profile-table-card">
            <div className="profile-card-heading">
              <h3>會員基本資料</h3>
              <span>後續可直接延伸成可編輯會員資料</span>
            </div>
            <div className="profile-table-wrap">
              <table className="profile-table">
                <tbody>
                  <tr>
                    <th>會員姓名</th>
                    <td>{memberProfile?.name || 'Grace Lin'}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{memberProfile?.email || 'member@bloomandgrace.tw'}</td>
                  </tr>
                  <tr>
                    <th>手機</th>
                    <td>{memberProfile?.phone || '0912-345-678'}</td>
                  </tr>
                  <tr>
                    <th>生日</th>
                    <td>{formatDate(memberProfile?.birthday)}</td>
                  </tr>
                  <tr>
                    <th>會員等級</th>
                    <td>{memberProfile?.level || 'Bloom Select'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className="profile-card profile-table-card">
            <div className="profile-card-heading">
              <h3>常用收件資料</h3>
              <span>下單時可快速帶入</span>
            </div>
            <div className="profile-inline-visual">
              <img src={memberVisuals.addressBook} alt="常用收件資料示意" className="profile-inline-visual-image" />
            </div>
            <div className="profile-table-wrap">
              <table className="profile-table profile-table-list">
                <thead>
                  <tr>
                    <th>標籤</th>
                    <th>收件人</th>
                    <th>聯絡電話</th>
                    <th>地址</th>
                    <th>備註</th>
                  </tr>
                </thead>
                <tbody>
                  {addresses.map((address) => (
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

          <article className="profile-card profile-table-card profile-table-card-full">
            <div className="profile-card-heading">
              <h3>近期訂單紀錄</h3>
              <span>可直接延伸成真實會員訂單 API</span>
            </div>
            <div className="profile-table-wrap">
              <table className="profile-table profile-table-list">
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
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{formatDate(order.date)}</td>
                      <td>{order.item}</td>
                      <td>{formatCurrency(order.amount)}</td>
                      <td>
                        <span className="profile-status-pill">{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="profile-card profile-table-card profile-table-card-full">
            <div className="profile-card-heading">
              <h3>會員捷徑</h3>
              <span>把常用操作放在一起會更順手</span>
            </div>
            <div className="hero-actions">
              <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
                繼續挑選花禮
              </button>
              <button type="button" className="primary-button" onClick={() => navigateTo('/cart')}>
                打開購物袋
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
