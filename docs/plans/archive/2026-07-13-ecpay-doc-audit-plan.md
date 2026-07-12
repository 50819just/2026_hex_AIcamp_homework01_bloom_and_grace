# 本地綠界金流與文件盤點計畫

日期：2026-07-13
狀態：completed

## 目標
- 依老師規則補一份 Plan Mode 計畫文件，盤點本專案目前的綠界金流實作與文件狀態。
- 確認金流流程符合「本地端無法接收綠界 Server Notify，因此要由前端回站後主動查單」的課程要求。
- 同步整理 `docs/` 目錄，讓未來維護者與老師都能快速理解測試方式。

## 參考依據
- `.ecpay-skill/AGENTS.md`
- `.ecpay-skill/SKILL.md`
- `.ecpay-skill/guides/01-payment-aio.md`
- `docs/plans/2026-07-12-ecpay-lv2-plan.md`
- 目前實作：`server/index.js`、`server/ecpay.js`、`src/pages/CheckoutPage.jsx`、`src/pages/PaymentResultPage.jsx`

## 盤點重點
1. 檢查 ECPay 流程是否使用 AIO 串接。
2. 檢查 `OrderResultURL` 與本地回站查單流程是否存在。
3. 檢查文件是否反映目前實作：JSON 檔持久化、測試帳密、測試卡、付款結果頁摘要。
4. 確認 build / lint 是否可通過。

## 結論
- 本專案目前使用 ECPay AIO 測試環境。
- 付款結果確認流程符合課程要求：
  - 綠界回站到 `OrderResultURL`
  - 前端進入 `/payment-result`
  - 再由本地 server 主動呼叫 `QueryTradeInfo`
- `ReturnURL` 仍保留，但 localhost 環境不能把它當成唯一成功依據。
- 訂單資料已改為寫入 `server/data/ecpay-orders.json`，不再依賴 SQLite。

## 後續文件更新
- `docs/README.md`
- `docs/ARCHITECTURE.md`
- `docs/FEATURES.md`
- `docs/DEVELOPMENT.md`
- `docs/TESTING.md`
- `docs/CHANGELOG.md`

## 驗證方式
- `npm run build`
- `npm run lint`
- 人工檢查：Checkout → ECPay 測試付款頁 → Payment Result 查單摘要
