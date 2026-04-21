function NavIcon({ type }) {
  if (type === 'about') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 4.2 18.2 7v4.4c0 4.2-2.7 6.9-6.2 8.4-3.5-1.5-6.2-4.2-6.2-8.4V7L12 4.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M9.4 11.8c.9-1.4 1.8-2 2.8-2 1.2 0 2.2.9 2.2 2.1 0 1.1-.7 1.7-1.8 2.3-.9.5-1.4 1-1.4 1.9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="17.1" r="0.8" fill="currentColor" />
      </svg>
    )
  }

  if (type === 'shop') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6.2 9.3h11.6l-1 9.2H7.2l-1-9.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M8.8 10.2V8.4A3.2 3.2 0 0 1 12 5.2a3.2 3.2 0 0 1 3.2 3.2v1.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="19" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="19" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4 5.5h2.2l1.5 8.2h9l2-5.7H8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default NavIcon
