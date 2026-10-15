@AGENTS.md

# Portfolio v4 — PR Board

Matías García's portfolio: an editorial, sports-poster site (ADR `docs/adr/0004-from-game-to-pr-board.md`).
Audience: recruiters → tech leads → freelance clients. English only, dark only (old `/es` links redirect to the English pages).

## Project rules

- Architecture (layers, feature barrels, CVA `.variants.ts`, server/client, trophy bus, 3-line
  comments, build plan): `docs/architecture.md`. Follow it for every file in `src/`.
- Visual tokens, type, motion catalogue, bans, dark mode: `DESIGN.md`.
- Career facts live in `src/content/` only. Unknown → `pending()`; never invent facts or metrics.
  `pnpm content:pending` lists what the owner still has to fill.
- Fonts: Anton + Inter Tight through `next/font/google` (self-hosted at build). No runtime font requests.
  OG images/icons (next/og) read the committed TTFs in `assets/fonts/` (OFL).
- Reviews and QA of a phase or branch: the `portfolio-review` skill (gates, pattern scan, QA matrix).

## Commands

`pnpm dev` · `pnpm build` (eslint + next build) · `pnpm start` · `pnpm lint` · `pnpm typecheck` ·
`pnpm test` (vitest) · `pnpm test:e2e` (playwright on the production build) · `pnpm format`.
e2e in WSL2 needs `LD_LIBRARY_PATH=$PWD/.pw-libs/usr/lib/x86_64-linux-gnu` (see the review skill's qa.md).

## Conventions

- Conventional Commits, scopes: shell, hero, records, log, about, projects, contact, trophies, cv,
  design, content, i18n, seo, config, ci, deps, docs. Husky + lint-staged run on commit; never bypass.
- `.claude/`, `CLAUDE.md`, `AGENTS.md` are committed; `docs/redesign/` stays local (gitignored).
- Never ship or reference `photos/mylove.webp`.

## Summary instructions

When compacting, keep: the current v4 phase and branch (`v4`), the files touched in this phase, the last
test / build / lint output (pass or the failing lines), and the pointer to
`docs/redesign/v4/loop-state.md` — the loop's source of truth: read it first after a compaction.
