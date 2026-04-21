# DEVELOPMENT.md

## 開發規範

### 1. 技術基礎
- 前端使用 React + Vite。
- 本地 API server 使用 Node.js 原生模組，避免額外依賴。
- 不在前端保存任何綠界金鑰。

### 2. 命名規則
- React 元件：`PascalCase`
- 一般函式、變數：`camelCase`
- 常數：`UPPER_SNAKE_CASE`
- 檔名：
  - 元件檔：`PascalCase.jsx`
  - 工具函式：`camelCase.js`

### 3. UI 與文案
- 使用繁體中文。
- 按鈕文案要直接，例如：`建立測試訂單`、`查詢付款結果`。
- 狀態提示要讓使用者看得懂，不只顯示錯誤碼。

### 4. 錯誤處理
- 後端 API 回傳格式固定：
```json
{
  "success": false,
  "message": "可讀取的錯誤訊息"
}
```
- 前端 fetch 失敗時，要顯示 `message`，沒有時顯示預設訊息。
- 金流查單失敗時，不要假設付款失敗，要顯示「查詢失敗」。

### 5. 金流規範
- `CheckMacValue` 一律在 server 端計算。
- 訂單編號需唯一，長度不得超過綠界限制。
- `TradeDesc`、`ItemName` 避免特殊字元。
- 付款成功與否，以查單結果為準，不只看前端跳轉。

### 6. 文件同步
- 新增功能時，同步更新：
  - `docs/FEATURES.md`
  - `docs/ARCHITECTURE.md`
  - `docs/TESTING.md`
- 完成計畫後，將計畫文件移到 `docs/plans/archive/`。

### 7. 驗證標準
- 至少可執行：
  - `npm run build`
  - `npm run server`
- 若是金流流程：
  - 可建立訂單
  - 可跳轉綠界付款頁
  - 付款後可從本地端查單確認結果
