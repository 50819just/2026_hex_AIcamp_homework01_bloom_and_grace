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
      label: '付款成功',
      description: '系統已重新查單，這筆測試訂單目前顯示為付款成功。',
      toneClass: 'payment-result-success',
    }
  }

  if (record?.queryResult || record?.browserReturnResult || record?.returnNotifyResult) {
    return {
      label: '付款尚未完成',
      description: '目前已收到部分付款資訊，但綠界尚未回覆完成付款。',
      toneClass: 'payment-result-pending',
    }
  }

  return {
    label: '等待查詢',
    description: '目前還沒有查到完整付款資訊，可稍後再重新查詢一次。',
    toneClass: 'payment-result-pending',
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
        <section className="content-section payment-result-shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Payment Result</p>
              <h1 className="page-title">付款結果查詢中</h1>
              <p className="page-description">正在透過本地 server 向綠界查單，請稍等一下。</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="page-stack">
        <section className="content-section payment-result-shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Payment Result</p>
              <h1 className="page-title">付款結果查詢失敗</h1>
              <p className="page-description">{errorMessage}</p>
            </div>
          </div>

          <div className="payment-result-actions">
            <button type="button" className="secondary-button" onClick={() => window.location.reload()}>
              重新查詢
            </button>
            <button type="button" className="primary-button" onClick={() => navigateTo('/cart')}>
              回到購物車
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
      <section className="content-section payment-result-shell">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Payment Result</p>
            <h1 className="page-title">付款結果</h1>
            <p className="page-description">這個頁面會在綠界付款完成後回站，並再次透過本地 server 查單確認結果。</p>
          </div>
        </div>

        <div className={`payment-result-status ${statusContent.toneClass}`}>
          <strong>{statusContent.label}</strong>
          <p>{statusContent.description}</p>
        </div>

        <div className="payment-result-grid">
          <article className="payment-result-card">
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
            繼續選購
          </button>
        </div>
      </section>
    </div>
  )
}

export default PaymentResultPage
