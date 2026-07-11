# TESTING.md

## 驗收前準備

### 1. 安裝依賴
```bash
npm install
```

### 2. 設定環境變數
請建立 `.env`，可直接複製 `.env.example`。

這次驗收主要會用到：
- `APP_BASE_URL`
- `FRONTEND_BASE_URL`
- `VITE_API_BASE_URL`
- `ECPAY_ENV`
- `ECPAY_MERCHANT_ID`
- `ECPAY_HASH_KEY`
- `ECPAY_HASH_IV`
- `VITE_ADMIN_EMAIL`
- `VITE_ADMIN_PASSWORD`

### 3. 啟動前後端
先開本地 server：
```bash
npm run server
```

再開前端：
```bash
npm run dev
```

### 4. 建置檢查
```bash
npm run build
npm run lint
```

---

## 前台驗收流程

### A. 商品與購物車
1. 進入首頁或 `/shop`
2. 找到 `1 元測試花禮`（專門測付款流程用）
3. 將 `1 元測試花禮` 加入購物車
4. 前往 `/cart`
5. 確認可調整數量與移除商品

### B. 未登入不可結帳
1. 在未登入狀態下，從購物車點擊「前往結帳」
2. 預期結果：
   - 系統提示先登入會員
   - 不會直接進入完整結帳流程

### C. 會員登入後結帳
本作業會員登入為 mock 流程，可使用下列測試資料：
- Email：`member@bloomandgrace.tw`
- 密碼：`Aa123456`

步驟：
1. 開啟會員登入視窗
2. 輸入任一有效格式 Email 與密碼（建議直接用上方測試資料）
3. 登入成功後重新進入 `/checkout`
4. 確認可看到收件資料與訂單摘要

### D. 綠界付款流程
1. 在結帳頁填寫收件資料
2. 點擊送出後，應導向綠界測試付款頁
3. 使用綠界測試信用卡完成付款
4. 成功後返回本地前端 `/payment-result`
5. 前端會再透過本地 server 查詢綠界付款結果

---

## 綠界測試卡資訊
- 信用卡號：`4311-9522-2222-2222`
- 安全碼：任意 3 碼
- 有效年月：大於現在月份
- 3D 驗證簡訊：`1234`

資料來源：綠界測試介接資訊官方文件。

---

## 付款結果頁驗收重點
進入 `/payment-result?merchantTradeNo=...` 後，確認：
- 可看到 MerchantTradeNo
- 可看到付款狀態
- 可看到付款方式
- 可看到付款時間或查單回覆
- 若查單失敗，畫面會顯示可讀訊息

> 注意：本地端通常收不到 `ReturnURL` 的 server 通知，
> 本作業以回站後再由本地 server 呼叫 `QueryTradeInfo` 查單為主。

---

## Admin 驗收流程
1. 前往 `/admin`
2. 頁面上可直接看到測試帳號密碼
3. 使用頁面提供的帳密登入

預設測試帳密：
- Email：`admin@hexschool.com`
- Password：`12345678`

登入後預期可看到：
- 商品管理區
- 會員資料頁籤或後台示意內容

---

## 建議截圖紀錄
建議至少保留以下畫面：
- 商品列表頁
- 購物車頁
- 未登入被擋下的結帳提示
- 綠界付款成功頁
- 回站後的付款結果頁
- Admin 登入頁與後台頁
