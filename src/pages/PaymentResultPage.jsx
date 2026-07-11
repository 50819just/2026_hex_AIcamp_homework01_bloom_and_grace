import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import { navigateTo } from '../hooks/useRouter'
import { queryEcpayOrder } from '../lib/api'
import { formatPrice } from '../lib/formatters'

function getQueryValue(key) {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get(key) || ''
}

function getStatusContent(record) {
  const tradeInfo = record?.queryResult || {}
  const tradeStatus = String(tradeInfo.tradeStatus || '')
  const browserStatus = String(record?.browserReturnResult?.RtnCode || '')
  const notifyStatus = String(record?.returnNotifyResult?.RtnCode || '')
  const isSuccess = tradeStatus === '1' || browserStatus === '1' || notifyStatus === '1'

  if (isSuccess) {
    return {
      label: '訂單確認完成',
      title: '花禮訂單已確認，付款也順利完成',
      description: '系統已重新查單，這筆測試訂單目前顯示為付款成功，可以把它視為 Stitch 裡的完成頁版本。',
      toneClass: 'payment-result-success',
      isSuccess: true,
    }
  }

  if (record?.queryResult || record?.browserReturnResult || record?.returnNotifyResult) {
    return {
      label: '付款確認中',
      title: '付款資訊已回站，但綠界尚未回覆完成',
      description: '目前已收到部分付款資訊，姊姊先把狀態整理在這裡，你可以稍後再重新查詢一次。',
      toneClass: 'payment-result-pending',
      isSuccess: false,
    }
  }

  return {
    label: '等待付款確認',
    title: '正在等待更完整的付款確認',
    description: '目前還沒有查到完整付款資訊，可稍後再重新查詢一次。',
    toneClass: 'payment-result-pending',
    isSuccess: false,
  }
}

function getPaymentTypeLabel(paymentType) {
  const paymentTypeMap = {
    Credit: '信用卡',
    WebATM: '網路 ATM',
    ATM: 'ATM 轉帳',
    CVS: '超商代碼',
    BARCODE: '超商條碼',
    TWQR: 'TWQR 行動支付',
    DigitalPayment_IPASS: '一卡通 iPASS',
    ApplePay: 'Apple Pay',
  }

  return paymentTypeMap[paymentType] || paymentType || '綠界付款'
}

function getDisplayAmount(tradeInfo, record) {
  const rawAmount =
    tradeInfo?.tradeAmt ||
    record?.browserReturnResult?.TradeAmt ||
    record?.returnNotifyResult?.TradeAmt ||
    ''

  const amount = Number(rawAmount)
  return Number.isFinite(amount) && amount > 0 ? formatPrice(amount) : '尚未回傳'
}

function getResultSummary(record) {
  const tradeInfo = record?.queryResult || {}
  const parsed = tradeInfo?.parsed || {}
  const tradeStatus = String(tradeInfo.tradeStatus || '')

  if (tradeStatus === '1') {
    return `付款成功｜${parsed.ItemName || '商品'}｜${getPaymentTypeLabel(tradeInfo.paymentType)}｜${getDisplayAmount(tradeInfo, record)}`
  }

  if (record?.queryResult || record?.browserReturnResult || record?.returnNotifyResult) {
    return `付款確認中｜${parsed.ItemName || '商品'}｜請稍後重新查詢`
  }

  return '等待付款確認中'
}

function getStatusBadgeLabel(record) {
  const tradeStatus = String(record?.queryResult?.tradeStatus || '')

  if (tradeStatus === '1') {
    return '付款成功'
  }

  if (record?.queryResult || record?.browserReturnResult || record?.returnNotifyResult) {
    return '確認中'
  }

  return '等待中'
}

function PaymentResultPage({ onNotify }) {
  const merchantTradeNo = useMemo(() => getQueryValue('merchantTradeNo'), [])
  const [orderRecord, setOrderRecord] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(merchantTradeNo))
  const [errorMessage, setErrorMessage] = useState(merchantTradeNo ? '' : '缺少綠界交易編號，無法查詢付款結果。')
  const [copiedField, setCopiedField] = useState('')

  useEffect(() => {
    if (!merchantTradeNo) {
      return
    }

    const loadOrderResult = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const result = await queryEcpayOrder(merchantTradeNo)
        setOrderRecord(result)
      } catch (error) {
        const nextErrorMessage = error.message || '查詢付款結果失敗'
        setErrorMessage(nextErrorMessage)
        onNotify(nextErrorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrderResult()
  }, [merchantTradeNo, onNotify])

  if (!merchantTradeNo) {
    return (
      <EmptyState
        title="找不到付款結果"
        description="這個頁面需要帶入 merchantTradeNo 才能查詢綠界付款狀態。"
        actionLabel="回到首頁"
        onAction={() => navigateTo('/')}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="page-stack">
        <section className="content-section payment-result-shell payment-result-shell-editorial">
          <div className="section-heading">
            <div>
              <p className="section-kicker">訂單確認中</p>
              <h1 className="page-title">正在向綠界重新確認這筆花禮訂單</h1>
              <p className="page-description">付款回站後，系統會再透過本地 server 查單一次，讓完成頁不只停在畫面示意。</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="page-stack">
        <section className="content-section payment-result-shell payment-result-shell-editorial">
          <div className="section-heading">
            <div>
              <p className="section-kicker">付款結果查詢</p>
              <h1 className="page-title">付款結果查詢失敗</h1>
              <p className="page-description">{errorMessage}</p>
            </div>
          </div>

          <div className="payment-result-actions">
            <button type="button" className="secondary-button" onClick={() => window.location.reload()}>
              重新查詢
            </button>
            <button type="button" className="primary-button" onClick={() => navigateTo('/cart')}>
              回到購物袋
            </button>
          </div>
        </section>
      </div>
    )
  }

  const statusContent = getStatusContent(orderRecord)
  const tradeInfo = orderRecord?.queryResult || {}
  const parsedTradeInfo = tradeInfo.parsed || {}
  const paymentType = getPaymentTypeLabel(
    tradeInfo.paymentType || orderRecord?.browserReturnResult?.PaymentType || '綠界測試付款',
  )
  const paymentDate = tradeInfo.paymentDate || orderRecord?.browserReturnResult?.PaymentDate || '尚未回傳'
  const tradeStatus = tradeInfo.tradeStatus || orderRecord?.paymentStatus || '未提供'
  const tradeAmt = getDisplayAmount(tradeInfo, orderRecord)
  const itemName = parsedTradeInfo.ItemName || orderRecord?.browserReturnResult?.ItemName || '尚未回傳'
  const customerName = parsedTradeInfo.CustomField1 || orderRecord?.checkoutFields?.CustomField1 || '尚未回傳'
  const ecpayTradeNo = tradeInfo.tradeNo || parsedTradeInfo.TradeNo || '尚未回傳'
  const resultSummary = getResultSummary(orderRecord)
  const statusBadgeLabel = getStatusBadgeLabel(orderRecord)

  const handleCopy = async (value, fieldKey) => {
    if (!value || value === '尚未回傳') {
      return
    }

    try {
      await navigator.clipboard.writeText(String(value))
      setCopiedField(fieldKey)
      onNotify('已複製到剪貼簿')

      window.setTimeout(() => {
        setCopiedField((currentValue) => (currentValue === fieldKey ? '' : currentValue))
      }, 1800)
    } catch {
      onNotify('目前無法自動複製，請手動選取文字', 'info')
    }
  }

  return (
    <div className="page-stack">
      <section className="content-section payment-result-shell payment-result-shell-editorial">
        <div className="section-heading payment-result-heading-editorial">
          <div>
            <p className="section-kicker">{statusContent.label}</p>
            <h1 className="page-title">{statusContent.title}</h1>
            <p className="page-description">{statusContent.description}</p>
          </div>
        </div>

        <div className={`payment-result-status payment-result-status-editorial ${statusContent.toneClass}`}>
          <span className={`payment-result-badge ${statusContent.isSuccess ? 'is-success' : 'is-pending'}`}>
            {statusBadgeLabel}
          </span>
          <strong>{statusContent.isSuccess ? '謝謝你，這筆花禮訂單已完成。' : '目前系統已收到回站資訊，下一步是確認最終付款狀態。'}</strong>
          <p>{statusContent.isSuccess ? '這裡保留了完成頁該有的確認感，同時也把真實查單資訊整理在下方。' : '你可以稍後重新查詢，或先回到選品頁與購物袋繼續整理。'}</p>
        </div>

        <div className="payment-result-hero-card">
          <div className="payment-result-hero-copy">
            <span className="cart-banner-label">訂單旅程</span>
            <strong>{statusContent.isSuccess ? '付款成功後，回站查單也已經完成' : '付款流程已進入回站查詢階段'}</strong>
            <p>這一頁現在同時扮演設計稿中的完成頁，以及驗證綠界付款結果的實際頁面。</p>
            <p><strong>前台回傳：</strong>{resultSummary}</p>
          </div>
          <div className="checkout-security-badges">
            <span>訂單編號已建立</span>
            <span>前端回站已檢查</span>
            <span>伺服器查單已檢查</span>
          </div>
        </div>

        <div className="payment-result-grid payment-result-grid-editorial">
          <article className="payment-result-card payment-result-card-priority">
            <h2>訂單資訊</h2>
            <dl>
              <div className="payment-result-row-copy">
                <dt>綠界交易編號</dt>
                <dd>
                  <span>{merchantTradeNo}</span>
                  <button type="button" className="payment-result-copy-button" onClick={() => handleCopy(merchantTradeNo, 'merchantTradeNo')}>
                    {copiedField === 'merchantTradeNo' ? '已複製' : '複製'}
                  </button>
                </dd>
              </div>
              <div className="payment-result-row-copy">
                <dt>綠界付款流水號</dt>
                <dd>
                  <span>{ecpayTradeNo}</span>
                  <button type="button" className="payment-result-copy-button" onClick={() => handleCopy(ecpayTradeNo, 'ecpayTradeNo')}>
                    {copiedField === 'ecpayTradeNo' ? '已複製' : '複製'}
                  </button>
                </dd>
              </div>
              <div>
                <dt>付款方式</dt>
                <dd>{paymentType}</dd>
              </div>
              <div>
                <dt>付款金額</dt>
                <dd>{tradeAmt}</dd>
              </div>
              <div>
                <dt>付款時間</dt>
                <dd>{paymentDate}</dd>
              </div>
              <div>
                <dt>訂購人</dt>
                <dd>{customerName}</dd>
              </div>
              <div>
                <dt>商品內容</dt>
                <dd>{itemName}</dd>
              </div>
              <div>
                <dt>查單狀態</dt>
                <dd>{tradeStatus}</dd>
              </div>
              <div>
                <dt>付款狀態</dt>
                <dd>{orderRecord?.paymentStatus || '建立中'}</dd>
              </div>
            </dl>
          </article>

          <article className="payment-result-card">
            <h2>安全驗證</h2>
            <ul className="payment-result-list">
              <li>訂單回傳驗證：{orderRecord?.browserCallbackVerified ? '已通過' : '尚未收到或未通過'}</li>
              <li>伺服器回傳驗證：{orderRecord?.returnCallbackVerified ? '已通過' : '本地測試通常收不到'}</li>
              <li>查單依據：付款結果頁會主動呼叫本地伺服器查詢綠界結果。</li>
            </ul>
          </article>
        </div>

        <article className="payment-result-card payment-result-card-full">
          <h2>前台回傳字串 / 查單摘要</h2>
          <div className="payment-result-summary-wrap">
            <pre className="payment-result-code payment-result-code-summary">{resultSummary}</pre>
            <button type="button" className="payment-result-copy-button payment-result-copy-button-inline" onClick={() => handleCopy(resultSummary, 'resultSummary')}>
              {copiedField === 'resultSummary' ? '已複製摘要' : '複製摘要'}
            </button>
          </div>

          <details className="payment-result-details">
            <summary>展開原始查單 JSON</summary>
            <pre className="payment-result-code">{JSON.stringify(tradeInfo, null, 2)}</pre>
          </details>
        </article>

        <div className="payment-result-actions">
          <button type="button" className="secondary-button" onClick={() => window.location.reload()}>
            重新查詢
          </button>
            <button type="button" className="primary-button" onClick={() => navigateTo('/shop')}>
            繼續挑選花禮
          </button>
        </div>
      </section>
    </div>
  )
}

export default PaymentResultPage
