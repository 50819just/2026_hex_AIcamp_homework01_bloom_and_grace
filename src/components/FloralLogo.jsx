function FloralLogo({ size = 'md' }) {
  const className = size === 'sm' ? 'floral-logo floral-logo-sm' : 'floral-logo'

  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 64 64" role="img">
        <g fill="none" fillRule="evenodd">
          <circle cx="32" cy="32" r="6.5" fill="#FFF6F8" stroke="#A56B82" strokeWidth="2.2" />
          <ellipse cx="32" cy="17" rx="9" ry="12" fill="#F5D9E3" stroke="#B57A90" strokeWidth="2" />
          <ellipse cx="47" cy="32" rx="12" ry="9" fill="#F3E4C7" stroke="#AF8750" strokeWidth="2" />
          <ellipse cx="32" cy="47" rx="9" ry="12" fill="#E8F1E2" stroke="#7C9472" strokeWidth="2" />
          <ellipse cx="17" cy="32" rx="12" ry="9" fill="#EEE2F6" stroke="#8E7AAA" strokeWidth="2" />
          <path d="M31 38 C31 45 29 50 26 55" stroke="#7C9472" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M28 49 C24 48 21 49 18 52" stroke="#93AD87" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </svg>
    </span>
  )
}

export default FloralLogo
