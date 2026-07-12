# docs/README.md

## 文件索引
`docs/` 主要給未來維護者、助教與老師快速理解這個專案目前做到哪裡、怎麼驗證，以及哪些部分仍是 mock。

### 建議閱讀順序
1. `docs/FEATURES.md`：先看目前功能完成度與已知限制
2. `docs/ARCHITECTURE.md`：再看路由、API、資料流與檔案儲存位置
3. `docs/TESTING.md`：最後依驗收步驟操作
4. `docs/DEVELOPMENT.md`：若要繼續開發，再看命名與同步文件規則
5. `docs/CHANGELOG.md`：追蹤最近更新

## 技術棧
- 前端：React 19 + Vite 8
- 本地 API Server：Node.js 原生 `http` 模組
- 資料儲存：`server/data/*.json`
- 金流：ECPay AIO 測試環境
- 文件 / 協作：Codex-first，搭配 `AGENTS.md`、`CLAUDE.md`、`.ecpay-skill/`

## 快速開始
### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動前端與本地 server
```bash
npm run server
npm run dev
```

或一起啟動：
```bash
npm run dev:all
```

### 3. 基本驗證
```bash
npm run build
npm run lint
```

> `package.json` 目前沒有 `typecheck` script，驗收時要明確註記。

## 本專案的綠界重點
- 專案只在本地端運行，**不能把 localhost 的 `ReturnURL` 當作主要成功依據**。
- 付款成功確認流程採用：
  1. 前端建立訂單
  2. 導向綠界測試付款頁
  3. 綠界瀏覽器回站到 `OrderResultURL`
  4. 前端進入 `/payment-result`
  5. 本地 server 主動呼叫 `QueryTradeInfo` 查單
- 這個架構符合課程要求：「本地端主動查單驗證付款結果」。

## 文件對照
- `ARCHITECTURE.md`：架構、路由、資料流、JSON 資料 schema
- `DEVELOPMENT.md`：開發規範與文件同步規則
- `FEATURES.md`：功能狀態表與行為描述
- `TESTING.md`：老師 / 助教驗收流程
- `CHANGELOG.md`：本輪更新摘要
- `plans/`：計畫草稿與歷史歸檔
