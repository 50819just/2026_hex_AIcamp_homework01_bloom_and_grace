import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import { navigateTo } from '../hooks/useRouter'
import { queryEcpayOrder } from '../lib/api'

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

function PaymentResultPage({ onNotify }) {
  const merchantTradeNo = useMemo(() => getQueryValue('merchantTradeNo'), [])
  const [orderRecord, setOrderRecord] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(merchantTradeNo))
  const [errorMessage, setErrorMessage] = useState(merchantTradeNo ? '' : '缺少 MerchantTradeNo，無法查詢付款結果。')

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
  const paymentType = tradeInfo.paymentType || orderRecord?.browserReturnResult?.PaymentType || '綠界測試付款'
  const paymentDate = tradeInfo.paymentDate || orderRecord?.browserReturnResult?.PaymentDate || '尚未回傳'
  const tradeStatus = tradeInfo.tradeStatus || orderRecord?.paymentStatus || '未提供'

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
          <strong>{statusContent.isSuccess ? 'Thank you. Your floral order is now complete.' : '目前系統已收到回站資訊，下一步是確認最終付款狀態。'}</strong>
          <p>{statusContent.isSuccess ? '這裡保留了完成頁該有的確認感，同時也把真實查單資訊整理在下方。' : '你可以稍後重新查詢，或先回到選品頁與購物袋繼續整理。'}</p>
        </div>

        <div className="payment-result-hero-card">
          <div className="payment-result-hero-copy">
            <span className="cart-banner-label">訂單旅程</span>
            <strong>{statusContent.isSuccess ? '付款成功後，回站查單也已經完成' : '付款流程已進入回站查詢階段'}</strong>
            <p>這一頁現在同時扮演 Stitch 裡的 Order Confirmed 畫面，以及驗證綠界付款結果的實際頁面。</p>
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
              <div>
                <dt>MerchantTradeNo</dt>
                <dd>{merchantTradeNo}</dd>
              </div>
              <div>
                <dt>付款方式</dt>
                <dd>{paymentType}</dd>
              </div>
              <div>
                <dt>付款時間</dt>
                <dd>{paymentDate}</dd>
              </div>
              <div>
                <dt>查單狀態</dt>
                <dd>{tradeStatus}</dd>
              </div>
              <div>
                <dt>付款狀態</dt>
                <dd>{orderRecord?.paymentStatus || 'created'}</dd>
              </div>
            </dl>
          </article>

          <article className="payment-result-card">
            <h2>安全驗證</h2>
            <ul className="payment-result-list">
              <li>OrderResultURL 驗證：{orderRecord?.browserCallbackVerified ? '已通過' : '尚未收到或未通過'}</li>
              <li>ReturnURL 驗證：{orderRecord?.returnCallbackVerified ? '已通過' : '本地測試通常收不到'}</li>
              <li>查單依據：PaymentResult 頁會主動呼叫本地 server 查詢綠界結果。</li>
            </ul>
          </article>
        </div>

        <article className="payment-result-card payment-result-card-full">
          <h2>查單摘要</h2>
          <pre className="payment-result-code">{JSON.stringify(tradeInfo, null, 2)}</pre>
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
