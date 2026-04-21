function QuantitySelector({ value, onDecrease, onIncrease }) {
  return (
    <div className="quantity-selector">
      <button type="button" onClick={onDecrease} aria-label="減少數量">
        −
      </button>
      <span>{value}</span>
      <button type="button" onClick={onIncrease} aria-label="增加數量">
        +
      </button>
    </div>
  )
}

export default QuantitySelector
