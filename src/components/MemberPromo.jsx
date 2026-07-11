function MemberPromo({ isMember, onOpenMemberModal }) {
  return (
    <section className="member-promo">
      <div>
        <p className="section-kicker">會員流程</p>
        <h2>登入後即可進入結帳，並套用會員價</h2>
        <p>
          這一版先用 mock 會員流程完成作業需求，重點是讓購物、登入、付款與查單流程都能順利驗收。
        </p>
      </div>
      <button type="button" className="primary-button" onClick={onOpenMemberModal}>
        {isMember ? '查看會員狀態' : '登入會員'}
      </button>
    </section>
  )
}

export default MemberPromo
