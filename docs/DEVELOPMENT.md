# DEVELOPMENT.md

## 開發規範

### 1. 技術基礎
- 前端使用 React + Vite。
- 本地 API server 使用 Node.js 原生模組，避免引入額外框架。
- 綠界相關知識優先參考 `.ecpay-skill/AGENTS.md`、`SKILL.md` 與對應 guides。
- 本專案目前資料持久化使用 `server/data/*.json`，不是正式資料庫。

### 2. 命名規則
- React 元件：`PascalCase`
- 一般函式、變數：`camelCase`
- 常數：`UPPER_SNAKE_CASE`
- 元件檔名：`PascalCase.jsx`
- 工具函式檔名：`camelCase.js`

### 3. 程式風格
- 優先小型、可重用元件。
- 保留既有結構，避免把整個 UI 收斂成單一檔案。
- 有畫面邏輯的內容放 `src/pages/` 或 `src/components/`。
- 與第三方服務相關邏輯集中在 `server/` 或 `src/lib/`。

### 4. 金流開發規則
- 不可把 `MerchantID`、`HashKey`、`HashIV` 寫進前端程式碼。
- `CheckMacValue` 只能由 server 產生與驗證。
- localhost 環境不得把 `ReturnURL` 當作付款完成唯一依據。
- 若流程與課程題目相關，預設採「前端回站後主動查單」架構。
- 回應 `ReturnURL` 時需維持精確字串 `1|OK`。

### 5. API 與錯誤處理
後端 API 盡量統一回傳：
```json
{
  "success": false,
  "message": "可讀取的錯誤訊息"
}
```

前端規則：
- 優先顯示 server 傳回的 `message`
- 金流 API 與一般資料 API 的錯誤訊息要分流
- 當 server 未啟動時，要給使用者「請先啟動 server」這種可操作提示

### 6. 文件同步規則
每次新增或修改以下內容，都要同步檢查文件：
- 新頁面 / 新路由 → 更新 `docs/ARCHITECTURE.md`
- 新 API / 新流程 → 更新 `docs/ARCHITECTURE.md`、`docs/FEATURES.md`
- 測試帳密 / 測試卡 / 驗收順序改動 → 更新 `docs/TESTING.md`
- 本輪改動摘要 → 更新 `docs/CHANGELOG.md`
- 有明確任務拆解 → 先建立 `docs/plans/YYYY-MM-DD-<topic>-plan.md`，完成後移到 `docs/plans/archive/`

### 7. 驗證標準
完成前至少確認：
- `npm run build`
- `npm run lint`
- `npm run typecheck`（若未提供 script，要在回報與文件註明）

### 8. 不要誤寫成正式能力
以下內容若尚未完成，文件需明確標示：
- 真實會員驗證
- 正式訂單管理後台
- 發票 / 退款 / 出貨 / 通知
- GitHub Pages 上的完整金流驗收
