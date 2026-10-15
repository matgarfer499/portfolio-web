# 0004 — From a 3D game to the PR Board

- Status: Accepted
- Date: 2026-10-14
- Supersedes: 0001 (portfolio as a game). Amends 0002 (stack) and 0003 (feature boundaries).

## Context

v3 turned the portfolio into an explorable 3D world (React Three Fiber, Rapier, a rigged avatar)
with a parallel "fast" HTML layer for crawlers and phones. After the vertical slice the costs were
clear:

- **Time to the message.** Recruiters and tech leads give a portfolio seconds. A game asks for a
  click, a load and a walk before the first fact appears.
- **Two layers, one truth.** Every piece of content had to render twice (canvas HUD and fast HTML),
  and the fast layer was the one search engines and most phones actually saw.
- **Weight and reach.** three.js + physics + models made the game the heaviest page on the site and
  the hardest to make accessible, responsive down to 360 px and up to a 4K TV.
- **Art debt.** The look was placeholder primitives; a finished world needed modelling time that
  does not show engineering skill.

The owner designed a replacement in a Claude artifact, the **PR Board**: a sports-brand poster
where the career reads like an athlete's record — a giant condensed name, a training photo crossed
by a volt band, a black "personal records" board with before → after numbers, a training-log table,
an "off the clock" gallery, projects and a contact block.

## Decision

Replace the game entirely with the PR Board (branch `v4`).

- **One layer.** Server-rendered HTML is the experience; motion is progressive enhancement that
  never hides server content before hydration.
- **Stack.** Next 16 App Router + React 19 with the React Compiler, Tailwind 4 with CVA
  `.variants.ts`, `motion` (LazyMotion, reduced-motion aware), next-intl 4 (EN default, ES under
  `/es`), zod, zustand only for trophies, Vercel Analytics + Speed Insights. Fonts are Anton and
  Inter Tight through `next/font/google`, self-hosted at build time.
- **Removed.** three, `@react-three/*`, gsap, howler, framer-motion, models, the fast layer and the
  achievements feature (trophies are rebuilt around a typed event bus).
- **Kept from 0003.** Feature folders with a public `index.ts`, no feature imports another feature,
  `shared/` at the bottom of the graph; all enforced by ESLint. Cross-feature effects (a trophy for
  copying the email) travel through `src/shared/events/trophy-bus.ts` instead of the app layer.
- **Engineering conventions** are ported from career-os: 3-line comments (local ESLint rule), CVA
  variants files, token-only colours with a WCAG contrast test, motion tokens, a review skill with
  a pattern scan and a QA matrix (360 px → 3840 px × light/dark × EN/ES).

## Consequences

- The site loads as static HTML with a small client bundle (budget: ≤130 kB gz first load).
- Unknown career facts are typed `pending()` content, rendered as dashed placeholders and listed by
  `pnpm content:pending`, instead of invented copy.
- The game work stays in git history (`v3` branch, tag-free) if it is ever revived as a side project.
- ADR 0001 no longer applies; 0002's 3D choices are void, its Next/TS/next-intl choices stand.
