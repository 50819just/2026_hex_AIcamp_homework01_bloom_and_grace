# ARCHITECTURE.md

## 專案架構總覽

### 目錄
- `src/`
  - `App.jsx`：主畫面與流程控制
  - `components/`：畫面區塊元件
  - `lib/`：前端 API 呼叫與格式化工具
- `server/`
  - `index.js`：本地 API server 入口
  - `config.js`：環境變數與預設設定
  - `ecpay.js`：綠界參數、簽章、查單工具
- `docs/`
  - 規範、架構、功能、測試、計畫文件

## 資料流

### 建立訂單
1. 前端送出訂單資料到 `/api/ecpay/create-order`
2. server 組出綠界參數與 `CheckMacValue`
3. 前端收到參數後，以 HTML form POST 到綠界付款頁

### 付款完成
1. 使用者在綠界付款
2. 綠界瀏覽器端回送到 `OrderResultURL`
3. 本地 server 接收結果後，轉址回前端 `payment-result` 畫面
4. 前端再呼叫 `/api/ecpay/query` 做正式查單

### Server 端通知
- `ReturnURL` 保留路由供未來公開環境使用。
- 因本地端通常無法被綠界主機直接打到，所以本作業不以它當作成功依據。

## 為什麼要有本地 server
- 綠界金鑰不能放前端。
- `CheckMacValue` 必須由 server 計算。
- `QueryTradeInfo` 需由 server 送出，避免金鑰外流。

## 部署思路
- 本地開發：
  - 前端：`5173`
  - server：`3000`
- 若部署到公開主機，只要把：
  - `APP_BASE_URL`
  - `FRONTEND_BASE_URL`
  - `ECPAY_*`
  改成正式值即可。
