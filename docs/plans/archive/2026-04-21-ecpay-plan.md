# 綠界金流串接計畫（已執行）

日期：2026-04-21
狀態：已完成並歸檔

## 目標
- 補齊 AI Agent 協作資料夾結構
- 在 React + Vite 專案中加入綠界測試付款流程
- 讓本地端可在付款後主動查單確認付款成功

## 執行步驟
1. 盤點現有專案結構
2. 建立 `AGENTS.md`、`docs/`、`.codex/config.toml`
3. 新增本地 Node server 處理：
   - 建立訂單
   - 產生 `CheckMacValue`
   - 接收 `OrderResultURL`
   - 呼叫 `QueryTradeInfo`
4. 重做前端首頁，加入：
   - 作業說明
   - 測試訂單表單
   - 查單結果畫面
5. 執行 build 驗證
6. 更新 README 與測試文件

## 實作結果
- 已建立 AI Agent 協作文檔
- 已建立 `.codex/config.toml`
- 已完成綠界測試環境付款導頁
- 已完成本地查單流程
- 已補上 README 使用說明

## 備註
- `ReturnURL` 在 localhost 環境通常不可直接收到，屬預期限制。
- 作業驗證方式改採 `OrderResultURL + QueryTradeInfo`。
