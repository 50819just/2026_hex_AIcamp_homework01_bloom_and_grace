# ECPAY_HEALTH_CHECK.md

## 檢查日期
- 2026-07-11

## 檢查結論
本專案的綠界串接目前屬於「作業驗收可用版」，已補上較完整的安全強化：
- Callback CheckMacValue 驗證
- 台灣時區的 MerchantTradeDate
- 查單結果整理
- 訂單資料改為 JSON 檔持久化保存
- 付款結果頁可看到驗證狀態

## 已完成的強化項目
### 1. Callback 驗證
- `OrderResultURL`：收到資料後先驗證 `CheckMacValue`
- `ReturnURL`：收到資料後先驗證 `CheckMacValue`
- 驗證失敗不寫入有效付款結果，並記錄 warning
- `ReturnURL` 仍回 `1|OK`，避免綠界持續重試

### 2. 台灣時區
- `MerchantTradeDate` 已明確以 `Asia/Taipei` 格式化輸出
- 避免日後部署在 UTC 主機時時間錯誤

### 3. 訂單持久化
- 新增 `server/data/ecpay-orders.json`
- 取代原本記憶體 `Map` 與 SQLite 依賴
- server 重啟後仍能保留查單資料

### 4. 查單結果整理
- `queryTradeInfo()` 現在會整理：
  - `tradeStatus`
  - `paymentType`
  - `paymentDate`
  - `tradeNo`
  - `tradeAmt`
  - `rtnMsg`
- 前端付款結果頁可直接使用

### 5. 付款結果頁安全資訊
- 顯示：
  - `OrderResultURL` 驗證是否通過
  - `ReturnURL` 驗證是否通過
  - `paymentStatus`

## 測試商品
- 系統會自動確保存在 1 筆 `1 元測試花禮`
- 商品 ID：`test-flower-1-dollar`
- 用途：測試購物車、會員登入、結帳與綠界付款流程

## 仍屬作業版的部分
- 會員登入仍為 mock
- 本地端通常收不到真正可公開的 `ReturnURL`
- 仍使用綠界測試環境，不是真正商業收款
- 未實作正式出貨、退款、發票與通知流程
- JSON 檔案儲存適合課程 / MVP 驗收，不適合正式多人高併發交易站

## 建議下一步
1. 使用 ngrok 或正式 HTTPS 網址測試 `ReturnURL`
2. 補正式會員登入與訂單後台
3. 若要正式上線，再切換正式 MerchantID / HashKey / HashIV
