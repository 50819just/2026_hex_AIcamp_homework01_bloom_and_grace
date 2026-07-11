function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="page-container">
      <div className="empty-state">
        <p className="section-kicker">花店訊息</p>
        <h3>{title}</h3>
        <p>{description}</p>
        {actionLabel ? (
          <button type="button" className="secondary-button" onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default EmptyState
