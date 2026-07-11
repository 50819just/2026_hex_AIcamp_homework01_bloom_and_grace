# CLAUDE.md

## 專案目的
- 本專案為花店電商作業專案。
- 本輪重點包含：
  1. AI Agent 協作資料夾整理
  2. 前後端功能維護與文件同步

## 使用定位
- 本檔保留作為作業要求中的主要記憶文件之一。
- 本專案實際協作設定以 `AGENTS.md` 與 `.codex/config.toml` 為主。
- 不另外建立 `.claude/` 設定集。

## 閱讀順序
1. `AGENTS.md`
2. `docs/DEVELOPMENT.md`
3. `docs/ARCHITECTURE.md`
4. `docs/FEATURES.md`
5. `docs/TESTING.md`
6. `docs/plans/README.md`

## 主記憶文件原則
- 控制在 100 行內。
- 只保留高頻、必要、跨任務都會用到的資訊。
- 細節放在 `docs/`，避免主記憶文件膨脹。

## Agent 工作規則
- 修改前先確認現有功能與文件狀態。
- 新功能或大改動先在 `docs/plans/` 建立計畫。
- 完成後將計畫移到 `docs/plans/archive/`。
- 功能或流程變更時同步更新相關文件。

## 程式規範摘要
- 元件：`PascalCase`
- 函式 / 變數：`camelCase`
- 常數：`UPPER_SNAKE_CASE`
- UI 文案：繁體中文
- API 錯誤：回傳可讀訊息

## 關鍵路徑
- `src/`：前端畫面與互動
- `server/`：本地 API server
- `docs/`：規範、架構、功能、測試、計畫
- `.codex/`：Codex CLI 設定集

## 完成前檢查
- 主記憶文件維持精簡
- docs 檔案各自不超過 500 行
- build 可成功
- 計畫文件已歸檔
