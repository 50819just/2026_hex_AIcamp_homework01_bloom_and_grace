function MemberModal({ isOpen, isMember, onClose, onToggleMember }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div className="member-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="member-modal-header">
          <div>
            <p className="section-kicker">會員示意</p>
            <h2>登入後即可享有會員價</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="關閉視窗">
            ×
          </button>
        </div>

        <div className="member-modal-body">
          <label>
            Email
            <input type="email" placeholder="member@bloomandgrace.tw" />
          </label>
          <label>
            密碼
            <input type="password" placeholder="••••••••" />
          </label>
          <div className="member-modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              稍後再說
            </button>
            <button type="button" className="primary-button" onClick={onToggleMember}>
              {isMember ? '切換為訪客狀態' : '模擬登入成會員'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberModal
