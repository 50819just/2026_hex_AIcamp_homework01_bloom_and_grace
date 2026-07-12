# ARCHITECTURE.md

## 專案架構總覽

### 目錄分工
| 路徑 | 用途 |
|---|---|
| `src/` | React 前端頁面、元件、路由與 UI 邏輯 |
| `src/lib/` | API 呼叫、格式化、綠界表單送出工具 |
| `src/data/` | 前端 fallback / reference 資料 |
| `public/` | 靜態圖片與品牌素材 |
| `server/` | 本地 API server、綠界建單 / 查單、JSON 資料讀寫 |
| `server/data/` | `products.json`、`members.json`、`ecpay-orders.json` |
| `docs/` | 架構、功能、測試與計畫文件 |
| `.ecpay-skill/` | 綠界官方 skill 與整合指南 |

## 前端頁面路由
| 路由 | 頁面 | 說明 |
|---|---|---|
| `/` | `HomePage` | 首頁、品牌介紹、商品入口 |
| `/shop` | `ShopPage` | 商品列表、分類、搜尋 |
| `/products/:id` | `ProductDetailPage` | 商品詳情與加入購物車 |
| `/cart` | `CartPage` | 購物車與結帳入口 |
| `/checkout` | `CheckoutPage` | 會員限定結帳頁，建立綠界訂單 |
| `/payment-result` | `PaymentResultPage` | 回站後顯示付款摘要，並主動查單 |
| `/sign-in` | `SignInPage` | 會員登入 / 註冊 / 重設密碼示意 |
| `/profile` | `ProfilePage` | 會員資料頁 |
| `/about` | `AboutPage` | 品牌故事 |
| `/admin` | `AdminLoginPage` / `AdminPage` | 管理後台登入與示意管理頁 |

## REST API 路由
| 方法 | 路徑 | 說明 |
|---|---|---|
| GET | `/api/health` | 檢查 server 是否啟動，並回報目前 storage mode |
| GET | `/api/products` | 取得商品列表，可用 `category` / `search` 篩選 |
| GET | `/api/admin/products` | 取得後台商品列表 |
| POST | `/api/admin/products` | 新增商品 |
| PUT | `/api/admin/products/:id` | 更新商品 |
| DELETE | `/api/admin/products/:id` | 刪除商品 |
| GET | `/api/member/profile` | 依 email 取得會員資料 |
| GET | `/api/admin/members` | 後台會員列表搜尋 |
| POST | `/api/ecpay/create-order` | 建立綠界 AIO 訂單與 `CheckMacValue` |
| POST | `/api/ecpay/query` | 前端回站後主動查詢 `QueryTradeInfo` |
| GET | `/api/ecpay/orders/:merchantTradeNo` | 讀取本地保存的綠界訂單紀錄 |
| POST | `/api/ecpay/order-result` | 接收瀏覽器端回站結果，驗證 `CheckMacValue` 後導向前台結果頁 |
| POST | `/api/ecpay/return` | 保留綠界 Server Notify 路由，localhost 不作為主要成功依據 |

## 本地金流資料流
### 1. 建立訂單
1. 使用者在 `/checkout` 填寫收件與發票資訊。
2. 前端呼叫 `/api/ecpay/create-order`。
3. `server/ecpay.js` 產生：
   - `MerchantTradeNo`
   - `MerchantTradeDate`（台灣時區）
   - `CheckMacValue`
4. 訂單先寫入 `server/data/ecpay-orders.json`。
5. 前端以隱藏表單 POST 導向綠界測試付款頁。

### 2. 回站與付款確認
1. 使用者在綠界付款頁完成付款。
2. 綠界瀏覽器回站到 `OrderResultURL`：`/api/ecpay/order-result`。
3. server 驗證 `CheckMacValue` 後，303 轉址到 `/payment-result?merchantTradeNo=...`。
4. `PaymentResultPage` 進頁後呼叫 `/api/ecpay/query`。
5. server 主動呼叫綠界 `QueryTradeInfo`，回傳整理過的付款資料。
6. 前台以 `tradeStatus === '1'` 為主判斷付款成功，並顯示付款摘要字串。

### 3. 為什麼不靠 `ReturnURL`
- `.ecpay-skill/guides/01-payment-aio.md` 明確指出 localhost 無法被綠界主機直接回呼。
- 因此本專案把 `ReturnURL` 視為保留路由，不把它當成老師驗收時的唯一依據。
- **真正驗收重點是前端回站後，由本地 server 主動查單。**

## 主要模組
| 檔案 | 責任 |
|---|---|
| `server/config.js` | 讀取 `.env` / 環境變數 |
| `server/ecpay.js` | 綠界 AIO 參數、`CheckMacValue`、`QueryTradeInfo` |
| `server/ecpayOrderStore.js` | 綠界訂單 JSON 持久化 |
| `server/fileStore.js` | JSON 檔讀寫工具 |
| `src/lib/api.js` | 前端對本地 server 的 API 呼叫 |
| `src/lib/ecpay.js` | 自動建立並送出綠界表單 |
| `src/pages/CheckoutPage.jsx` | 建單 UI、結帳提醒、測試卡提示 |
| `src/pages/PaymentResultPage.jsx` | 查單摘要、複製按鈕、原始 JSON 展開區 |

## JSON 資料 Schema
### `server/data/products.json`
| 欄位 | 型別 | 說明 |
|---|---|---|
| `id` | string | 商品唯一 ID |
| `name` | string | 商品名稱 |
| `category` | string | 類別，如 `orchid`、`basket` |
| `image` | string | 商品圖片路徑 |
| `originalPrice` | number | 原價 |
| `memberPrice` | number | 會員價 |
| `description` | string | 商品描述 |
| `tag` | string | 標籤 |
| `createdAt` / `updatedAt` | string | ISO 時間 |

### `server/data/members.json`
| 欄位 | 型別 | 說明 |
|---|---|---|
| `id` | string | 會員 ID |
| `name` / `email` / `phone` | string | 基本資料 |
| `level` | string | 會員等級 |
| `joinedAt` / `birthday` | string | 日期資料 |
| `favoriteCategories` | string[] | 偏好類別 |
| `stats` | object | 購物車數量、常用收件人、年度訂單等摘要 |
| `addresses` | object[] | 常用地址 |
| `orders` | object[] | 訂單示意資料 |

### `server/data/ecpay-orders.json`
| 欄位 | 型別 | 說明 |
|---|---|---|
| `merchantTradeNo` | string | 商店訂單編號 |
| `orderInput` | object | 前端送入的原始結帳資料 |
| `checkoutFields` | object | 送往綠界的表單欄位 |
| `browserReturnResult` | object \| null | `OrderResultURL` 回站資料 |
| `returnNotifyResult` | object \| null | `ReturnURL` 伺服器通知資料 |
| `queryResult` | object \| null | `QueryTradeInfo` 整理後結果 |
| `paymentStatus` | `created` \| `pending` \| `paid` | 本地付款狀態 |
| `browserCallbackVerified` | boolean | `OrderResultURL` 驗簽是否通過 |
| `returnCallbackVerified` | boolean | `ReturnURL` 驗簽是否通過 |
| `createdAt` / `updatedAt` | string | ISO 時間 |
| `browserReturnedAt` / `returnNotifiedAt` / `lastQueriedAt` | string \| null | 事件時間 |

## 目前架構限制
- server 使用 Node 原生 `http`，不是 Express。
- 金流只支援 ECPay AIO 測試環境。
- 會員登入仍是 mock，沒有真實驗證 API。
- GitHub Pages 只能展示前端，**無法單獨完成本地綠界查單流程**。
