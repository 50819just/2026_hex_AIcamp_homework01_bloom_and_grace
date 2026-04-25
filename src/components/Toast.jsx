const toastIconMap = {
  success: '✓',
  error: '×',
  info: 'i',
  remove: '×',
}

function Toast({ message, isVisible, tone = 'success' }) {
  if (!message) {
    return null
  }

  const safeTone = toastIconMap[tone] ? tone : 'success'

  return (
    <div className={`toast toast-${safeTone}${isVisible ? ' toast-visible' : ''}`} role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">{toastIconMap[safeTone]}</span>
      <span>{message}</span>
    </div>
  )
}

export default Toast
