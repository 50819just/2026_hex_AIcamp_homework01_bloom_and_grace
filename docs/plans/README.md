# plans/README.md

## 用途
`docs/plans/` 用來放 AI Agent 產生的進行中計畫、拆解步驟與執行紀錄。
完成後的計畫需移到 `docs/plans/archive/`，保留專案歷史脈絡。

## 建議流程
1. 先確認需求與目前專案現況。
2. 在 `docs/plans/` 建立計畫檔。
3. 計畫內容至少包含：
   - 目標
   - 範圍
   - 執行步驟
   - 驗證方式
4. 實作完成後，更新相關文件：
   - `docs/FEATURES.md`
   - `docs/ARCHITECTURE.md`
   - `docs/TESTING.md`
5. 將完成的計畫移到 `docs/plans/archive/`。

## 命名建議
- 進行中：`YYYY-MM-DD-topic-plan.md`
- 已完成歸檔：移至 `docs/plans/archive/` 並保留原檔名

## 計畫檔最小範本
```md
# 計畫名稱

日期：YYYY-MM-DD
狀態：draft | in-progress | completed

## 目標
- 

## 範圍
- 

## 執行步驟
1. 
2. 
3. 

## 驗證方式
- 

## 結果摘要
- 
```

## 注意事項
- `docs/plans/` 保留目前進行中的內容。
- `docs/plans/archive/` 只放已完成並可回顧的計畫。
- 計畫若涉及敏感資料，不要把金鑰直接寫入文件。
