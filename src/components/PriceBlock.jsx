import { formatPrice } from '../lib/formatters'

function PriceBlock({ originalPrice, memberPrice, isMember }) {
  return (
    <div className="price-block">
      <div className="price-line">
        <span className="original-price">{formatPrice(originalPrice)}</span>
        <span className="member-price">{formatPrice(memberPrice)}</span>
      </div>
      <p className="price-caption">
        {isMember ? '已登入會員，可享會員價' : '登入會員後可享會員價優惠'}
      </p>
    </div>
  )
}

export default PriceBlock
