# FEATURES.md

## 目前功能狀態

### 1. AI Agent 協作結構
- 已建立 `AGENTS.md` 作為 Codex 主記憶入口。
- 已保留 `CLAUDE.md` 作為作業要求中的輔助記憶文件。
- 已建立 `.codex/config.toml` 管理 docs 與 plans 路徑。
- 已建立 `docs/plans/archive/` 保存已完成計畫。

### 2. 文件化規範
- 已有 `docs/DEVELOPMENT.md`：開發規範
- 已有 `docs/ARCHITECTURE.md`：專案架構
- 已有 `docs/FEATURES.md`：功能現況
- 已有 `docs/TESTING.md`：驗收與測試流程
- 已有 `docs/plans/README.md`：計畫流程說明

### 3. LV2 Plan Mode 狀態
- 目前進行中的 LV2 計畫：`docs/plans/2026-07-12-ecpay-lv2-plan.md`
- 此計畫用來追蹤綠界金流串接、付款回站查單與文件同步更新。
- 功能完成後，需將該計畫移到 `docs/plans/archive/`。

### 4. 前端與本地 API 能力
- 具備 React + Vite 前端專案結構。
- 已有購物車、結帳頁、付款結果頁與 Admin 頁面骨架。
- 已有本地 API server、建立綠界訂單 API、綠界查單 API 與訂單資料儲存。

### 5. 目前已知缺口
- 尚未確認綠界流程是否已完整通過本輪 build 與實機驗證。
- localhost 仍需依賴前端回站後查單，不可只看跳轉畫面。
- `docs/TESTING.md` 內的驗收資料需作為老師測試主入口持續維護。

## 後續更新規則
- 新增功能時，要同步更新本檔對應段落。
- 若功能仍是 mock，需明確標示，不要寫成已正式完成。
- 若流程有重大變更，請同步更新 `docs/ARCHITECTURE.md` 與 `docs/TESTING.md`。
