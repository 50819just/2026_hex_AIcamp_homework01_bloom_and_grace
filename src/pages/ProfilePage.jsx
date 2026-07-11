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

  const profileStats = [
    { label: '購物袋商品數', value: cartCount },
    { label: '常用收件資料', value: memberProfile?.stats?.savedRecipients || addresses.length },
    { label: '年度訂單筆數', value: memberProfile?.stats?.yearlyOrders || orders.length },
    { label: '會員優惠', value: memberProfile?.stats?.memberDiscountLabel || '95 折示意' },
  ]

  const identityRows = [
    ['會員姓名', memberProfile?.name || '會員姓名'],
    ['電子郵件', memberProfile?.email || '已綁定電子郵件'],
    ['手機', memberProfile?.phone || '0912-345-678'],
    ['生日', formatDate(memberProfile?.birthday)],
    ['會員等級', memberProfile?.level || '會員等級'],
  ]

  return (
    <div className="page-stack profile-page">
      <section className="page-container profile-shell">
        <div className="profile-header-block">
          <p className="section-kicker">會員中心</p>
          <h1 className="page-title">{isMember ? '你的會員資料與訂單整理' : '登入後開啟你的會員頁'}</h1>
          <p className="page-description">
            這裡會把會員價、收件資料與訂單查找整理在一起，讓下一次送花、下單與回頭查詢都更順手。
          </p>
        </div>

        {!isMember ? (
          <section className="profile-hero profile-hero-guest">
            <div className="profile-hero-copy">
              <div className="profile-brand-row">
                <FloralLogo />
                <div>
                  <p className="section-kicker">會員禮遇</p>
                  <h2>把祝福、感謝與思念，交給一份溫柔有質感的花禮</h2>
                </div>
              </div>
              <p className="profile-hero-lead">
                登入後即可啟用會員價、快速帶入收件資料，也能更快找回過去的訂單與送禮資訊。
              </p>
              <div className="profile-action-row">
                <button type="button" className="primary-button" onClick={onOpenMemberModal}>
                  會員登入 / 註冊
                </button>
                <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
                  瀏覽花禮選品
                </button>
              </div>
            </div>

            <figure className="profile-hero-visual">
              <img src={memberVisuals.welcome} alt="會員花禮體驗" className="profile-hero-image" loading="eager" />
              <figcaption className="profile-hero-caption">
                <span className="section-kicker">會員視角</span>
                <strong>把常用資料整理好，下一次送花就會輕鬆很多。</strong>
                <p>登入後可以更快帶入收件資料，也能直接保留會員價。</p>
              </figcaption>
            </figure>
          </section>
        ) : (
          <>
            <section className="profile-hero">
              <div className="profile-hero-copy">
                <p className="section-kicker">會員中心</p>
                <div className="profile-brand-row">
                  <FloralLogo />
                  <div className="profile-brand-copy-wrap">
                    <span className="profile-level-pill">{memberProfile?.level || '花選會員'}</span>
                    <h2>{memberProfile?.name || '會員姓名'}</h2>
                    <p className="profile-brand-copy">電子郵件已綁定 ・ 會員價啟用中 ・ 送禮體驗已準備好</p>
                  </div>
                </div>
              </div>

              <figure className="profile-hero-visual">
                <img src={memberVisuals.profile} alt="會員中心視覺" className="profile-hero-image" loading="eager" />
                <figcaption className="profile-hero-caption">
                  <span className="section-kicker">會員視角</span>
                  <strong>會員價、收件資料與訂單查找都已放在同一個入口。</strong>
                  <p>回到這裡，就可以很快確認資料、重新下單，或直接續購花禮。</p>
                </figcaption>
              </figure>
            </section>

            <section className="profile-facts">
              <article className="profile-fact-card">
                <span>會員等級</span>
                <strong>{memberProfile?.level || '花選會員'}</strong>
              </article>
              <article className="profile-fact-card">
                <span>加入日期</span>
                <strong>{formatDate(memberProfile?.joinedAt)}</strong>
              </article>
              <article className="profile-fact-card">
                <span>偏好品項</span>
                <strong>{favoriteCategories.join('、') || '蝴蝶蘭、花籃、追思花禮'}</strong>
              </article>
            </section>

            <section className="profile-metrics">
              {profileStats.map((stat) => (
                <article key={stat.label} className="profile-metric">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </article>
              ))}
            </section>

            <section className="profile-grid">
              <article className="profile-block profile-block-identity">
                <div className="profile-block-head">
                  <div>
                    <p className="section-kicker">帳戶總覽</p>
                    <h2>{memberProfile?.name || '會員姓名'}</h2>
                  </div>
                </div>
                <p className="profile-block-lead">
                  這份資料目前支援前端示意與本地測試 API，後續要接會員後端也可以直接沿用同一個骨架。
                </p>

                <dl className="profile-dl">
                  {identityRows.map(([term, detail]) => (
                    <div key={term}>
                      <dt>{term}</dt>
                      <dd>{detail}</dd>
                    </div>
                  ))}
                </dl>
              </article>

              <article className="profile-block profile-block-address">
                <div className="profile-block-head">
                  <div>
                    <p className="section-kicker">常用收件資料</p>
                    <h2>下單時可快速帶入</h2>
                  </div>
                </div>
                <img
                  src={memberVisuals.addressBook}
                  alt="常用收件資料示意"
                  className="profile-inline-image"
                  loading="lazy"
                />
                <div className="profile-list">
                  {addresses.length > 0 ? (
                    addresses.map((address) => (
                      <article key={address.id} className="profile-list-row">
                        <div>
                          <strong>{address.label}</strong>
                          <p>{address.recipient}</p>
                        </div>
                        <div>
                          <span>{address.phone}</span>
                          <span>{address.address}</span>
                          <em>{address.note}</em>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="profile-empty-note">目前還沒有常用收件資料，之後可在這裡直接整理成快速帶入格式。</p>
                  )}
                </div>
              </article>

              <article className="profile-block profile-block-orders">
                <div className="profile-block-head">
                  <div>
                    <p className="section-kicker">近期訂單紀錄</p>
                    <h2>可直接延伸成真實會員訂單 API</h2>
                  </div>
                </div>

                <div className="profile-list profile-order-list">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <article key={order.id} className="profile-list-row">
                        <div>
                          <strong>{order.id}</strong>
                          <p>{formatDate(order.date)}</p>
                        </div>
                        <div>
                          <span>{order.item}</span>
                          <span>{formatCurrency(order.amount)}</span>
                          <em className="profile-status-pill">{order.status}</em>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="profile-empty-note">目前尚無訂單紀錄，之後可直接串接真實會員訂單資料。</p>
                  )}
                </div>
              </article>

              <article className="profile-block profile-block-actions">
                <div className="profile-block-head">
                  <div>
                    <p className="section-kicker">會員捷徑</p>
                    <h2>把常用操作放在一起會更順手</h2>
                  </div>
                </div>
                <div className="profile-action-row">
                  <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
                    繼續挑選花禮
                  </button>
                  <button type="button" className="primary-button" onClick={() => navigateTo('/cart')}>
                    打開購物袋
                  </button>
                </div>
              </article>
            </section>
          </>
        )}
      </section>
    </div>
  )
}

export default ProfilePage
