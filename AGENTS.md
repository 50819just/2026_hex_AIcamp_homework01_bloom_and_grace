# AGENTS.md

## Project Overview
This project is a florist e-commerce frontend MVP for a single-brand flower shop.
Main product categories include orchids, flower baskets, potted flowers, and sympathy floral gifts.

## Agent Scope
- This repository uses **Codex CLI** as the primary AI agent setup.
- Main memory file: `AGENTS.md`
- Extended project documents live in `./docs/`
- Do not create or rely on `.claude/` settings for this assignment version.

## Docs Map
- `docs/DEVELOPMENT.md`: coding rules, naming, wording, error handling
- `docs/ARCHITECTURE.md`: folder structure, module boundaries, data flow
- `docs/FEATURES.md`: current feature status and update checklist
- `docs/TESTING.md`: verification steps and acceptance flow
- `docs/plans/`: active plans and planning notes
- `docs/plans/archive/`: completed plan records

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
- Frontend visible text should use Traditional Chinese.

## Non-Goals
- No real backend authentication.
- No coupon engine.
- No unnecessary marketplace-scale features.
- Do not expand scope beyond assignment requirements.

## Planning Workflow
- Use `docs/plans/` for active or generated plans.
- After implementation is finished, move completed plans into `docs/plans/archive/`.
- When features change, sync related docs in `docs/`.

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
