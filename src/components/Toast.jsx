function Toast({ message, isVisible }) {
  if (!message) {
    return null
  }

  return (
    <div className={isVisible ? 'toast toast-visible' : 'toast'} role="status" aria-live="polite">
      <span className="toast-icon">✓</span>
      <span>{message}</span>
    </div>
  )
}

export default Toast
