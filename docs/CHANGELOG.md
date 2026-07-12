# CHANGELOG.md

## [Unreleased] - 2026-07-13

### Added
- 新增 `docs/README.md` 文件索引與快速開始說明。
- 新增付款結果頁的前台摘要字串、複製按鈕與原始 JSON 收合區文件描述。
- 新增 Checkout 測試信用卡提示與紅色提醒文字的文件描述。
- 新增 `docs/plans/2026-07-13-ecpay-doc-audit-plan.md` 作為本輪文件盤點計畫。

### Changed
- 將 `docs/ARCHITECTURE.md` 更新為目前實作：本地 Node server + JSON 檔持久化 + ECPay AIO 主動查單架構。
- 將 `docs/FEATURES.md` 更新為狀態總覽表，並補齊功能行為、業務邏輯與錯誤情境。
- 將 `docs/DEVELOPMENT.md` 更新為目前的金流開發規則與文件同步規範。
- 將 `docs/TESTING.md` 更新為老師可重現的驗收步驟，並明確說明 localhost 不以 `ReturnURL` 為主要成功依據。

### Fixed
- 修正文檔中仍把結帳流程寫成純 mock 或 SQLite 持久化的過時描述。
- 修正文檔中的會員測試帳密與目前登入頁顯示不一致的問題。

### Removed
- 移除文件中把進行中計畫視為唯一 active plan 的過時表述，改為以歸檔歷史與現況盤點為主。
