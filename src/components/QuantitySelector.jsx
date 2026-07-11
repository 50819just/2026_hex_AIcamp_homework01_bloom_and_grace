function QuantitySelector({ value, onDecrease, onIncrease }) {
  return (
    <div className="quantity-selector" aria-label="Quantity selector">
      <button type="button" onClick={onDecrease} aria-label="Decrease quantity">
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={onIncrease} aria-label="Increase quantity">
        +
      </button>
    </div>
  )
}

export default QuantitySelector
