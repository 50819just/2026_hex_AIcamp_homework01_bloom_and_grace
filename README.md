# Bloom & Grace 花店電商網站 MVP

這是一個單一品牌花店的前端電商 MVP，主打：

- 蝴蝶蘭
- 花籃
- 盆花
- 追思花禮

整體風格偏高質感、溫柔、乾淨，聚焦在商品瀏覽、會員價呈現、商品詳情與購物車體驗，方便後續再擴充成完整電商網站。

## 目前完成的功能

- 首頁 Hero、品牌標語、服務特色、精選商品、會員優惠區塊
- 商品列表頁
  - 分類切換
  - 搜尋功能
  - 商品卡片
- 商品詳情頁
  - 商品資訊
  - 原價 / 會員價
  - 數量選擇
  - 相似商品推薦
- 會員登入 / 註冊 UI 示意
  - 使用 mock state 模擬會員登入狀態
- 購物車頁
  - 商品增減
  - 刪除
  - 原價與會員價差異顯示

## 技術說明

- React
- Vite
- JavaScript（沿用目前 repo 既有技術棧，未改成 TypeScript）
- 自製輕量路由方案（未新增 React Router 依賴，避免大幅改動現有專案）
- CSS 檔案模組化拆分（未導入 Tailwind，因目前 repo 尚未配置）

## 啟動方式

```bash
npm install
npm run dev
```

開啟瀏覽器進入：

```bash
http://localhost:5173
```

## 驗證指令

```bash
npm run build
npm run lint
```

## 專案重點結構

```text
src/
  components/
  data/
  hooks/
  lib/
  pages/
```

## 目前仍為 mock / placeholder 的部分

- 會員登入沒有真實 API
- 購物車沒有串接後端
- 結帳按鈕為視覺示意
- 商品圖片使用可集中替換的 placeholder 產生器
- 沒有真實金流與訂單 API
