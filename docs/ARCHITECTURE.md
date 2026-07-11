# ARCHITECTURE.md

## 專案架構總覽

### 目錄分工
- `src/`
  - `App.jsx`：應用入口與主要路由流程
  - `components/`：可重用畫面元件
  - `lib/`：前端工具與 API 呼叫
  - `data/`：前端 mock 資料
- `public/`
  - 靜態圖片與品牌素材
- `server/`
  - `index.js`：本地 API server 入口
  - 其他模組：設定、資料存取、第三方串接
- `docs/`
  - 協作規範、架構、功能、測試、計畫
- `.codex/`
  - Codex CLI 專案設定集

## Agent 文件架構
- `AGENTS.md`：Codex 主要記憶入口
- `CLAUDE.md`：作業需求保留的輔助入口
- `docs/DEVELOPMENT.md`：開發規範
- `docs/FEATURES.md`：功能現況
- `docs/TESTING.md`：驗收流程
- `docs/plans/`：進行中計畫
- `docs/plans/archive/`：已完成計畫

## 資料流原則
### 前端
1. 使用者從頁面操作觸發事件。
2. 畫面元件整理資料後交給 `lib/`。
3. `lib/` 再決定呼叫 mock 資料或本地 API。

### 後端
1. `server/` 接收前端請求。
2. 由設定模組讀取環境變數與安全設定。
3. 回傳統一格式結果給前端。

## 模組邊界
- 畫面排版放在 `components/`。
- 業務流程與請求處理放在 `lib/` 或 `server/`。
- 不把第三方金鑰、敏感邏輯放到前端。
- 文件規範集中在 `docs/`，不要把長篇規則塞回主記憶檔。

## 維護原則
- 優先保留既有資料夾結構。
- 擴充功能時先找對放置位置，再新增檔案。
- 大改流程前，先在 `docs/plans/` 留下計畫。
