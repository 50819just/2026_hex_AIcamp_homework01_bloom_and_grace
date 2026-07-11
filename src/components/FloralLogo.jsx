import BrandLogo from './BrandLogo'

function FloralLogo({ size = 'md' }) {
  const mappedSize = size === 'sm' ? 'icon-sm' : 'icon-md'
  return <BrandLogo variant="mark" size={mappedSize} alt="花店品牌標誌圖" />
}

export default FloralLogo
