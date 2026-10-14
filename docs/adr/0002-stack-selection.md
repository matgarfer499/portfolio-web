# 2. Stack selection: Next.js + React Three Fiber + Rapier + next-intl

- **Status:** Accepted, amended by 0004 (3D stack removed)
- **Date:** 2026-06
- **Supersedes:** the v2 Astro stack (retired with the v3 rebuild)

## Context

Portfolio v3 is a full rebuild. The portfolio _is_ a 3D web game: a low-poly, cel-shaded
world explored with a keyboard-driven avatar, where each zone is a section and walking into
things unlocks achievements. A **parallel fast layer** renders the same content as plain,
crawlable, keyboard-navigable HTML for mobile and crawlers.

That concept sets hard constraints the stack must satisfy:

- **WebGL game** as the primary experience — declarative three.js, physics, animation, audio.
- **Two presentations, one content source** — the interactive game and an SSG/SEO HTML layer
  must both read from the same typed content.
- **SEO and instant first paint** — PRESS START must be server-rendered and fast; three.js must
  never block the initial response.
- **Bilingual EN/ES** with typed, prefix-aware routing (`en` default no prefix, `es` under `/es`).
- **Strict TypeScript** end to end, with enforced feature import boundaries.

The v2 Astro stack does not fit: the game needs a React-first runtime for R3F, a client/server
split with explicit code-splitting boundaries, and first-class i18n routing — all of which Next's
App Router provides natively.

We also follow a standing preference: **on a tie, choose the more distinctive, well-engineered
library over the most ubiquitous one** — provided it carries no correctness or maintenance penalty.

## Decision

### Framework — Next.js 16 (App Router, Turbopack) + React 19

Chosen over Astro/SvelteKit. The world is built with React Three Fiber, so a React-native framework
removes an integration seam. The App Router gives us:

- A clean **server/client boundary**: server components render PRESS START and the fast layer as
  SSG; the WebGL game is a client island.
- **`next/dynamic({ ssr: false })`** to code-split and defer the entire three.js bundle until the
  user clicks Enter — three.js never touches the server.
- Built-in **SSG** for the fast layer and `generateStaticParams` per locale.
- Async request APIs (Next 16: `await params`) and the renamed request handler in `src/proxy.ts`.

Astro's island model would still require React for R3F and would fight the single-client-tree the
game needs; SvelteKit would force the whole 3D layer off the React/R3F ecosystem we depend on.

### 3D — three 0.184 via React Three Fiber 9 + drei 10

R3F renders three.js declaratively as a React tree, so scene graph, state, and lifecycle use the
same model as the rest of the app (hooks, stores, suspense) instead of imperative `useEffect`
glue. drei supplies batteries — `KeyboardControls`, `Outlines`, helpers — that we would otherwise
hand-roll. Cel-shading is `meshToonMaterial` + a generated 3-step gradient ramp + drei `<Outlines>`.

Constraint captured here: **no troika / drei `<Text>` in-canvas** (it fetches a font at runtime);
all in-world copy is rendered through the DOM HUD.

### Physics — @react-three/rapier 2

Rapier is a Rust/WASM physics engine with React bindings that match the R3F tree (`<RigidBody>`,
`<CapsuleCollider>`, sensor colliders with `onIntersectionEnter/Exit`). It is faster and more
modern than the more ubiquitous cannon-es / use-cannon, fitting the "distinctive, well-engineered"
stance. The avatar is a dynamic `RigidBody` with locked rotations driven by per-frame velocity;
zone markers are fixed sensor colliders that report intersection to the world store.

### State — Zustand 5

Per-feature stores, minimal boilerplate, usable inside and outside React (the achievements store is
a `persist` store backed by `localStorage`, with a noop storage on the server). Cross-feature wiring
(world's `activeZoneId` → achievement unlock) happens in the app composition root, not inside a
feature — Zustand's external store API makes that clean. Chosen over Redux Toolkit (heavier) and
Context (re-render cost, no external access).

### i18n — next-intl 4

Typed message catalogs and prefix-aware routing in one library. `defineRouting` gives
`localePrefix: 'as-needed'` (EN unprefixed, ES under `/es`); `createNavigation` yields typed
`Link`/`redirect`/`useRouter`; `getRequestConfig` validates the locale with `hasLocale`.
`global.d.ts` augments next-intl's `AppConfig` so `useTranslations` keys are checked against
`messages/en.json` at compile time. UI chrome strings live in the message catalogs; portfolio
domain content lives in `src/content` as `Record<Locale, string>` — both layers render from the
same source.

### Styling — Tailwind 4 with `@theme` tokens

The placeholder palette (flame `#ff7a1a`, azure `#3aa0ff`, deep-night `#0b1020`, …) is declared once
as `@theme` tokens in `globals.css`, which generate utilities (`bg-bg`, `text-flame`, `border-azure`).
System font stacks only — no network fonts. `cn()` = `clsx` + `tailwind-merge`. Motion budget
(translateY ≤ 12px, ≤ 250ms, ease-out) is enforced via `motion-safe:` and a global
`MotionConfig reducedMotion="user"`. Animation: Framer Motion for DOM transitions (the achievement
toast), GSAP reserved for sequenced world choreography.

### Content — plain typed TS (no Zod, no CMS)

`src/content` is a single hand-authored, strictly-typed module. The content is small, owned by one
author, and never crosses a runtime trust boundary, so Zod's runtime validation buys nothing here;
TypeScript 6 strict (`as const satisfies`, `readonly`, `exactOptionalPropertyTypes`) is sufficient.

### Testing — Vitest 4 + Playwright 1.61

Vitest for fast node-env unit tests (alias map mirrors `tsconfig`). Playwright drives Chromium for
three smoke tests that no unit test can cover: PRESS START renders and routes to the fast layer; the
fast layer is crawlable SSR HTML; entering the game mounts the canvas and fires an achievement on
contact. CI runs a quality job (`format:check`, `lint`, `typecheck`, `build`, unit) and a separate
e2e job (`playwright install --with-deps chromium`).

### Tooling

ESLint 9 flat config (`eslint-config-next` + Prettier + the import-boundary rules) enforces the
feature architecture at build time. Husky + lint-staged on commit; commitlint (Conventional Commits)
on the message. Hosting on Vercel with `@vercel/analytics`.

## Consequences

**Positive**

- One React tree from DOM to scene graph; no framework seam around the 3D layer.
- The fast layer falls out naturally from server components + SSG, satisfying SEO and mobile from
  the same content source.
- Type safety reaches into i18n keys and content literals.
- Import boundaries are mechanically enforced, keeping features decoupled as the world grows.

**Risks / mitigations**

- **WebGL performance** (low-end / mobile GPUs): the fast layer is the answer — crawlers and mobile
  get plain HTML and never load three.js. The game targets the motion budget and cel-shaded
  low-poly geometry to stay cheap.
- **Bundle size** (three + rapier + drei are large): mitigated by `next/dynamic({ ssr: false })`,
  which keeps the entire game out of the initial bundle until Enter is clicked, so PRESS START's
  payload stays minimal.
- **Rapier WASM**: a WASM init cost on game mount, accepted because it lands after the explicit
  Enter gesture, not on first paint.
- **Bleeding-edge versions** (Next 16, React 19, TS 6, Rapier 2): accepted deliberately — v3 is a
  greenfield showcase and currency is part of the point. Gotchas (async `params`, `middleware` →
  `proxy`) are documented in `CLAUDE.md`.
- **WSL2 e2e**: bundled Chromium needs system libs absent locally without root. CI uses
  `--with-deps`; the local workaround is documented in the README.
