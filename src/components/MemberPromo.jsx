function MemberPromo({ isMember, onOpenMemberModal }) {
  return (
    <section className="page-container member-promo">
      <div className="member-promo-copy">
        <p className="section-kicker">會員禮遇</p>
        <h2>定期收到更精緻的花禮，讓空間一直保有溫柔氣息。</h2>
        <p>
          登入後即可開啟會員價、保存常用資料，並延續更順手的結帳流程。
        </p>
      </div>

      <button type="button" className="primary-button" onClick={onOpenMemberModal}>
        {isMember ? '查看會員資料' : '會員登入'}
      </button>
    </section>
  )
}

export default MemberPromo
