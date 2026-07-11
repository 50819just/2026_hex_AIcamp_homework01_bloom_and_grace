function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <p className="section-kicker">Bloom & Grace</p>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel ? (
        <button type="button" className="secondary-button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}

export default EmptyState
