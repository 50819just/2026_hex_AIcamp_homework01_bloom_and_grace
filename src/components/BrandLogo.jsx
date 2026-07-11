import logoPrimary from '../assets/branding/logo-primary.svg'
import logoMark from '../assets/branding/logo-mark.svg'
import logoLight from '../assets/branding/logo-light.svg'
import logoDark from '../assets/branding/logo-dark.svg'

const variantMap = {
  primary: logoPrimary,
  mark: logoMark,
  light: logoLight,
  dark: logoDark,
}

function BrandLogo({ variant = 'primary', size = 'md', className = '', alt = '花店品牌標誌' }) {
  const src = variantMap[variant] || logoPrimary
  const classes = ['brand-logo-image', `brand-logo-image-${size}`, className].filter(Boolean).join(' ')

  return <img src={src} alt={alt} className={classes} />
}

export default BrandLogo
