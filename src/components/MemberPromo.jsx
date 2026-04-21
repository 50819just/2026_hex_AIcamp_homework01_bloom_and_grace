function MemberPromo({ isMember, onOpenMemberModal }) {
  return (
    <section className="member-promo">
      <div>
        <p className="section-kicker">會員禮遇</p>
        <h2>登入即可查看會員專屬價格與購物回饋</h2>
        <p>
          這一版先以 mock state 示意登入流程，但已保留會員價顯示與購物車價格差異邏輯。
        </p>
      </div>
      <button type="button" className="primary-button" onClick={onOpenMemberModal}>
        {isMember ? '查看會員優惠狀態' : '登入 / 註冊'}
      </button>
    </section>
  )
}

export default MemberPromo
