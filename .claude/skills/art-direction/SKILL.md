---
name: art-direction
description: Use when styling UI, picking colors/fonts, or adding motion in portfolio v3 during the placeholder art phase — defines the palette tokens, system fonts, motion budget, glass policy, and the cel-shaded look so you don't over-invest in non-final visuals.
---

# Art direction (placeholder phase)

The current visual layer is **deliberately placeholder**. Real models, palette, typography, and the
final low-poly world arrive in Phase 1 **with Matías** — do not over-invest in final visuals now.
Build with the tokens and rules below so swapping in real art later is a token edit, not a rewrite.

## Palette — orange/blue on deep night

Tokens live in `src/app/globals.css` under `@theme`. Tailwind 4 generates utilities from each
`--color-*` token (`bg-bg`, `text-flame`, `border-azure`, `bg-surface`, `text-muted`, …). Use the
utilities — never hardcode hex in components.

| Token                | Hex       | Role                         | Generated utilities (examples)           |
| -------------------- | --------- | ---------------------------- | ---------------------------------------- |
| `--color-bg`         | `#0b1020` | deep-night page base         | `bg-bg`, `text-bg`                       |
| `--color-surface`    | `#121a33` | raised surface               | `bg-surface`                             |
| `--color-surface-2`  | `#1b2547` | higher surface               | `bg-surface-2`                           |
| `--color-flame`      | `#ff7a1a` | primary accent (CTA, labels) | `bg-flame`, `text-flame`, `border-flame` |
| `--color-flame-soft` | `#ffb27a` | soft flame                   | `text-flame-soft`                        |
| `--color-azure`      | `#3aa0ff` | secondary accent, focus ring | `text-azure`, `border-azure`             |
| `--color-azure-soft` | `#8fc7ff` | soft azure                   | `text-azure-soft`                        |
| `--color-ink`        | `#e8edff` | primary text                 | `text-ink`, `bg-ink`                     |
| `--color-muted`      | `#9aa6cc` | secondary text, labels       | `text-muted`                             |

`color-scheme: dark` is set on `:root`; the site is dark-only. Opacity modifiers are the way to
soften (`text-ink/90`, `bg-bg/60`, `bg-flame/10`), not new tokens.

Focus ring is global and always visible (WCAG AA): `:focus-visible { outline: 2px solid azure }`.
Don't remove or override it per-component.

## Typography — system stacks only

Two font tokens, both system stacks — **no network fonts** (keeps PRESS START instant, avoids CLS):

```css
--font-sans:
  ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
--font-mono: ui-monospace, 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace;
```

- Body defaults to `--font-sans`. Use `font-mono` for labels, kickers, chips, dates, controls.
- The friki/game register comes from **monospace + uppercase + wide tracking**, e.g.
  `text-azure font-mono text-sm tracking-[0.2em] uppercase`. Reuse this kicker pattern; don't
  introduce a third typeface.

## Motion budget

Subtle only. Enforced everywhere via a global `MotionConfig reducedMotion="user"` in
`HomeExperience` plus per-element guards.

- translateY ≤ **12px**, duration ≤ **250ms** (~0.22s), **ease-out**.
- The canonical enter animation (PressStart, Hud panel):

  ```tsx
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.22, ease: 'easeOut' }}
  ```

- CSS animations must be gated with `motion-safe:` (e.g. `motion-safe:animate-pulse`).
- The achievement toast spring is the one permitted livelier motion (slide + scale); keep it scoped
  to that component.
- Camera follow in-canvas uses frame-rate-independent lerp — that's gameplay, not chrome motion.

## Glass — toast only

`backdrop-blur` as a **glass surface** is allowed on exactly one element: the achievement toast
(`bg-white/10 border-white/15 backdrop-blur-md`). Everywhere else use opaque/translucent solid
surfaces (`bg-surface`, `bg-bg/60`). Small `backdrop-blur-sm` on HUD chips/panels for legibility over
the canvas is fine, but it is not the decorative frosted-glass look — keep that signature for the toast.

## Cel-shaded low-poly look (in-canvas)

- Materials: `meshToonMaterial` + a 3-step gradient ramp via `shared/lib createToonGradient` /
  `shared/hooks useToonGradient`, plus drei `<Outlines>` for the ink edge.
- Lighting: ambient + hemisphere + directional (directional casts shadows).
- Current geometry is **placeholder primitives** (Ground, Block, ZoneMarker, Avatar capsule) using
  the palette tokens as material colors. They exist to prove movement/zones/achievements, not to
  look final.
- **No `troika` / drei `<Text>` in-canvas** — it fetches a font at runtime. All in-world copy is
  rendered in the DOM HUD.

## Anti-patterns — don't

- ❌ Decorative gradients scattered across the UI. The only accepted ambient glow is the large
  blurred `bg-flame/10` / `bg-azure/10` radial blobs behind PRESS START — don't multiply them.
- ❌ Parallax on content text (explicitly banned by the design direction).
- ❌ Any motion without a reduced-motion guard (`motion-safe:` or relying on the global MotionConfig).
- ❌ Glass / frosted `backdrop-blur` surfaces outside the achievement toast.
- ❌ Hardcoded hex or new ad-hoc colors — extend `@theme` tokens instead, and only with Matías.
- ❌ Network/custom web fonts.
- ❌ Polishing placeholder 3D primitives toward "final" — real art lands later with Matías.
