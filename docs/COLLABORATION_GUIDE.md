# COLLABORATION_GUIDE.md

## AI Agent 協作文件規範

這份文件專門說明本專案的 **主記憶文件** 與 **docs 延伸文件** 要怎麼分工，讓 Codex、Claude Code 或其他 Agent 工具在協作時有一致標準。

---

## 1. 主記憶文件定位

### 可用檔名
- `AGENTS.md`：給 Codex CLI 使用
- `CLAUDE.md`：給 Claude Code 使用

### 原則
- 主記憶文件是「入口索引」，不是完整規格書。
- 內容以：
  - 專案目標
  - 必讀文件
  - 關鍵規範摘要
  - 主要目錄說明
  - 開發流程
  為主。

### 行數限制
- 建議不超過 500 行
- 本次作業要求：**請控制在 100 行內**

### 不應放太多的內容
- 長篇架構說明
- 完整測試案例
- 所有功能細節
- 冗長範例程式碼

以上內容應改放 `docs/`。

---

## 2. docs/ 文件資料夾分工

### `docs/DEVELOPMENT.md`
用途：開發規範總表  
應包含：
- 命名規則
- var / function 風格
- 中文用語風格
- API / 錯誤處理模式
- 文件同步規則

### `docs/ARCHITECTURE.md`
用途：描述專案全貌  
應包含：
- 目錄結構
- 前後端分工
- 模組資料流
- API 呼叫流程

### `docs/FEATURES.md`
用途：列出目前功能狀態  
應包含：
- 已完成功能
- 功能目的
- 後續可擴充項目

### `docs/TESTING.md`
用途：測試與驗證說明  
應包含：
- 啟動方式
- build / lint 驗證
- 功能測試流程
- 金流測試資料與注意事項

### `docs/plans/`
用途：開發中的計畫文件  
應包含：
- 目標
- 步驟
- 驗證方式
- 預期結果

### `docs/plans/archive/`
用途：已完成計畫歸檔  
規則：
- 開發完成後移入 archive
- 保留執行結果與備註

---

## 3. 建議維護流程

1. 先更新主記憶文件摘要
2. 若需求較大，先在 `docs/plans/` 建立計畫
3. 開發時依照 `DEVELOPMENT.md` 與 `ARCHITECTURE.md`
4. 完工後更新 `FEATURES.md`、`TESTING.md`
5. 把計畫移到 `docs/plans/archive/`

---

## 4. 本專案實際採用方式

### 主記憶文件
- `AGENTS.md`
- `CLAUDE.md`

### 延伸文件
- `docs/COLLABORATION_GUIDE.md`
- `docs/DEVELOPMENT.md`
- `docs/ARCHITECTURE.md`
- `docs/FEATURES.md`
- `docs/TESTING.md`
- `docs/plans/archive/2026-04-21-ecpay-plan.md`

---

## 5. 給作業繳交的重點

如果是要符合這次作業要求，這套結構就很夠用了：

```text
AGENTS.md
CLAUDE.md
.codex/config.toml
docs/
  COLLABORATION_GUIDE.md
  DEVELOPMENT.md
  ARCHITECTURE.md
  FEATURES.md
  TESTING.md
  plans/
    archive/
```

這樣老師可以一眼看出：
- 你有主記憶文件
- 你有延伸文件分工
- 你有計畫與歸檔
- 你有工具設定檔
