# FEATURES.md

## 功能狀態總覽
| 功能 | 狀態 | 說明 |
|---|---|---|
| 商品列表 / 搜尋 / 分類 | ✅ 完成 | 可從前台查看商品、分類切換與搜尋 |
| 商品詳情頁 | ✅ 完成 | 可查看商品資訊、價格與相似商品 |
| 購物車 | ✅ 完成 | 可增減數量、刪除品項、查看總額 |
| 會員登入後才能結帳 | ✅ 完成 | 未登入使用者會被擋在 `/checkout` 外 |
| 會員登入 / 註冊 UI | ✅ 完成 | 為 mock 流程，但可驅動會員態切換 |
| Admin 後台登入 / 商品管理 / 會員資料示意 | ✅ 完成 | 提供老師驗收後台入口與示意資料 |
| ECPay 建立訂單 | ✅ 完成 | 本地 server 可產生 AIO 參數與 `CheckMacValue` |
| ECPay 回站後主動查單 | ✅ 完成 | 符合本地端無法靠 Server Notify 驗證的課程要求 |
| 付款結果頁摘要 UI | ✅ 完成 | 顯示付款摘要、複製按鈕與原始 JSON 收合區 |
| 正式會員系統 / 正式訂單後台 | 🚧 進行中 | 目前仍為作業 / MVP 版，未接真實商業流程 |

## 1. 商品瀏覽與購物流程
### 行為描述
- 使用者可從首頁、商品列表頁與商品詳情頁加入商品到購物車。
- 商品需具備：`image`、`originalPrice`、`memberPrice`、`category`、`description`。
- 購物車會即時計算原價、會員價與差額。

### 查詢與篩選
- `GET /api/products?category=<category>&search=<keyword>`
- `category=all` 時顯示全部商品。
- `search` 會比對商品名稱、描述與 tag。

### 錯誤情境
- 若本地 server 沒有啟動，前端會 fallback 到 `src/data/products.js` 的內建資料，並提示目前使用前端資料。

## 2. 會員登入與結帳門檻
### 行為描述
- `/checkout` 僅限會員進入。
- 若使用者未登入就從購物車點「前往結帳」，會收到提示並導向 `/sign-in`。
- `SignInPage` 目前是 mock 登入，只要帳號密碼欄位有填值即可切換成會員狀態。
- 頁面仍提供建議測試帳密文案：`member@flower.tw / Flower1234`，方便老師操作，但**不是後端真實驗證帳密**。

### 錯誤情境
- 帳號或密碼空白：顯示「請輸入電子郵件與密碼」。
- 重設密碼與註冊流程會檢查密碼長度、大寫英文字母與數字。

## 3. Admin 後台驗收入口
### 行為描述
- `/admin` 提供獨立登入頁。
- `AdminLoginPage` 會比對 `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD`；若未設，使用 fallback。
- 登入成功後可查看商品管理與會員資料示意頁。

### 測試方式
- 建議以 `.env` 中的：`admin@hexschool.com / 12345678` 驗收。
- 若未載入 `.env`，程式 fallback 為 `admin@flower.tw / 12345678`。
- 因此**最安全的驗收方式是直接以畫面顯示或 `.env` 實際值為準**。

### 錯誤情境
- 帳密錯誤：顯示「管理員帳號或密碼不正確，請直接使用頁面提供的測試帳密。」

## 4. ECPay AIO 本地建單
### 行為描述
- 前端 `CheckoutPage` 會蒐集：
  - 收件人姓名
  - 聯絡電話
  - 電子郵件
  - 配送方式與地址
  - 發票類型與附加欄位
- 送出後呼叫 `POST /api/ecpay/create-order`。
- server 會建立：
  - `MerchantTradeNo`
  - `MerchantTradeDate`
  - `ReturnURL`
  - `OrderResultURL`
  - `ChoosePayment=Credit`
  - `CheckMacValue`
- 前端收到資料後，用隱藏表單送往綠界付款頁。

### 業務邏輯
- `MerchantTradeDate` 使用台灣時區格式化。
- `ItemName` 先經過字元過濾與長度限制，避免 CheckMacValue 問題。
- 訂單送出前會先寫入 `server/data/ecpay-orders.json`。

### 錯誤情境
- server 未啟動：前端顯示「本地付款服務目前連不上，請先啟動 server」。
- `merchantTradeNo` 缺失或 server 500：前端顯示 API 回傳的 `message`。

## 5. 本地回站後主動查單驗證
### 行為描述
- 綠界付款完成後，瀏覽器會回到 `/api/ecpay/order-result`。
- server 驗證 `CheckMacValue` 後，轉址到 `/payment-result?merchantTradeNo=...`。
- `PaymentResultPage` 一載入就會呼叫 `POST /api/ecpay/query`。
- server 主動呼叫 ECPay `QueryTradeInfo`，整理出：
  - `tradeStatus`
  - `paymentType`
  - `paymentDate`
  - `tradeNo`
  - `tradeAmt`
  - `parsed` 原始欄位摘要
- 前台以 `tradeStatus === '1'` 判定付款成功。

### 為什麼這樣做
- 因為本專案僅跑在 localhost，無法保證綠界可直接打到 `ReturnURL`。
- 這個做法正是老師題目要求的「由本地端主動查詢 API 驗證付款結果」。

### 錯誤情境
- `merchantTradeNo` 缺失：回傳 400。
- 綠界查單失敗或網路失敗：付款結果頁顯示可讀錯誤訊息。
- `ReturnURL` 在 localhost 沒收到：不視為失敗，只要前端回站查單成功即可。

## 6. 付款結果頁 UI
### 行為描述
- 付款結果頁會顯示：
  - 商店訂單編號
  - 綠界付款流水號
  - 付款方式（中文化）
  - 付款金額
  - 付款時間
  - 訂購人
  - 商品內容
  - 前台回傳摘要字串
- 目前摘要字串格式例如：
  - `付款成功｜暮色花瓣花束 x1｜一卡通 iPASS｜NT$ 98`
- 支援複製摘要與編號，原始查單 JSON 採 `<details>` 收合。

### 錯誤情境
- 缺少 query string：顯示找不到付款結果。
- 查單失敗：提供重新查詢按鈕與回購物袋按鈕。

## 7. 結帳提醒與測試資料顯示
### 行為描述
- Checkout 頁「結帳提醒」旁會顯示紅色小字測試卡提示。
- 付款前提醒區塊也有測試卡資訊，讓老師可以直接照著操作。

### 測試資料
- 測試信用卡：`4311-9522-2222-2222`
- 到期年月：任意未來日期
- 安全碼：任意 3 碼
- 3D 驗證碼：`1234`
