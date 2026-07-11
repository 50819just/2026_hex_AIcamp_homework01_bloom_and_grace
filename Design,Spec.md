# Bloom & Grace 設計規格補充

## 導覽列統一規格

- Logo 固定在最左邊，永遠不再置中或改變位置
- 中間為 5 個文字導覽：
  1. 商品選購
  2. 購物袋
  3. 品牌故事
  4. 會員中心
  5. 後台登入
- 最右側為 3 個 icon：
  - 放大鏡
  - 個人／登入
  - 購物車
- Logo 與 icon 皆需放大，避免視覺太小
- 導覽列不得因首頁 / 內頁切換而跳動

## Logo 規格

- 優先使用本地四個品牌 logo
  - `src/assets/branding/logo-primary.svg`
  - `src/assets/branding/logo-mark.svg`
  - `src/assets/branding/logo-light.svg`
  - `src/assets/branding/logo-dark.svg`
- 目前前台以 `logo-primary.svg` 為主

## 商品圖來源

- 商品主圖一律優先使用本地圖片：
  - `public/images/products/orchids/`
  - `public/images/products/baskets/`
  - `public/images/products/potted/`
  - `public/images/products/sympathy/`
- 不再優先依賴外部示意圖

## 中文化原則

- 所有前台可見文字以繁體中文為主
- 英文只保留在技術欄位、內部識別或必要 API 名稱
- 使用者可見的標題、按鈕、提示、空狀態、導覽與說明文字皆需中文化

## 底線與刪除線

- 不使用奇怪的底線樣式作為主要視覺
- 不顯示不必要的刪除線樣式
- 若是價格比較，改以更清楚的中文標籤與層級處理

## 分類與篩選列

- 商品選購頁的花禮分類列不顯示「花禮分類」字樣
- 分類列不使用白色外框卡片包起來
- 分類切換以置中、乾淨、低對比的 editorial filter bar 呈現
- 減少多餘 border，避免看起來像跑版或額外框架
