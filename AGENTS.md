# AGENTS.md

## Project Overview
This project is a florist e-commerce frontend MVP for a single-brand flower shop.
Main product categories include orchids, flower baskets, potted flowers, and sympathy floral gifts.

## Working Rules
- Preserve the existing project structure when possible.
- Prefer small, reusable React components.
- Keep styling consistent and production-like.
- Do not collapse the entire UI into one file.
- Keep mock product data in a separate data module.
- Ensure every product supports:
  - image
  - originalPrice
  - memberPrice
  - category
  - description

## UI Priorities
- The site should feel like a premium florist brand website.
- Member price must be visually more prominent than original price.
- Orchid and flower basket products are mandatory.
- Responsive behavior for desktop and mobile is required.

## Non-Goals
- No real payment integration
- No real backend authentication
- No large marketplace features
- No coupon engine

## Verification
Before finishing:
1. Run install if needed
2. Run build
3. Run lint if available
4. Run typecheck if available
5. Report what was implemented and what remains mocked

## Output Expectations
When done, summarize:
- files changed
- components created
- routes created
- mock data structure
- known limitations
## ECPay API Skill
- 讀取 `.ecpay-skill/AGENTS.md` 作為綠界整合知識庫入口。
- 常用指南：`.ecpay-skill/guides/01-payment-aio.md`、`13-checkmacvalue.md`、`15-troubleshooting.md`、`16-go-live-checklist.md`。
- 本專案若有綠界串接、查單、正式環境切換問題，優先參考 `docs/ECPAY_SKILL_USAGE.md` 與 `.ecpay-skill/`。
