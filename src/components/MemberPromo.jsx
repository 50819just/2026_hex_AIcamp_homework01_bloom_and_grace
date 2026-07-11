function MemberPromo({ isMember, onOpenMemberModal }) {
  return (
    <section className="member-promo">
      <div>
        <p className="section-kicker">會員購買旅程</p>
        <h2>登入後就能接續購物袋、結帳與付款確認，不用重新整理一遍心意</h2>
        <p>
          這次重構把會員登入、結帳表單、綠界付款與完成頁都放進同一條體驗裡，讓整體更像真正會上線的花店品牌網站。
        </p>
      </div>
      <button type="button" className="primary-button" onClick={onOpenMemberModal}>
        {isMember ? '查看會員帳戶' : '登入會員'}
      </button>
    </section>
  )
}

export default MemberPromo
