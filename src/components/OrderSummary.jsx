function OrderSummary({
  kicker = '訂單摘要',
  title = '訂單摘要',
  rows = [],
  totalLabel = '合計',
  totalValue = '',
  action = null,
  serviceItems = [],
  note = '',
  className = '',
}) {
  return (
    <aside className={`order-summary ${className}`.trim()}>
      <p className="section-kicker">{kicker}</p>
      <h2>{title}</h2>

      {note ? <p className="order-summary-note">{note}</p> : null}

      <dl>
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="cart-summary-total">
        <span>{totalLabel}</span>
        <strong>{totalValue}</strong>
      </div>

      {serviceItems.length > 0 ? (
        <div className="cart-summary-service-list">
          {serviceItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}

      {action}
    </aside>
  )
}

export default OrderSummary
