---
name: feature-architecture-v3
description: Use when adding or moving code in portfolio v3 — deciding which layer (app/features/shared/content) a file belongs to, wiring features together, or fixing import-boundary lint errors.
---

# Feature architecture (portfolio v3)

The codebase is split into four layers with a strict, ESLint-enforced dependency
direction: `app` → `features` → `shared`, plus a flat `content` source. Features
are self-contained domain modules that never know about each other; all
cross-feature wiring happens in the `app` layer.

## Folder map

```
src/
├── app/[locale]/        # composition root — pages, layouts, _components/
├── features/            # self-contained domain modules
│   ├── world/           # scene, ground, blocks, zone markers, world store
│   ├── avatar/          # rapier capsule + keyboard controls
│   ├── achievements/    # catalog, store, sound, toast
│   ├── hud/             # DOM HUD overlay
│   └── press-start/     # PRESS START intro
├── shared/              # bottom of the graph — lib/, hooks/, ui/, config/
├── content/             # single typed-TS content source (no Zod, no CMS)
├── i18n/                # routing, request, navigation
└── messages/            # en.json, es.json (UI chrome strings)
```

## Path aliases (tsconfig.json)

```jsonc
"@/*":         "./src/*"
"@app/*":      "./src/app/*"
"@features/*": "./src/features/*"
"@shared/*":   "./src/shared/*"
"@content/*":  "./src/content/*"
```

## Public-index rule

Every feature exposes its API through `index.ts`. Import the feature by its
alias root only — never a deep path.

```ts
// src/features/world/index.ts
export { Scene } from './components/Scene';
export { useWorldStore } from './store';
```

```ts
// ✅ consumer
import { Scene, useWorldStore } from '@features/world';

// ❌ deep import — bypasses the public surface
import { Scene } from '@features/world/components/Scene';
```

If something is needed outside the feature, add it to that feature's `index.ts`.
If it should stay private, don't export it.

## Import boundaries (enforced by eslint.config.mjs)

The rules below are real lint rules. Errors fail CI; the deep-path one is a warning.

- **Inside a feature** (`src/features/**`): may NOT import another feature
  (`@features/*`) and may NOT import the app layer (`@app/*`). `error`.
- **shared/** (`src/shared/**`): may NOT import `@features/*` or `@app/*`.
  It is the bottom of the graph and depends on nothing above it. `error`.
- **Everywhere**: may NOT import a feature by a deep path (`@features/*/*`) —
  go through the public index. `warn`.

```js
// eslint.config.mjs — feature boundary
const featureBoundary = {
  patterns: [
    {
      group: ['@features/*', '@features/*/**'],
      message: 'Features must not import other features — compose them in the app/ layer.',
    },
    { group: ['@app/*', '@app/*/**'], message: 'Features must not import from the app layer.' },
  ],
};
// applied to src/features/**; a mirror rule blocks @features/* and @app/* from src/shared/**
```

Legal dependency directions:

```
app      → features, shared, content, i18n   (only layer that may import many features)
features → shared, content, i18n             (never another feature, never app)
shared   → (nothing above it)
content  → i18n (Locale type) only
```

## Where Zustand stores live

Each feature owns its own store, colocated as `store.ts` and re-exported from
`index.ts` (e.g. `useWorldStore`, `useAchievementsStore`). A store is private
state for its feature. Features never read each other's stores directly — the
app layer subscribes to both and bridges them.

## Compose features in the app layer

Because features cannot import each other, any glue between two features lives
in `src/app`. The canonical example: the world reports the active zone, and the
app layer turns that into an unlocked achievement.

```tsx
// src/app/[locale]/_components/GameExperience.tsx — the composition root
const activeZoneId = useWorldStore((s) => s.activeZoneId); // from @features/world
const unlock = useAchievementsStore((s) => s.unlock); // from @features/achievements

useEffect(() => {
  if (activeZoneId) unlock('first-contact');
}, [activeZoneId, unlock]);
```

`GameExperience` is the only place allowed to import `@features/world`,
`@features/avatar`, `@features/hud`, and `@features/achievements` together. Neither
the world nor the achievements feature references the other.

## Decision checklist: where does this file go?

1. **Is it a Next.js page, layout, or the game composition root?** → `src/app`.
   This is the only layer that may stitch multiple features together.
2. **Is it domain logic for one section/system** (world, avatar, achievements,
   hud, press-start)? → that `feature/`. Add a re-export to its `index.ts` if
   anything outside needs it.
3. **Does it need to glue two features together?** → it does NOT belong in either
   feature. Put the wiring in `src/app` and have it subscribe to both stores.
4. **Is it generic, domain-agnostic** (cn(), gradient helpers, toon hooks, UI
   primitives, site config)? → `src/shared`. It must not import features or app.
5. **Is it portfolio data/copy** (profile, zones, project text)? → `src/content`
   as plain typed TS (`Localized = Record<Locale, string>` + `localize`). UI
   chrome strings go in `src/messages/{en,es}.json` instead.
6. **Is it i18n routing/request/navigation config?** → `src/i18n`.

When unsure between `feature` and `shared`: if it mentions a domain concept (zone,
avatar, achievement), it's a feature; if it would make sense in an unrelated app,
it's `shared`.

## Anti-patterns

- **Feature importing a sibling feature.** `import { unlock } from '@features/achievements'`
  inside `src/features/world` — forbidden. Lift the wiring to `src/app`.
- **Deep import past `index.ts`.** `@features/world/components/Scene` — import
  `@features/world`. If the symbol isn't exported, export it (or keep it private).
- **`shared/` importing upward.** `shared` must never import `@features/*` or
  `@app/*`. If a shared helper needs domain knowledge, it isn't shared.
- **Cross-feature glue inside a feature.** A feature reaching into another
  feature's store, or an `useEffect` in `world` that calls `achievements`. The
  bridge belongs in the app layer's composition root.
- **A feature importing the app layer.** Features are leaves toward `app`; data
  flows down via props/stores, never by importing `@app/*`.
- **Putting page-level orchestration in a feature.** Mounting `<Canvas>`,
  combining `world` + `avatar` + `hud`, or `next/dynamic` ssr:false gating lives
  in `app`, not in any single feature.
