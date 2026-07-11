# 綠界金流串接開發計畫（LV2 / Plan Mode）

日期：2026-07-12
狀態：ready-for-implementation

## 目標
- 依課程 LV2 要求，為本專案加入綠界金流串接功能。
- 使用 Plan Mode 先規劃再實作，避免直接修改造成流程混亂。
- 讓老師可依文件驗證：建立訂單、導向付款、回站查單、確認付款結果。

## 範圍
- 金流限制：僅使用綠界金流測試環境。
- 前端範圍：建立付款入口、付款結果頁、錯誤提示與驗收資訊。
- 後端範圍：建立訂單、產生 `CheckMacValue`、查詢訂單結果。
- 文件範圍：同步更新 `docs/FEATURES.md`、`docs/ARCHITECTURE.md`、`docs/TESTING.md`。

## 已知限制
- localhost 環境通常無法直接收到綠界 `ReturnURL` 主機通知。
- 不以單純前端跳轉當作付款成功依據。
- 付款成功判斷需以前端回站後，透過本地 server 呼叫綠界查單結果為準。

## 已完成盤點
- 已找到前端結帳頁：`src/pages/CheckoutPage.jsx`
- 已找到付款結果頁：`src/pages/PaymentResultPage.jsx`
- 已找到前端 API：`src/lib/api.js`
- 已找到 server 建單與查單入口：`server/index.js`
- 已找到 `CheckMacValue` 與 `QueryTradeInfo` 實作：`server/ecpay.js`
- 已找到測試環境設定範例：`.env.example`

## 目前缺口
- 已於 2026-07-12 確認 `npm run build` 可成功執行。
- 已於 2026-07-12 確認 `npm run lint` 可成功執行。
- `package.json` 目前未提供 `typecheck` script。
- 尚未完成本輪實際付款與回站查單驗證，因此不能只靠程式存在就宣告完成。

## 執行步驟
1. 盤點目前前端購物與結帳流程，確認付款入口位置。
2. 盤點 `server/` 現有能力，確認是否已有綠界建立訂單與查單模組。
3. 補齊前端付款送出流程，讓使用者可導向綠界測試付款頁。
4. 建立或修正付款結果頁，顯示：
   - MerchantTradeNo
   - 付款狀態
   - 付款方式
   - 付款時間或查單摘要
5. 建立或修正本地 API：
   - 建立訂單
   - 查詢付款結果
   - 統一錯誤訊息格式
6. 以綠界測試卡完成付款驗證。
7. 更新 `docs/FEATURES.md`、`docs/ARCHITECTURE.md`、`docs/TESTING.md`。
8. 完成後將本計畫移至 `docs/plans/archive/`。

## 驗證方式
- 可成功執行 `npm run build`。
- 若有 lint / typecheck，需一併確認。
- 使用者可從前端進入付款流程。
- 可成功導向綠界測試付款頁。
- 完成付款後可回到前端結果頁。
- 前端可透過本地 server 查單，確認付款結果。
- 文件已同步更新，驗收流程可重現。

## 驗收資料
- 會員測試帳密：`member@bloomandgrace.tw` / `Aa123456`
- Admin 驗收帳密：`admin@hexschool.com` / `12345678`
- 綠界測試卡：`4311-9522-2222-2222`
- 有效年月：任意未來日期
- 安全碼：任意 3 碼
- 3D 驗證：`1234`

## 預期更新檔案
- `src/` 內付款相關頁面或元件
- `server/` 內綠界建立訂單與查單相關模組
- `docs/FEATURES.md`
- `docs/ARCHITECTURE.md`
- `docs/TESTING.md`
- `docs/plans/archive/`（完成後歸檔）

## 結果摘要
- 本次已先建立 LV2 Plan Mode 計畫並完成現況盤點。
- 本輪已完成 build 與 lint 驗證，剩餘重點為實際付款流程與回站查單驗證。
- 實際付款驗證完成後，再更新狀態並移入 archive。
