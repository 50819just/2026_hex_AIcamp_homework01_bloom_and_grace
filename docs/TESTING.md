# TESTING.md

## 驗收目標
本檔給老師、助教與未來維護者確認三件事：
1. 專案是否可正常 build / lint
2. 前台購物、登入、結帳與付款結果頁是否可重現
3. 綠界驗證流程是否符合「本地端主動查單」的課程要求

## A. 環境準備
### 1. 安裝依賴
```bash
npm install
```

### 2. 建立 `.env`
可從 `.env.example` 複製，至少要有：
- `APP_BASE_URL=http://localhost:3000`
- `FRONTEND_BASE_URL=http://localhost:5173`
- `VITE_API_BASE_URL=http://localhost:3000`
- `ECPAY_ENV=stage`
- `ECPAY_MERCHANT_ID=3002607`
- `ECPAY_HASH_KEY=pwFHCqoQZGmho4w6`
- `ECPAY_HASH_IV=EkRm7iFT261dpevs`
- `VITE_ADMIN_EMAIL`
- `VITE_ADMIN_PASSWORD`

### 3. 啟動前後端
```bash
npm run server
npm run dev
```

若想一起開：
```bash
npm run dev:all
```

### 4. 建置檢查
```bash
npm run build
npm run lint
```

> `package.json` 目前沒有 `typecheck` script，這點符合現況，但驗收時要一併註記。

## B. 前台驗收流程
### 1. 商品與購物車
1. 進入 `/shop`
2. 加入任一花禮到購物車
3. 進 `/cart`
4. 確認可調整數量與刪除商品

### 2. 未登入不可結帳
1. 在未登入狀態按「前往結帳」
2. 預期結果：
   - 顯示需先登入會員的提示
   - 不會直接進入 `/checkout`

### 3. 會員登入
#### 畫面建議測試資料
- 測試用帳號：`member@flower.tw`
- 測試用密碼：`Flower1234`

> 目前會員登入屬於 mock 流程，主要驗證的是「登入後可進入結帳」，不是後端真實帳密比對。

步驟：
1. 進入 `/sign-in`
2. 輸入任意非空的帳號與密碼（建議直接使用頁面顯示的測試資料）
3. 成功後重新進入 `/checkout`
4. 確認可看到收件資料、發票資訊與付款提醒

## C. Admin 驗收流程
### 建議帳密
- `.env.example` 預設：`admin@hexschool.com / 12345678`
- 若前端未吃到 `.env`，程式 fallback 可能顯示：`admin@flower.tw / 12345678`

> 因 build-time env 影響，**請以當下頁面顯示或實際 `.env` 值為準**。

步驟：
1. 進入 `/admin`
2. 用頁面顯示的管理員帳密登入
3. 預期結果：可進入後台商品與會員示意頁

## D. 綠界付款驗收
### 測試信用卡資料
- 測試信用卡卡號：`4311-9522-2222-2222`
- 到期年月：任意未來日期
- 安全碼：任意 3 碼
- 3D 驗證碼：`1234`

### 驗收步驟
1. 以會員身份進入 `/checkout`
2. 填完收件資料
3. 點擊「前往綠界付款」
4. 確認導向綠界測試付款頁
5. 使用上方測試卡完成付款
6. 成功後應回到 `/payment-result?merchantTradeNo=...`
7. 前端會再透過本地 server 呼叫 `/api/ecpay/query`
8. 結果頁應可看到：
   - 前台回傳摘要字串
   - 商店訂單編號
   - 綠界付款流水號
   - 付款方式
   - 付款金額
   - 付款時間
   - 原始查單 JSON（可收合）

### 本題關鍵驗收點
- **不是只看有沒有成功跳回前台**
- **而是要確認前端有沒有在回站後主動查單**
- `tradeStatus === '1'` 時，付款結果頁應顯示付款成功

## E. 常見錯誤排查
### 1. Checkout 顯示連不到付款服務
可能原因：`npm run server` 沒有啟動。

### 2. 綠界付款完成但結果頁查不到資料
先檢查：
- URL 是否有 `merchantTradeNo`
- `server/data/ecpay-orders.json` 是否有該筆資料
- server console 是否有查單錯誤

### 3. `ReturnURL` 沒收到
在 localhost 很常見，**本專案不以此當作失敗**。
只要 `/payment-result` 頁面能主動查單成功，就符合課程要求。

### 4. GitHub Pages 無法完整測金流
這是正常的，因為 GitHub Pages 沒有本地 Node server。
老師若要驗綠界流程，需在本地環境啟動前後端。

## F. 文件同步驗收
若本輪有改功能或流程，請確認：
- `docs/README.md`
- `docs/ARCHITECTURE.md`
- `docs/FEATURES.md`
- `docs/DEVELOPMENT.md`
- `docs/TESTING.md`
- `docs/CHANGELOG.md`
都已反映實際現況。
