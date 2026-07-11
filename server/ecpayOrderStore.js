import { db } from './db.js'

function parseJson(value, fallback = null) {
  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function stringifyJson(value) {
  return value ? JSON.stringify(value) : null
}

function mapOrderRow(row) {
  if (!row) {
    return null
  }

  return {
    merchantTradeNo: row.merchant_trade_no,
    orderInput: parseJson(row.order_input, {}),
    checkoutFields: parseJson(row.checkout_fields, {}),
    browserReturnResult: parseJson(row.browser_return_result, null),
    returnNotifyResult: parseJson(row.return_notify_result, null),
    queryResult: parseJson(row.query_result, null),
    paymentStatus: row.payment_status,
    browserCallbackVerified: Number(row.browser_callback_verified) === 1,
    returnCallbackVerified: Number(row.return_callback_verified) === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    browserReturnedAt: row.browser_returned_at,
    returnNotifiedAt: row.return_notified_at,
    lastQueriedAt: row.last_queried_at,
  }
}

export function readEcpayOrder(merchantTradeNo) {
  return mapOrderRow(
    db.prepare(`
      SELECT merchant_trade_no, order_input, checkout_fields, browser_return_result, return_notify_result,
             query_result, payment_status, browser_callback_verified, return_callback_verified,
             created_at, updated_at, browser_returned_at, return_notified_at, last_queried_at
      FROM ecpay_orders
      WHERE merchant_trade_no = ?
    `).get(merchantTradeNo),
  )
}

export function upsertEcpayOrder(record) {
  const existingRecord = readEcpayOrder(record.merchantTradeNo)
  const nextRecord = {
    merchantTradeNo: record.merchantTradeNo,
    orderInput: record.orderInput ?? existingRecord?.orderInput ?? {},
    checkoutFields: record.checkoutFields ?? existingRecord?.checkoutFields ?? {},
    browserReturnResult: record.browserReturnResult ?? existingRecord?.browserReturnResult ?? null,
    returnNotifyResult: record.returnNotifyResult ?? existingRecord?.returnNotifyResult ?? null,
    queryResult: record.queryResult ?? existingRecord?.queryResult ?? null,
    paymentStatus: record.paymentStatus ?? existingRecord?.paymentStatus ?? 'created',
    browserCallbackVerified:
      record.browserCallbackVerified ?? existingRecord?.browserCallbackVerified ?? false,
    returnCallbackVerified:
      record.returnCallbackVerified ?? existingRecord?.returnCallbackVerified ?? false,
    createdAt: record.createdAt ?? existingRecord?.createdAt ?? new Date().toISOString(),
    updatedAt: record.updatedAt ?? new Date().toISOString(),
    browserReturnedAt: record.browserReturnedAt ?? existingRecord?.browserReturnedAt ?? null,
    returnNotifiedAt: record.returnNotifiedAt ?? existingRecord?.returnNotifiedAt ?? null,
    lastQueriedAt: record.lastQueriedAt ?? existingRecord?.lastQueriedAt ?? null,
  }

  db.prepare(`
    INSERT INTO ecpay_orders (
      merchant_trade_no, order_input, checkout_fields, browser_return_result, return_notify_result,
      query_result, payment_status, browser_callback_verified, return_callback_verified,
      created_at, updated_at, browser_returned_at, return_notified_at, last_queried_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(merchant_trade_no) DO UPDATE SET
      order_input = excluded.order_input,
      checkout_fields = excluded.checkout_fields,
      browser_return_result = excluded.browser_return_result,
      return_notify_result = excluded.return_notify_result,
      query_result = excluded.query_result,
      payment_status = excluded.payment_status,
      browser_callback_verified = excluded.browser_callback_verified,
      return_callback_verified = excluded.return_callback_verified,
      updated_at = excluded.updated_at,
      browser_returned_at = excluded.browser_returned_at,
      return_notified_at = excluded.return_notified_at,
      last_queried_at = excluded.last_queried_at
  `).run(
    nextRecord.merchantTradeNo,
    stringifyJson(nextRecord.orderInput),
    stringifyJson(nextRecord.checkoutFields),
    stringifyJson(nextRecord.browserReturnResult),
    stringifyJson(nextRecord.returnNotifyResult),
    stringifyJson(nextRecord.queryResult),
    nextRecord.paymentStatus,
    nextRecord.browserCallbackVerified ? 1 : 0,
    nextRecord.returnCallbackVerified ? 1 : 0,
    nextRecord.createdAt,
    nextRecord.updatedAt,
    nextRecord.browserReturnedAt,
    nextRecord.returnNotifiedAt,
    nextRecord.lastQueriedAt,
  )

  return readEcpayOrder(nextRecord.merchantTradeNo)
}
