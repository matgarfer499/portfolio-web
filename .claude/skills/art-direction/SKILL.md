---
name: art-direction
description: Use when styling UI, picking colors/fonts, or adding motion in portfolio v3 during the placeholder art phase — defines the palette tokens, system fonts, motion budget, glass policy, and the cel-shaded look so you don't over-invest in non-final visuals.
---

# Art direction (Phase 1 locked · "Costa Azul")

The **palette, type, and motion are locked** (Phase 1, approved with Matías — see
`docs/redesign/04-art-direction.md`). The **geometry/models are still placeholder** until the Phase 3
rebuild (Málaga seaside town, mini-hero avatar, radar HUD, Matadragones climax). Build with the
tokens and rules below; the Phase 3 reskin is a token edit, not a rewrite.

Direction in one line: a **Málaga-inspired coastal town**, **sea-blue-led** (warmth is the rare pop),
**monospace "terminal friki"** type, anime / cel-shaded.

## Palette — "Costa Azul": sea-blue lead, warm accent, deep navy

Tokens live in `src/app/globals.css` under `@theme`. Tailwind 4 generates utilities from each
`--color-*` token (`bg-bg`, `text-azure`, `border-flame`, `bg-surface`, `text-muted`, …). Use the
utilities — never hardcode hex in components.

**Roles:** blue (`azure`) now **leads** (CTAs, focus, the world); orange (`flame`) is the **accent /
rare pop** (the avatar, highlights); `gold` is for achievements. Token names describe the _hue_, not
the role — `flame` is still warm-orange, `azure` still blue.

| Token                | Hex       | Role                                | Generated utilities (examples)           |
| -------------------- | --------- | ----------------------------------- | ---------------------------------------- |
| `--color-bg`         | `#0c1622` | deep-navy page + canvas base        | `bg-bg`, `text-bg`                       |
| `--color-surface`    | `#11202f` | raised surface                      | `bg-surface`                             |
| `--color-surface-2`  | `#16293b` | higher surface                      | `bg-surface-2`                           |
| `--color-azure`      | `#1fb6d6` | **primary/lead** — CTA, focus       | `bg-azure`, `text-azure`, `border-azure` |
| `--color-azure-soft` | `#74d0e6` | soft sea-blue (hovers, fills)       | `text-azure-soft`                        |
| `--color-flame`      | `#ff8a3d` | **accent/pop** — avatar, highlights | `bg-flame`, `text-flame`, `border-flame` |
| `--color-flame-soft` | `#ffb27a` | soft warm                           | `text-flame-soft`                        |
| `--color-gold`       | `#ffd45e` | achievements / stars / climax       | `text-gold`, `bg-gold`                   |
| `--color-ink`        | `#eaf4fb` | primary text                        | `text-ink`, `bg-ink`                     |
| `--color-muted`      | `#94b2c8` | secondary text, labels              | `text-muted`                             |

`color-scheme: dark` is set on `:root`; the site is dark-only. Opacity modifiers are the way to
soften (`text-ink/90`, `bg-bg/60`, `bg-flame/10`), not new tokens. In-canvas world ground uses a warm
sand (`#e9cfa0`) — that's a material color, not a UI token.

Focus ring is global and always visible (WCAG AA): `:focus-visible { outline: 2px solid azure }` (now
sea-blue). Don't remove or override it per-component.

## Typography — "Terminal Friki", system stacks only

Two font tokens, both system stacks — **no network fonts** (keeps PRESS START instant, avoids CLS):

```css
--font-sans:
  ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
--font-mono: ui-monospace, 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace;
```

- **Display + headings use `--font-mono`** — the engineer/friki signature (the name can stylize as
  `Matías_García`). **Body / long copy uses `--font-sans`** for readability.
- `font-mono` also drives labels, kickers, chips, dates, controls.
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
- ❌ Hardcoded hex or new ad-hoc colors — use the locked `@theme` tokens; propose new tokens to Matías.
- ❌ Reviving the old orange-led split — blue (`azure`) leads now; orange (`flame`) is the accent.
- ❌ A sans (or any third typeface) for display/headings — display is mono now.
- ❌ Network/custom web fonts.
- ❌ Polishing placeholder 3D primitives toward "final" — the real Málaga world lands in Phase 3.
