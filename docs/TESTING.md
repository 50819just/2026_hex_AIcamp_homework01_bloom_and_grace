# TESTING.md

## 驗收目標
本檔用來確認兩件事：
1. AI Agent 協作資料夾是否整理完成
2. 專案功能是否可正常建置與基本驗證

## A. 協作資料夾驗收

### 1. 主要記憶文件
請確認以下檔案存在，且內容維持精簡：
- `AGENTS.md`
- `CLAUDE.md`

檢查重點：
- 主記憶文件控制在 100 行內
- 內容只放高頻規則與入口資訊
- 延伸內容導向 `docs/`

### 2. 文件資料夾
請確認以下檔案存在：
- `docs/DEVELOPMENT.md`
- `docs/ARCHITECTURE.md`
- `docs/FEATURES.md`
- `docs/TESTING.md`
- `docs/plans/README.md`
- `docs/plans/2026-07-12-ecpay-lv2-plan.md`
- `docs/plans/archive/`

檢查重點：
- 每份文件不超過 500 行
- 文件職責清楚，不互相混寫
- LV2 active plan 存在且可追蹤
- 計畫完成後有歸檔紀錄

### 3. Codex 設定集
請確認以下檔案存在：
- `.codex/config.toml`

檢查重點：
- 有指定 `AGENTS.md` 作為主記憶入口
- 有設定 `docs`、`plans`、`plan_archive` 路徑
- 設定內容與實際資料夾一致

## B. LV2 綠界驗收資料

### 1. 參考計畫檔
- `docs/plans/2026-07-12-ecpay-lv2-plan.md`

### 2. 測試帳號密碼
#### 會員測試帳密
- Email：`member@bloomandgrace.tw`
- Password：`Aa123456`

#### Admin 驗收帳密
- Email：`admin@hexschool.com`
- Password：`12345678`

### 3. 綠界測試卡資訊
- 綠界測試卡：`4311-9522-2222-2222`
- 有效年月：任意未來日期
- 安全碼：任意 3 碼
- 3D 驗證：`1234`

## C. 專案基本驗證

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動開發環境
```bash
npm run dev
```

若專案有本地 API server，也可另外啟動：
```bash
npm run server
```

### 3. 建置與靜態檢查
```bash
npm run build
npm run lint
```

若專案提供 typecheck，再補跑：
```bash
npm run typecheck
```

## D. 綠界流程驗收
1. 啟動前端與本地 server。
2. 從商品頁或購物袋進入結帳頁。
3. 填寫收件人資料並送出訂單。
4. 確認頁面有導向綠界測試付款頁。
5. 使用上方測試卡完成付款。
6. 付款完成後確認已回到前端結果頁。
7. 確認前端會透過本地 server 查單，而不是只顯示跳轉成功。
8. 若查單失敗，應顯示可理解的錯誤訊息。

## E. 目前人工檢查缺口
- 是否所有必要環境變數都已在 `.env` 設定完成。
- 是否已實際驗證 `merchantTradeNo` 能在結果頁查到資料。
- 是否已完成本輪 build / lint 驗證。
- 若付款結果只顯示回站訊息但無查單成功，不能直接當作完成。

## F. 文件同步驗證
當新增功能或調整流程後，請確認：
- `docs/FEATURES.md` 已更新功能狀態
- `docs/ARCHITECTURE.md` 已更新結構或資料流
- `docs/TESTING.md` 已更新驗收步驟
- 若有計畫檔，完成後已移到 `docs/plans/archive/`

## G. 建議回報格式
完成後建議至少回報：
- 本次修改檔案
- 是否通過 build
- 是否通過 lint
- 是否有 typecheck
- 哪些內容仍為 mock
- 哪份計畫已歸檔
