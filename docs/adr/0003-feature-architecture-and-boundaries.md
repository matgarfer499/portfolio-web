# 0003 — Feature-based architecture with enforced import boundaries

- Status: Accepted
- Date: 2026-06

## Context

Portfolio v3 is a single experience with several distinct domains: the 3D world,
the keyboard-driven avatar, the achievement system, the HUD, the press-start
screen. Each one carries its own state (Zustand store), components, and assets.
Without a structural rule, these domains tend to reach into each other directly —
the achievement code imports a world helper, the world imports a HUD selector —
and the dependency graph degrades into a ball of mud where nothing can be moved,
tested, or deleted in isolation.

We want a layout where:

- a domain is self-contained and has one obvious public surface;
- domains do not depend on each other;
- the few places that _do_ combine domains are explicit and findable;
- the rules are mechanically enforced, not maintained by reviewer goodwill.

## Decision

Organize `src/` into four layers with a one-directional dependency graph.

```
src/
├── app/        # composition root: Next.js routes, layouts, _components
├── features/   # self-contained domains: world, avatar, achievements, hud, press-start
├── shared/     # bottom layer: cn(), gradient-map, hooks, ui, config — no domain logic
└── content/    # single typed content source (plain TS, no Zod/CMS)
```

Path aliases (`tsconfig.json`): `@/*`, `@app/*`, `@features/*`, `@shared/*`,
`@content/*`.

Allowed dependency directions:

- `app/` may import any layer (it is the only layer permitted to combine features).
- `features/*` may import `shared/` and `content/`, but **not** other features and **not** `app/`.
- `shared/` may import nothing above it — no `features/`, no `app/`. It is the bottom of the graph.
- `content/` is leaf data.

### The public-index rule

Each feature exposes its public API through a single `index.ts`. Everything else
inside the feature is private. Consumers import `@features/world`, never
`@features/world/components/Scene`.

`src/features/world/index.ts`:

```ts
export { Scene } from './components/Scene';
export { useWorldStore } from './store';
```

The world's `Block`, `Ground`, `ZoneMarker`, `Lighting`, and store internals stay
unreachable from outside, so they can be refactored freely.

### Features never import features; compose in `app/`

A feature owning its own store is deliberate. Cross-feature behavior is _wiring_,
and wiring is the app layer's job — never baked into a feature. This keeps each
feature decoupled and independently testable.

## Enforcement

These rules are not conventions; ESLint fails the build when they are broken
(`eslint.config.mjs`, via `no-restricted-imports`).

Feature isolation (`error`, scoped to `src/features/**`):

```js
// Features must not reach into other features or up into the app layer.
const featureBoundary = {
  patterns: [
    {
      group: ['@features/*', '@features/*/**'],
      message: 'Features must not import other features — compose them in the app/ layer.',
    },
    {
      group: ['@app/*', '@app/*/**'],
      message: 'Features must not import from the app layer.',
    },
  ],
};

// Inside a feature: no other feature, no app layer.
{
  files: ['src/features/**/*.{ts,tsx}'],
  rules: { 'no-restricted-imports': ['error', featureBoundary] },
}
```

`shared/` isolation (`error`, scoped to `src/shared/**`): the same idea pointed
downward — `shared/` must not depend on `@features/*` or `@app/*`.

Public-index rule (`warn`, everywhere): deep feature imports are blocked.

```js
'no-restricted-imports': [
  'warn',
  {
    patterns: [
      {
        group: ['@features/*/*'],
        message: 'Import a feature through its public index (e.g. `@features/world`).',
      },
    ],
  },
]
```

Note the asymmetry: cross-feature and `shared/` violations are hard `error`s;
deep-path imports are a `warn`. The boundary that protects the architecture is
non-negotiable; the import-style preference is enforced but not build-breaking.

## Worked example: world → achievement wiring

The one cross-feature interaction shipped in the vertical slice is: _walking into
a zone unlocks the `first-contact` achievement_. The `world` feature knows
nothing about achievements, and `achievements` knows nothing about the world.
Both expose only their store and components through their index. The connection
lives entirely in the app composition root,
`src/app/[locale]/_components/GameExperience.tsx`:

```tsx
import { AchievementToast, useAchievementsStore } from '@features/achievements';
import { Avatar, controlsMap } from '@features/avatar';
import { Hud } from '@features/hud';
import { Scene, useWorldStore } from '@features/world';

export function GameExperience({ zones, onExit }: GameExperienceProps) {
  const activeZoneId = useWorldStore((state) => state.activeZoneId);
  const unlock = useAchievementsStore((state) => state.unlock);

  // The world reports the active zone; this layer turns that into an unlock.
  useEffect(() => {
    if (activeZoneId) {
      unlock('first-contact');
    }
  }, [activeZoneId, unlock]);
  // ...
}
```

`GameExperience` is the only module that imports `world`, `avatar`,
`achievements`, and `hud` together, and it is the only place that subscribes to
one feature's store to drive another's action. If a reviewer wants to know how
zones and achievements relate, there is exactly one file to open.

## Consequences

Positive:

- Features are independently understandable, testable, and deletable. Removing a
  feature is "delete the folder, delete its use in `app/`".
- The dependency graph is acyclic and one-directional by construction; ESLint
  rejects any edge that would violate it.
- The public surface of each feature is its `index.ts` — a single file to read to
  learn what a feature offers, and the seam refactors hide behind.
- All cross-feature behavior is concentrated in the app layer, so integration
  logic is findable instead of scattered.

Negative / costs:

- More boilerplate: every feature needs an `index.ts`, and new public exports must
  be added there before they are usable.
- The app layer accretes wiring as features multiply. As more zones and
  achievements land, `GameExperience` (or sibling composition components) will
  need to be split to stay readable.
- Genuinely shared domain logic has nowhere natural to live — `shared/` is for
  domain-free primitives, and features can't import each other. Such logic must be
  pushed down into `shared/` (if domain-free) or lifted into `app/` (if wiring),
  which can feel forced.

## Alternatives considered

- **Flat `components/` + `lib/` (v2-style).** Simple, but no enforced boundaries;
  domains bleed into each other and the import graph cycles. Rejected — this is the
  exact failure mode the rebuild exists to avoid.
- **Feature folders without ESLint enforcement.** Same structure, rules kept by
  convention. Rejected — unenforced layering erodes; the boundary is only real if
  the build fails when it's crossed.
- **Allow direct feature-to-feature imports.** Less app-layer boilerplate, but
  reintroduces the coupling and cycles we are trying to prevent, and scatters
  integration logic. Rejected.
- **A shared event bus / mediator instead of app-layer wiring.** More indirection
  and runtime machinery than the current scale justifies; subscribing to one
  store in the composition root is simpler and fully typed. Revisit if cross-feature
  interactions grow well beyond the single world→achievement case.

```

```
