import { navigateTo } from '../hooks/useRouter'

function ProfilePage({ isMember, cartCount, onOpenMemberModal }) {
  if (!isMember) {
    return (
      <div className="page-stack">
        <section className="content-section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Member</p>
              <h1 className="page-title">會員中心</h1>
              <p className="page-description">登入後可以查看會員價、常用資料與目前購物狀態。</p>
            </div>
          </div>

          <div className="profile-guest-card">
            <h2>你目前還不是登入狀態</h2>
            <p>登入後可享會員價、快速結帳體驗，以及後續更完整的會員功能擴充。</p>
            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={onOpenMemberModal}>
                立即登入 / 註冊
              </button>
              <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
                先去選花
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Member Profile</p>
            <h1 className="page-title">會員中心</h1>
            <p className="page-description">這裡先用 mock profile 示意會員資料與購物資訊，方便未來擴充成完整會員系統。</p>
          </div>
        </div>

        <div className="profile-layout">
          <article className="profile-card profile-main-card">
            <div className="profile-avatar">BG</div>
            <div className="profile-main-content">
              <p className="section-kicker">Bloom Member</p>
              <h2>Grace Lin</h2>
              <p>member@bloomandgrace.tw</p>
              <div className="profile-chip-list">
                <span>會員等級｜Bloom Select</span>
                <span>會員價啟用中</span>
                <span>偏好品項｜蝴蝶蘭、花籃</span>
              </div>
            </div>
          </article>

          <article className="profile-card">
            <h3>常用收件資料</h3>
            <ul className="profile-info-list">
              <li>
                <strong>收件人</strong>
                <span>林小姐</span>
              </li>
              <li>
                <strong>聯絡電話</strong>
                <span>0912-345-678</span>
              </li>
              <li>
                <strong>常用地址</strong>
                <span>台北市大安區信義路四段 100 號</span>
              </li>
            </ul>
          </article>

          <article className="profile-card">
            <h3>會員購物概覽</h3>
            <div className="profile-stat-list">
              <div>
                <span>購物車商品數</span>
                <strong>{cartCount}</strong>
              </div>
              <div>
                <span>本月會員優惠</span>
                <strong>95 折示意</strong>
              </div>
              <div>
                <span>推薦情境</span>
                <strong>開幕誌慶</strong>
              </div>
            </div>
          </article>

          <article className="profile-card">
            <h3>最近關注</h3>
            <p>月映白金蝴蝶蘭、盛放祝賀花籃、靜心追思花禮</p>
            <div className="hero-actions">
              <button type="button" className="secondary-button" onClick={() => navigateTo('/shop')}>
                繼續逛逛
              </button>
              <button type="button" className="primary-button" onClick={() => navigateTo('/cart')}>
                查看購物車
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
