---
name: pr-board-design
description: Use when styling anything in portfolio v4 (PR Board) — picking a colour, font size, border, spacing or breakpoint, adding hover/scroll/entrance motion, supporting dark mode or big screens (1920 px to 4K TV), or checking a visual idea against the bans (gradients, glass, transition-all, custom cursors).
---

# PR Board design system

`DESIGN.md` holds the values (token front-matter, motion catalogue, responsive table); this skill is
how to apply them. If the two disagree, `DESIGN.md` wins and the drift is a finding.

## Tokens, never values

| Need      | Use                                                                                    | Never                                                    |
| --------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| colour    | `bg-paper text-ink border-ink bg-volt text-on-volt text-steel bg-night text-night-ink` | hex/rgb in a component, `text-black`, opacity-faded text |
| body copy | `text-ink-soft` (long form), `text-steel` (lede, meta)                                 | `ghost` for body text (fails AA on paper)                |
| size      | rem (`text-[1.0625rem]` only via tokens/variants), `cqi` for giant type                | px for type or spacing                                   |
| border    | 2 px ink (hard), 3 px ink (heavy), dashed for `pending()`                              | grey 1 px hairlines as the main structure                |
| radius    | 2 px                                                                                   | rounded cards, pills                                     |
| depth     | offset shadow `4px 4px 0 ink` on hover, `8px 8px 0 ink` toast                          | blur shadows, glow                                       |

A new token is added in `src/app/globals.css` for **both** themes and joins `src/app/contrast.test.ts`.

## Scaling: 360 px phone → 4K TV

- Root font size: 100 % → 112.5 % (≥1920) → 137.5 % (≥2560) → 200 % (≥3840). Everything in rem
  follows; never add a separate "TV layout".
- Container max 85rem + gutters; giant Anton type uses container query units (`cqi`) so it is
  bound to the container, not the viewport.
- Check `scrollWidth === clientWidth` at 360 px: no horizontal scroll, ever.
- Focus ring: 3 px ink outline, 3 px offset (thicker at ≥2560 because it is rem-based); DOM order =
  visual order, so a TV D-pad walks the page top to bottom, left to right.

## Dark mode

`data-theme="dark"` on `<html>`, set before paint by the inline script in the root layout from
`localStorage` or `prefers-color-scheme`. Paper/ink invert; volt and `on-volt` (#111) stay; the
records board uses `night` #171814, one step above the page. Beast mode (Konami) = `data-beast`:
paper becomes volt. Never write `dark:` utilities for colours: the tokens switch, components don't.

## Motion

Import durations/eases from `src/shared/motion/tokens.ts`; CSS uses the same values as custom
properties. The catalogue (what moves where) is in DESIGN.md § Motion. Rules:

1. Server HTML is the final state. JS may set a "pending" class only on elements **below the fold**
   and only after mount; no element is invisible without JS.
2. Only `transform`, `opacity`, `clip-path`. Name each property in `transition-[transform,opacity]`;
   `transition-all` is banned.
3. `prefers-reduced-motion: reduce` → no movement (MotionConfig `reducedMotion="user"` + CSS media
   query). Pointer effects (magnetic, parallax) only under `(pointer: fine)`.
4. Scroll-driven effects observe scroll (rAF-throttled or `animation-timeline`), never take it over.

## Bans (design-taste-frontend guardrails, DESIGN.md wins on values)

Glassmorphism/backdrop blur, gradients, emoji or icon-font icons, custom cursors, smooth-scroll
libraries, scroll hijacking, `transition-all`, animating layout properties, layout shift
(images need width/height or `fill` + sized parent, `next/font` everywhere), content hidden until
hydration, more than one accent colour.

## Common mistakes

| Mistake                                            | Fix                                                |
| -------------------------------------------------- | -------------------------------------------------- |
| `text-[#555A50]`                                   | `text-steel`                                       |
| `font-size: 15vw` on the hero name                 | `cqi` against the capped container                 |
| hiding all `.reveal` elements in CSS by default    | add the pending class from JS, below the fold only |
| `dark:bg-black`                                    | the token already switches; delete it              |
| a hover that only changes colour on keyboard focus | style `:hover` and `:focus-visible` together       |
