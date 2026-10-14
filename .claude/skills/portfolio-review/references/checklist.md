# Portfolio v4 review checklist

The rules come from `docs/architecture.md`, `DESIGN.md` and `CLAUDE.md`. If a rule here disagrees
with those files, the files win: report the drift.

## Contents

1. Layers and boundaries · 2. Components and styles · 3. Comments · 4. Next 16, server and client ·
2. Content and i18n · 6. Motion · 7. Responsive and big screens · 8. Accessibility · 9. Performance ·
3. Tests · 11. Docs · 12. Simplification

## 1. Layers and boundaries

- Features never import another feature or `app/`; cross-feature effects use `emitTrophy` from
  `src/shared/events/trophy-bus.ts`, and only `features/trophies` calls `onTrophy`.
- Outside a feature, import its `index.ts` only. `shared/` has no barrels and no domain words.
- Routes are thin: narrow `locale` with `hasLocale`, `setRequestLocale`, render features.
- Why: P3–P7 run in sequence; a leak means a later phase edits code it shouldn't own.

## 2. Components and styles

- `Name/Name.tsx` + `Name.variants.ts` (CVA). No inline class string over 4 classes in `.tsx`.
- Tokens only; no hex outside `globals.css` / `src/app/brand.ts`; rem units; `cqi` for giant type.
- React 19: `ref` is a prop, no `forwardRef`. No `useMemo`/`useCallback` without a measured reason
  (React Compiler).
- `"use client"` only on interactive leaves; server children passed through, not pulled in.

## 3. Comments

- ≤ 3 lines each (ESLint), why not what, no explanation split across blocks to dodge the rule.

## 4. Next 16, server and client

- Check `node_modules/next/dist/docs/` for every Next API in the diff (async `params`, `proxy.ts`,
  `next/og`, metadata routes, Server Actions, view transitions).
- Server Actions: zod parse, honeypot, rate limit, typed result; never throw raw errors to the UI;
  secrets read in `src/server/env.ts` only; no secret in a client bundle (`grep` the `.next/static`
  output for `RESEND`).
- Effects only to sync with external systems; listeners and observers cleaned up.
- `localStorage` access wrapped in try/catch and parsed with zod (theme, trophies, sound).

## 5. Content and i18n

- Every visible string is a message key or `Localized` content. EN and ES both present (parity
  tests). Spanish reads native (i18n-bilingue glossary).
- Career facts: nothing invented. Unknown → `pending()`, rendered as Placeholder, listed by
  `pnpm content:pending`.
- Photos: never `mylove.webp`. `lamama.webp` captioned as Matías with his mother (Camino de
  Santiago), separate from the friends photos. About copy never mentions a girlfriend.
- Internal links via `@/i18n/navigation` so `/es` is kept.

## 6. Motion (DESIGN.md § Motion)

- Durations/eases from `src/shared/motion/tokens.ts`. Only transform/opacity/clip-path.
- Server HTML is the final state; pending/hidden classes only from JS, only below the fold.
- Reduced motion: no movement. Pointer effects only on `(pointer: fine)`.
- No `transition-all`, no scroll hijacking, no smooth-scroll libraries, no custom cursor.

## 7. Responsive and big screens

- 360 px: no horizontal scroll, nothing clipped, 44 px targets.
- ≥1920/2560/3840: root font-size steps apply; composition identical, larger; container 85rem.
- Images: `next/image` with a `sizes` that matches the rendered width at each breakpoint.

## 8. Accessibility

- One h1 per page; headings in order; landmarks named; skip link first in tab order.
- Visible `:focus-visible` on everything focusable; never `outline: none` without a replacement.
- Dialogs (menu, lightbox, shelf): focus trapped, Esc closes, focus returns to the opener,
  background inert.
- Live regions for toasts/copy feedback (`role="status"`); errors `role="alert"` and say what to do.
- Decorative duplicates (marquee copies) are `aria-hidden`; meaningful images have real alt text.
- Contrast: new tokens join `src/app/contrast.test.ts` (both themes).

## 9. Performance

- Home first-load JS ≤ 130 kB gz (build output). LCP element is server-rendered text or a
  `priority` image. CLS < 0.02: image dimensions, `next/font`, no late-inserted content above content.
- Heavy client code (lightbox, form, trophy shelf) loaded on demand.

## 10. Tests

- Every `model.ts`, the bus, formatters, schemas and content parity have tests that would fail if
  the behaviour broke; names describe behaviour. A test that can't fail is a finding.
- e2e covers the touched flow in both locales; axe has zero violations on touched routes.

## 11. Docs

- A change to a rule, token, motion or layer is reflected in DESIGN.md / architecture.md / the
  skills in the same phase. `docs/redesign/v4/loop-state.md` and `verify/pN.md` match what ran.

## 12. Simplification

Flag, with the smaller version spelled out:

- Re-implemented helpers that exist in `shared/lib` or a `model.ts`.
- Unreachable branches, checks for states the types exclude, options nobody passes.
- Duplicated logic across components that should be one hook or molecule.
- Derivable state, effects that should be events, client components that could be server ones.
- Comment walls, restating comments.
- `any`, `as` casts, `!` hiding a real null case; magic strings repeated across files.
