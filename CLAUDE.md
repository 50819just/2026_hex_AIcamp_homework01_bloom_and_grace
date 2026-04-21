# CLAUDE.md

## 專案目的
- 本專案為 AI 開發進化營第一場作業。
- 需完成：
  1. AI Agent 協作資料夾整理
  2. 綠界金流測試流程實作

## 閱讀順序
1. `docs/COLLABORATION_GUIDE.md`
2. `docs/DEVELOPMENT.md`
3. `docs/ARCHITECTURE.md`
4. `docs/FEATURES.md`
5. `docs/TESTING.md`

## 主記憶文件原則
- 本檔控制在 100 行內。
- 只保留高頻、必要、跨任務都會用到的資訊。
- 延伸細節放在 `docs/`，避免主記憶文件膨脹。

## Agent 工作規則
- 修改前先確認現有功能，避免重複開發。
- 新功能或大改動先寫計畫到 `docs/plans/`。
- 完成後需把計畫歸檔到 `docs/plans/archive/`。
- 更新功能時同步維護相關文件。

## 程式規範摘要
- 元件：`PascalCase`
- 函式 / 變數：`camelCase`
- UI 文案：繁體中文
- API 錯誤：回傳可讀訊息
- 綠界金鑰：不得放在前端

## 關鍵路徑
- `src/`：前端
- `server/`：本地 API server
- `docs/`：延伸文件
- `.codex/`：Codex CLI 設定

## 綠界金流摘要
- 使用測試環境串接。
- 本地端通常收不到 `ReturnURL`。
- 作業驗證流程以：
  - `OrderResultURL`
  - `QueryTradeInfo`
  為主。

## 完成前檢查
- 主記憶文件維持精簡
- docs 檔案各自不超過 500 行
- build 可成功
- 計畫文件已歸檔
