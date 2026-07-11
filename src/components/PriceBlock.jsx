import { formatPrice } from '../lib/formatters'

function PriceBlock({ originalPrice, memberPrice, isMember, compact = false }) {
  return (
    <div className={compact ? 'price-block price-block-compact' : 'price-block'}>
      <div className="price-line">
        <span className="original-price">{formatPrice(originalPrice)}</span>
        <span className="member-price">
          {isMember ? '會員價' : '會員價'} {formatPrice(memberPrice)}
        </span>
      </div>
      {!compact ? <p className="price-caption">{isMember ? '已套用會員價' : '登入後可查看會員價'}</p> : null}
    </div>
  )
}

export default PriceBlock
