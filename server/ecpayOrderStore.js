import { readJsonFile, writeJsonFile } from './fileStore.js'

const ECPAY_ORDERS_FILE = 'ecpay-orders.json'

function readAllOrders() {
  return readJsonFile(ECPAY_ORDERS_FILE, [])
}

export function readEcpayOrder(merchantTradeNo) {
  return readAllOrders().find((order) => order.merchantTradeNo === merchantTradeNo) || null
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

  const orders = readAllOrders()
  const targetIndex = orders.findIndex((order) => order.merchantTradeNo === nextRecord.merchantTradeNo)

  if (targetIndex === -1) {
    orders.unshift(nextRecord)
  } else {
    orders[targetIndex] = nextRecord
  }

  writeJsonFile(ECPAY_ORDERS_FILE, orders)

  return readEcpayOrder(nextRecord.merchantTradeNo)
}
