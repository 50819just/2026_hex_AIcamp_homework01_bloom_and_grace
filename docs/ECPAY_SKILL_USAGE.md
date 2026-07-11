# ECPAY_SKILL_USAGE.md

## 目的
這份文件說明本專案如何使用 `.ecpay-skill/` 內的綠界 AI Skill，協助處理金流串接、查單、除錯與正式環境切換。

## 安裝位置
- 專案層級安裝於：`.ecpay-skill/`
- Codex CLI 入口：`AGENTS.md` 內的 `ECPay API Skill` 區段

## 這個 Skill 是什麼
- 這不是 SDK，也不是付款服務本身。
- 它是綠界官方維護的 AI 知識套件，提供：
  - AIO 金流方案判斷
  - CheckMacValue / AES 加解密參考
  - API 錯誤碼與除錯指引
  - 測試環境到正式環境的切換指南

## 本專案最常用的檔案
- `.ecpay-skill/AGENTS.md`
  - Codex CLI 專用入口
- `.ecpay-skill/guides/01-payment-aio.md`
  - 導轉式 AIO 金流
- `.ecpay-skill/guides/13-checkmacvalue.md`
  - CheckMacValue 驗證
- `.ecpay-skill/guides/15-troubleshooting.md`
  - 常見除錯
- `.ecpay-skill/guides/16-go-live-checklist.md`
  - 正式上線前檢查
- `.ecpay-skill/guides/20-error-codes-reference.md`
  - 錯誤碼對照

## 本專案對應位置
### 前端
- `src/pages/CheckoutPage.jsx`
  - 建立訂單後導向綠界付款頁
- `src/pages/PaymentResultPage.jsx`
  - 回站後顯示付款結果並重新查單
- `src/lib/api.js`
  - 呼叫本地 server 的建立訂單 / 查單 API

### 後端
- `server/ecpay.js`
  - 綠界參數、簽章、查單邏輯
- `server/index.js`
  - `/api/ecpay/create-order`
  - `/api/ecpay/query`
  - `/api/ecpay/order-result`
  - `/api/ecpay/return`
- `server/config.js`
  - 綠界環境變數設定

## 建議使用情境
### 1. 查串接方式
範例問法：
- 請依照這個專案目前的 Node server 架構，檢查 AIO 金流串接是否完整。
- 請比對 `server/ecpay.js` 與 `.ecpay-skill/guides/01-payment-aio.md`，找出缺漏。

### 2. 查 CheckMacValue / 查單錯誤
範例問法：
- 這個專案的綠界查單流程失敗，請依 `.ecpay-skill/guides/13-checkmacvalue.md` 與 `15-troubleshooting.md` 協助排查。
- 請檢查 `MerchantTradeNo`、HashKey、HashIV、TradeStatus 判斷是否正確。

### 3. 從測試切到正式
範例問法：
- 請根據 `.ecpay-skill/guides/16-go-live-checklist.md`，列出這個專案從測試環境切到正式環境要改哪些地方。
- 請檢查 `.env`、`server/config.js`、回傳網址與部署需求。

## 使用原則
- 本專案仍以自己的 `docs/` 與現有實作為主。
- `.ecpay-skill/` 是綠界專門知識庫，不取代專案本身架構。
- 若 Skill 與本專案 spec 衝突，以本專案需求與驗收流程為優先，再人工判斷是否調整。

## 維護方式
若要更新 Skill：
```bash
cd .ecpay-skill
git pull origin master
```

## 注意事項
- 不要把正式 `MerchantID`、`HashKey`、`HashIV` 寫進 skill 文件。
- 正式金鑰只放在 `.env` 或部署平台的 secrets。
- 本專案目前仍以作業版驗收流程為主，並非正式商業站。
