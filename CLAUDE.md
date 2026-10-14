# CLAUDE.md

Guidance for Claude Code working in this repository. Keep it short — anything deducible from the
code does not belong here.

## What this is

Matías García's portfolio **v3**: the portfolio _is a 3D web game_. A low-poly, cel-shaded world the
visitor explores with a keyboard-driven avatar; each zone is a section; walking into things unlocks
achievements. There is a **parallel fast layer** — the same content rendered as plain, crawlable,
keyboard-navigable HTML — served to mobile and crawlers.

Audience: recruiters/HR → tech leads/CTOs → freelance clients. The one thing to land: _"this person
delivers and clearly knows their craft."_ Tone: friki, fun, never generic. Bilingual **EN (default) + ES**.

## Status & scope

- **Branch `v3`** — full rebuild from scratch (the old Astro v2 is gone).
- **Done:** Phase 0 (foundations) + Phase 2 (vertical slice).
- **Not done yet (do not build without being asked):** Phase 1 art direction, Phase 3+ (more zones,
  world transitions, the Matadragones climax, full achievement set, audio, Berserk easter eggs, full
  SEO/a11y pass, asset optimization). The current art is **placeholder primitives** — real models and
  the final palette/typography land later, _with Matías_.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 6 (strict) · React Three Fiber + drei + three ·
`@react-three/rapier` (physics) · Zustand · Framer Motion + GSAP · Howler · next-intl · Tailwind 4 ·
Vitest + Playwright. Package manager: **pnpm**.

## Commands

```bash
pnpm dev          # dev server (http://localhost:3000)
pnpm build        # production build (Turbopack) — also type-checks
pnpm start        # serve the production build
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint . (flat config, enforces import boundaries)
pnpm format       # prettier --write .
pnpm test         # vitest run (unit)
pnpm test:e2e     # playwright smoke (builds + serves, then drives a browser)
```

## Architecture (the one rule that matters)

Two layers, **one content source** (`src/content`, plain typed TS — no CMS, no Zod needed here):

```
PRESS START (SEO content in the DOM)  →  Enter game (WebGL)  |  Fast version (SSG HTML)
```

Feature-based, with **enforced import boundaries** (ESLint fails the build otherwise):

- `src/features/{world,avatar,achievements,hud,press-start}` — self-contained; each exposes a public
  `index.ts`. **A feature never imports another feature, and never imports `app/`.**
- `src/shared` — bottom of the graph; depends on nothing above it.
- `src/app/[locale]` — the **composition root**. Cross-feature wiring lives here (e.g. the world
  reports the active zone; the app layer turns that into an unlocked achievement). It is the only
  layer allowed to import multiple features.
- Path aliases: `@/*`, `@app/*`, `@features/*`, `@shared/*`, `@content/*`.

## Gotchas (things the code won't tell you)

- **WebGL is client-only and code-split.** The whole game mounts via `next/dynamic` with `ssr: false`
  after the user clicks Enter, so PRESS START stays instant and nothing three.js touches the server.
- **Next 16:** request APIs are async — `params`/`searchParams` are Promises (`await params`). The
  request handler lives in **`src/proxy.ts`** (Next 16 renamed `middleware` → `proxy`).
- **i18n is type-safe:** message keys are checked against `src/messages/en.json` (see `src/global.d.ts`).
  Narrow a route's `locale: string` with `hasLocale(routing.locales, locale)` before using it.
- **No network fonts / no in-canvas text fonts.** Fonts are system stacks; in-world copy is shown via
  the DOM HUD, not troika/`<Text>` (which fetches a font at runtime).
- **Running e2e in WSL2:** the bundled Chromium needs system libs that aren't installed. CI uses
  `playwright install --with-deps`. Locally without root, see the README's "Running e2e in WSL2" note.

## Project skills (`.claude/skills/`)

Consult these when the task matches:

- `nextjs-r3f-game` — Next + R3F + drei + Rapier conventions and anti-patterns.
- `feature-architecture-v3` — the folder contract and import boundaries.
- `clean-code-typescript` — strict-mode idioms for this repo.
- `art-direction` — placeholder visual system (orange/blue, cel-shading, motion budget).
- `i18n-bilingue` — next-intl setup and the content-vs-UI-strings split.

## Conventions

- Conventional Commits (commitlint-enforced); scopes: world, avatar, achievements, hud, press-start,
  shared, content, i18n, fast, config, ci, deps, docs. No PRs required (solo).
- `.claude/` and `CLAUDE.md` **are committed** for v3 (shown off as part of the work). Personal
  planning docs in `docs/redesign/` stay gitignored.
- Lint + format run on commit (Husky + lint-staged). Don't bypass.

## Summary instructions

When compacting, keep: the current v4 phase and branch (`v4`), the files touched in this phase, the last
test / build / lint output (pass or the failing lines), and the pointer to
`docs/redesign/v4/loop-state.md` — the loop's source of truth: read it first after a compaction.
