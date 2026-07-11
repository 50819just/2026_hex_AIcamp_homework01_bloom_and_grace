# DEVELOPMENT.md

## 開發規範

### 1. 技術基礎
- 前端使用 React + Vite。
- 本地 API server 使用 Node.js 原生模組，避免不必要依賴。
- 設定集以 Codex CLI 為主，主要入口為 `AGENTS.md` 與 `.codex/config.toml`。

### 2. 命名規則
- React 元件：`PascalCase`
- 一般函式、變數：`camelCase`
- 常數：`UPPER_SNAKE_CASE`
- 元件檔名：`PascalCase.jsx`
- 工具函式檔名：`camelCase.js`

### 3. 程式風格
- 優先小型、可重用元件。
- 不把整個畫面塞進單一檔案。
- 既有結構可延用時，先做最小修改。
- Mock 資料與畫面元件分開管理。

### 4. UI 與文案
- 前台可見文字使用繁體中文。
- 按鈕文案要直接清楚，例如：`加入購物車`、`前往結帳`。
- 提示訊息要可理解，不只丟錯誤碼。

### 5. 錯誤處理
- 後端 API 回傳格式盡量統一：
```json
{
  "success": false,
  "message": "可讀取的錯誤訊息"
}
```
- 前端請優先顯示 `message`，沒有時再用預設訊息。
- 失敗狀態要區分：資料錯誤、請求失敗、查詢失敗，不要全部混成同一句。

### 6. 文件同步
- 新增功能或改流程時，同步更新：
  - `docs/FEATURES.md`
  - `docs/ARCHITECTURE.md`
  - `docs/TESTING.md`
- 新計畫先放 `docs/plans/`，完成後再移到 `docs/plans/archive/`。

### 7. 驗證標準
- 完成前至少確認：
  - `npm run build`
  - `npm run lint`（若有）
  - `npm run typecheck`（若有）
- 回報時要說清楚哪些是完成項、哪些仍是 mock。
