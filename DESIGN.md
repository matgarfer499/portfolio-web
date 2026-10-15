---
version: 1
name: PR Board
description: "Sports-brand poster portfolio. A career read like an athlete's record: giant condensed name beside a poster of three verbs (build · lead · ship), a night records board with before → after numbers, a training-log table. Hard ink borders, offset shadows, one volt accent. Light and dark."

colors:
  light:
    paper: '#FFFFFF' # page background
    ink: '#111111' # text, borders, dark buttons
    ink-soft: '#2B2D29' # long-form body copy
    steel: '#555A50' # labels, ledes, meta (AA on paper)
    line: '#DCDED8' # hairlines that are not ink borders
    ghost: '#8A8F84' # LARGE text only on paper (≈3.3:1 fails body AA)
    volt: '#D4FF1F' # the one accent: hero ship row, CTA, highlights, toast
    on-volt: '#111111' # text on volt, both themes
    night: '#111111' # records board background
    night-ink: '#FFFFFF' # text on night
    night-muted: '#B9BDB3' # labels on night
    night-ghost: '#8A8F84' # struck-through "before" values on the board
    night-line: '#2E302B' # grid gaps of the board
  dark: # paper/ink invert; values below proven by src/app/contrast.test.ts (P1)
    paper: '#0E0F0C'
    ink: '#F2F3EE'
    ink-soft: '#D9DCD4'
    steel: '#A3A89B'
    line: '#2E302B'
    ghost: '#8A8F84'
    volt: '#D4FF1F' # unchanged
    on-volt: '#111111' # ink-black on volt, never the inverted ink
    night: '#171814' # elevated above the page so the board still reads as a board
    night-ink: '#F2F3EE'
    night-muted: '#B9BDB3'
    night-line: '#34362F'

typography:
  display: { family: Anton, transform: uppercase, lineHeight: 0.9, tracking: 0.005em, weight: 400 }
  body:
    { family: Inter Tight, size: 1.0625rem, lineHeight: 1.55, weights: [400, 500, 600, 700, 800] }
  label: { size: 0.8125rem, weight: 700, tracking: 0.12em, transform: uppercase, color: steel }
  role: { size: 'clamp(1.625rem, 2.4cqi, 2.125rem)', weight: 800, lineHeight: 1.1 }
  section-title: { family: Anton, size: 'clamp(3.5rem, 7cqi, 6.875rem)' }
  hero-name:
    { family: Anton, size: '15.2cqi (≥820px) · 31.5cqi stacked (<820px)', lineHeight: 0.82 }
  numbers: tabular-nums

scale:
  root-font-size: { default: 100%, '>=1920px': 112.5%, '>=2560px': 137.5%, '>=3840px': 200% }
  container: { max: 85rem, gutter: '2rem (≥820px) · 1rem (<820px)' }
  breakpoints: { stack: 51.25rem, board-2col: 68.75rem }

borders:
  { hard: 2px ink, heavy: 3px ink, dashed-placeholder: 2-3px dashed currentColor, radius: 2px }
shadow: { offset: '4px 4px 0 ink (button hover)', toast: '8px 8px 0 ink' }
spacing: { section: '5.5rem block (3.5rem <820px)', touch-target: 2.75rem }
motion:
  {
    tokens: src/shared/motion/tokens.ts,
    properties: [transform, opacity, clip-path],
    respect: prefers-reduced-motion,
  }
---

## Overview

The page is a poster, not a dashboard: one idea per band, huge Anton type, hard 2–3 px ink borders
and a single chromatic accent, **volt #D4FF1F**. The career is framed as training: personal records
(before → after production numbers), a training log (experience), off the clock (the person),
projects, and a finish line (contact).

Volt marks: the hero's "ship" row, the primary CTA, `<mark>` highlights, record values on the night board,
the toast, the scroll-progress bar and focus accents. Nothing else is volt. Text on volt is always
`on-volt` (#111111), in both themes.

## Colors

- Use the tokens in `src/app/globals.css` (`bg-paper`, `text-ink`, `text-steel`, `bg-volt`, …).
  Never a hex value in a component. A new text or surface token joins the contrast test.
- `ghost` is for large display text or the night board only.
- **Dark theme** inverts paper and ink; volt stays; the records board becomes `night` #171814,
  slightly lighter than the page, so it still reads as a raised board. System preference by
  default, a toggle, persisted, applied before paint by an inline head script (no flash).
- **Beast mode** (Konami trophy) swaps paper for volt and keeps ink #111 in either theme; steel and
  ghost darken to #3D4139 so they still pass on volt. The night board keeps its own tokens.
- No gradients, no glass, no glow, no pure decoration.

## Surfaces

`Section tone="night"` and `tone="volt"` add `.surface-night` / `.surface-volt` (globals.css), which
remap `paper`, `ink`, `ink-soft`, `steel` and `ring` for everything inside. Atoms never need a
"on night" variant: a default Button on the night board is night with a light border, a dark
Button is light; on the volt band buttons are white/black in both themes. New surfaces follow the
same pattern and join the contrast test.

## Typography

- **Anton** for display (names, section titles, numbers, record values, card titles), uppercase.
- **Inter Tight** for everything else; labels are 700 uppercase with 0.12em tracking.
- Both via `next/font/google` (self-hosted at build, no runtime request). Numbers use
  `tabular-nums` so counters don't jitter.
- Big type is sized with container query units (`cqi`) against the 85rem container, so a 4K TV
  sees the same composition larger, never a tiny column or a name wider than the page.

## Layout

Home, in order: sticky header · hero · personal records · training log · off the clock · projects
(+ stack) · contact (+ footer). Container max 85rem with 2rem gutters (1rem under 820 px). Root
font size steps up at 1920/2560/3840 px so everything in rem scales together. No horizontal scroll
at any width from 360 px up.

## Components

- **Button**: 52 px min height (44 px in the header), 2 px ink border, radius 2 px, 700 uppercase
  0.06em. Variants: default (paper), volt, dark (ink). Hover/focus lifts (-2px, -2px) with a 4 px
  offset shadow (ink; volt on dark buttons). Press returns to rest.
- **Chip**: 2 px ink border, 700 0.8125rem, paper background.
- **Label**: the eyebrow style above.
- **Display**: Anton heading with size variants (hero, section, card, stat).
- **Placeholder**: dashed 2–3 px block for `pending()` content: it says what is missing.
- **Container / Section**: width cap + gutters; section block padding and an anchor id.
- **Icon**: inline SVG, `currentColor`, 2.6 stroke for arrows, `aria-hidden` unless it is the only
  label. No emoji, no icon fonts.

## Motion

Tokens live in `src/shared/motion/tokens.ts` (durations, eases, the toast spring). Only transform,
opacity and clip-path animate. Every effect has a reduced-motion version (usually: none) and starts
from server-rendered final content.

| Effect           | Where                        | Spec                                                                                                      |
| ---------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| Name mask reveal | Hero                         | per letter, clip-path inset bottom → 0, 60 ms stagger, CSS on load                                        |
| Scroll progress  | Header                       | volt bar, scaleX from scroll position                                                                     |
| Mobile menu      | Header                       | full-screen, giant Anton links staggered in                                                               |
| Count-up         | Records                      | odometer digits, ease-out cubic 1.4 s, once in view                                                       |
| Strike draw      | Records                      | the "before" line-through drawn left → right                                                              |
| Record flash     | Records                      | volt top bar: on pointer hover, and once as a card finishes counting                                      |
| Reveal           | Below the fold only          | opacity + 28 px rise, 0.6 s, `cubic-bezier(.2,.7,.2,1)`                                                   |
| Progress rail    | Training log                 | named view timeline, fills along a mid-viewport reading line; none without support or with reduced motion |
| Toast            | Trophies                     | `cubic-bezier(.34,1.56,.64,1)` 0.55 s rise, rotated -3deg, stays 4.2 s; one always-mounted live region    |
| Counter pop      | Header trophies              | the X/8 digits scale 1 → 1.35 → 1 in 300 ms on unlock (motion-safe)                                       |
| Trophy shelf     | Header trophies              | drawer slides from the right via `@starting-style`, 300 ms; instant with reduced motion                   |
| Button hover     | Everywhere                   | translate(-2px,-2px) + offset shadow, 150 ms                                                              |
| Magnetic         | Contact (pointer: fine only) | `transform` toward the pointer, max 6 px (composes with the hover lift's `translate`)                     |
| Copy burst       | Contact                      | five ink rays out of the button's top-right corner, 450 ms, once per copy; none with reduced motion       |
| Availability dot | Contact                      | ring scales 1 → 2.6 and fades, 1.8 s loop; static with reduced motion                                     |
| Parallax         | About (pointer: fine only)   | ≤12 px translate on pointer move, per-photo depth                                                         |
| Mockup depth     | Projects                     | laptop/phone rise at their own `--rise` on the card's view timeline; none without support/reduced motion  |
| Page transition  | Case links                   | typed `nav-forward`/`nav-back` slide 400 ms; title + shot morph by shared name; hash links none           |

## Print

The /cv page prints as an A4 document: `@media print` forces the light tokens with
`html:root:not(#print)` (beats dark and beast mode without `!important`), `@page` A4 with 14 mm
margins, 10 pt root; header, footer, toast and the CV toolbar are `print:hidden`; entries
`break-inside: avoid`.

## Do's and Don'ts

Do

- Lead every section with a giant Anton title and one line of steel context.
- Keep volt scarce; keep borders ink.
- Prove contrast in `src/app/contrast.test.ts` (WCAG AA both themes).
- 44 px targets, `:focus-visible` everywhere (3 px ink outline, 3 px offset; thicker at TV sizes).

Don't

- Glassmorphism, gradients, emoji icons, custom cursors, smooth-scroll libraries or scroll hijacking.
- `transition: all`, or animating layout properties (width, height, top, margin…).
- Layout shift (images have dimensions, fonts use `next/font` fallbacks with size-adjust).
- Content hidden until hydration.

## Responsive behavior

| Width                   | Change                                                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| < 820 px                | nav → full-screen menu, hero name stacks, hero grid single column, board 1 col, log rows become disclosures, gallery 2 col |
| 820–1100 px             | board 2 col, log 2 col (when + content)                                                                                    |
| ≥ 1100 px               | full layout: board 4 col, log 4 col                                                                                        |
| ≥ 1920 / 2560 / 3840 px | root font size 112.5 / 137.5 / 200 %: same composition, larger                                                             |

## Agent prompt guide

Read this file first, then `docs/architecture.md`. Style only with the tokens mapped in
`src/app/globals.css`, in `Name.variants.ts` files with CVA. The `pr-board-design` skill holds the
catalogue and the bans; `design-taste-frontend` rules apply as guardrails, this file wins on values.
