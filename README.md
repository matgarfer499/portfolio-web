# Matías García — Portfolio v3

**The portfolio _is_ a 3D web game.** A low-poly, cel-shaded open world you explore with a keyboard-driven avatar. Each zone is a portfolio section; walking into one unlocks an achievement (toast + chime). Underneath runs a parallel **fast layer**: the exact same content as plain, crawlable, keyboard-navigable HTML for mobile visitors and search crawlers.

> Status: full rebuild on branch `v3`. The art you see now is **placeholder primitives** — real models, palette, and typography land later. See [Project status](#project-status).

## The two-layer concept

```
                        /[locale]            press START  →  Enter
                       ┌───────────────────────────────────────────────┐
   one content source │  GAME LAYER (client-only, code-split)           │
   src/content  ──────┤  WebGL world · Rapier physics · keyboard avatar │
   (typed TS,         │  zones = sections · achievements on contact     │
    EN/ES localized)  └───────────────────────────────────────────────┘
                       ┌───────────────────────────────────────────────┐
                       │  FAST LAYER  /[locale]/fast  (SSG)             │
                       │  semantic, indexable, a11y-first HTML          │
                       │  what mobile + crawlers get                    │
                       └───────────────────────────────────────────────┘
```

Both layers render from the **same** content. The game is for delight; the fast layer guarantees SEO, accessibility, and a no-WebGL fallback.

## Stack

**Framework & language**

- **Next.js 16** (App Router, Turbopack) + **React 19** — server components for the shell, client islands for the game.
- **TypeScript 6**, strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` + `verbatimModuleSyntax`.

**3D / game**

- **three 0.184** + **@react-three/fiber 9** + **@react-three/drei 10** — declarative WebGL.
- **@react-three/rapier 2** — physics: avatar rigid body, zone sensors, fixed colliders.
- Cel-shading via `meshToonMaterial` + a 3-step gradient ramp + drei `<Outlines>`.

**State, motion, audio**

- **Zustand 5** — one store per feature, persisted where it matters (achievements).
- **Framer Motion 12** + **GSAP 3** — UI motion within a tight budget.
- **Howler 2** — achievement chime.

**i18n & styling**

- **next-intl 4** — EN (default, no prefix) + ES (`/es`).
- **Tailwind 4** — tokens via `@theme`; `cn()` = `clsx` + `tailwind-merge`.

**Tooling & quality**

- **Vitest 4** (unit) · **Playwright 1.61** (e2e chromium).
- **ESLint 9** flat config + **Prettier** + **Husky** + **lint-staged** + **commitlint** (Conventional Commits).

## Quickstart

Requires Node `>=22` and pnpm `10.19`.

```bash
git clone <repo-url> portfolio-web
cd portfolio-web
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

| Command             | What it does                                               |
| ------------------- | ---------------------------------------------------------- |
| `pnpm dev`          | Dev server at http://localhost:3000                        |
| `pnpm build`        | Production build (Turbopack; also type-checks)             |
| `pnpm start`        | Serve the production build                                 |
| `pnpm typecheck`    | `tsc --noEmit`                                             |
| `pnpm lint`         | `eslint .`                                                 |
| `pnpm lint:fix`     | ESLint with `--fix`                                        |
| `pnpm format`       | Prettier write                                             |
| `pnpm format:check` | Prettier check (CI)                                        |
| `pnpm test`         | Vitest unit run                                            |
| `pnpm test:watch`   | Vitest watch                                               |
| `pnpm test:e2e`     | Playwright (builds + serves on port 3100, drives chromium) |

## Architecture

Feature-based modules under `src/`. Each **feature** owns its components, store, and hooks, and exposes a single public API via `index.ts`.

```
src/
├── app/[locale]/
│   ├── layout.tsx              # <html lang>, NextIntlClientProvider, Analytics, metadata
│   ├── page.tsx                # PRESS START route (server) → <HomeExperience/>
│   ├── fast/page.tsx           # fast layer (SSG, semantic HTML)
│   └── _components/
│       ├── HomeExperience.tsx  # owns "entered" toggle; dynamic(GameExperience,{ssr:false})
│       └── GameExperience.tsx  # COMPOSITION ROOT: KeyboardControls>Canvas>Physics>(Scene+Avatar)
├── features/
│   ├── world/                  # store + Scene, Ground, Block, ZoneMarker, Lighting
│   ├── avatar/                 # controls.ts + Avatar.tsx (Rapier rigid body)
│   ├── achievements/           # catalog, persisted store, sound hook, toast
│   ├── hud/                    # in-DOM HUD (in-world copy is never in-canvas)
│   └── press-start/
├── shared/                     # cn(), gradient-map, useToonGradient, LanguageSwitch, config
├── content/                    # single content source: plain typed TS (no Zod, no CMS)
├── i18n/                       # routing, request, navigation
└── messages/                   # en.json, es.json (UI chrome strings)
```

### Import boundaries

Enforced by `eslint.config.mjs` (`no-restricted-imports`):

- A feature **must not** import another feature, and **must not** import `@app/*`.
- `shared/` **must not** import `@features/*` or `@app/*` — no domain logic lives there.
- Import a feature only through its public index (`@features/world`), never deep paths.
- **The app layer is the only composition root** allowed to import multiple features. Cross-feature wiring happens here — e.g. world's `activeZoneId` → achievements `unlock('first-contact')` is wired in `GameExperience`, not inside a feature.

Path aliases: `@/*`, `@app/*`, `@features/*`, `@shared/*`, `@content/*` → `src/*`.

## The two layers, in detail

**Game layer (`/[locale]` → PRESS START → Enter).** The route renders a server component that localizes content and hands it to `HomeExperience`. WebGL is **client-only and code-split**: the game mounts via `next/dynamic({ ssr: false })` _only_ after the user clicks Enter, so PRESS START is instant and three.js never touches the server. drei `<KeyboardControls>` (WASD + arrows, mapped by `event.code`) wraps the `<Canvas>`; the avatar is a Rapier dynamic rigid body with a capsule collider whose velocity is set each `useFrame`, and the camera follows with a frame-rate-independent lerp. Zone markers are fixed sensor colliders; entering one updates the world store, which the app layer maps to an achievement unlock. In-world copy is rendered in the **DOM HUD** — no in-canvas text (drei `<Text>`/troika would fetch a font at runtime).

**Fast layer (`/[locale]/fast`).** A statically generated server page that renders the same profile, zones, projects, and contact links as semantic, keyboard-navigable HTML (`<main>`, `<section aria-labelledby>`, real `<a>`/`<ul>`). This is the SEO + accessibility story: crawlers and mobile get fully indexable content with zero WebGL, and the game links to it (and back) so neither layer is a dead end.

## Internationalization

- `src/i18n/routing.ts` — `defineRouting({ locales: ['en','es'], defaultLocale: 'en', localePrefix: 'as-needed' })`. EN has no URL prefix; ES lives under `/es`.
- `src/proxy.ts` — `createMiddleware(routing)` (Next 16 renamed `middleware` → `proxy`); matcher excludes `api`, `_next`, `_vercel`, and files.
- Layout/page `await params`, narrow the locale with `hasLocale`, then `setRequestLocale`. `generateStaticParams` maps `routing.locales`.
- `src/global.d.ts` augments next-intl's `AppConfig` with `Locale` + `Messages = typeof en.json`, so `useTranslations` keys are type-checked.

**Content vs UI strings — a deliberate split:**

- **UI chrome** (buttons, labels, badges) → `src/messages/{en,es}.json`, read via `useTranslations` / `getTranslations`.
- **Portfolio domain content** (bio, zones, projects) → `src/content`, typed as `Localized = Record<Locale, string>` with a `localize(value, locale)` helper.

Both layers render from that same content source.

## Testing

**Unit — Vitest** (node env, alias map mirrors `tsconfig`). Run with `pnpm test`.

**E2E — Playwright** (chromium smoke). The `webServer` builds and serves on port 3100, then drives the browser. Three assertions:

1. PRESS START renders and routes to the fast version.
2. The fast version is crawlable, server-rendered HTML.
3. Entering the game mounts the canvas and an achievement fires on contact.

### Running e2e in WSL2

Bundled chromium needs system libs that aren't present locally without root. CI installs them with `playwright install --with-deps`. Locally (no root), download and extract them, then point the linker at them:

```bash
apt-get download libnspr4 libnss3 libasound2t64
for deb in *.deb; do dpkg-deb -x "$deb" "$PWD/.pw-libs"; done
export LD_LIBRARY_PATH="$PWD/.pw-libs/usr/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH"
pnpm test:e2e
```

## CI & Deploy

`.github/workflows/ci.yml` runs on push to `v3`/`master` and on PRs, in two jobs:

- **quality** — `format:check` → `lint` → `typecheck` → `build` → `test`.
- **e2e** — `playwright install --with-deps chromium` → `test:e2e`, uploading the Playwright report as an artifact.

Deploy: **Vercel**, with `@vercel/analytics`. Production domain: **matiasgarcia.dev**.

## Project status

- **Phase 0 (foundations)** — done.
- **Phase 2 (vertical slice)** — done: PRESS START → game, one zone, one wired achievement (`first-contact`), the fast layer.
- **Phase 1 (art direction)** and **Phase 3+** — not done: more zones, world transitions, the Matadragones climax, the full achievement set, audio, Berserk easter eggs, full SEO/a11y, asset optimization.

The current 3D art is **placeholder primitives** on a placeholder palette (flame `#ff7a1a`, azure `#3aa0ff`, deep-night bg `#0b1020`) using system font stacks (no network fonts). Real models, palette, and typography arrive in a later phase, designed with Matías.

## Claude Code config

`.claude/` and `CLAUDE.md` are committed **on purpose** — this repo is built with Claude Code, and the project skills, conventions, and phase plans are part of how it's developed. They double as living architecture docs.
