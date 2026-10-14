# Architecture

Binding conventions for all code in `src/`. Visual values live in `DESIGN.md`; why the site looks
like this in `docs/adr/0004-from-game-to-pr-board.md`.

## 1. Layers

```
src/
  app/                      Next.js App Router only: routes, layouts, metadata, OG images, sitemap
    [locale]/               layout.tsx (html, providers, theme script) · page.tsx (home)
      projects/[slug]/      case study · cv/ print-ready CV · styleguide/ (dev only, 404 in prod)
  features/<feature>/       one folder per section or capability
    components/<Name>/      Name.tsx + Name.variants.ts (+ Name.test.ts for logic)
    model.ts                pure logic of the feature (no React, no I/O) + model.test.ts
    actions.ts              Server Actions ("use server"), only where a feature mutates
    index.ts                the feature's public API — the only import path from outside
  shared/                   domain-agnostic, imported by file path (no barrels)
    components/atoms/<Name>/        Button, Chip, Label, Display, Placeholder, Container, Section, Icon
    components/molecules/<Name>/
    motion/                 tokens.ts, MotionProvider.tsx, hooks (reduced motion, in-view)
    events/trophy-bus.ts    typed event bus: features emit, only `trophies` listens
    lib/                    cn, formatters, storage (try/catch localStorage)
    config/site.ts          canonical URL (NEXT_PUBLIC_SITE_URL, default https://matiasgarcia.dev)
  server/                   server-only (`import 'server-only'`): env, mail adapter, rate limit
  content/                  typed bilingual content, `pending()` markers, the one content source
  i18n/  messages/          next-intl routing/request config, UI strings (EN/ES)
  proxy.ts                  next-intl locale proxy (Next 16 name for middleware)
```

The atom list grows when needed; a domain-flavoured piece (the records' ratio badge) stays in its
feature. Features: `shell` (header, nav, mobile menu, theme + language switch, scroll progress, footer),
`hero`, `records`, `log`, `about`, `projects`, `contact`, `trophies`, `cv`.

**Dependency direction** (ESLint `no-restricted-imports` enforces it, a violation fails the build):

| Layer          | May import                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| `app/`         | everything; the only place that composes several features                                                     |
| `features/<f>` | its own files, `shared/`, `content/`, `i18n/`, `server/` (actions only) — never another feature, never `app/` |
| `shared/`      | `shared/`, `i18n/` — never `features/`, `app/`, `content/`                                                    |
| `server/`      | `shared/`, `content/`                                                                                         |
| `content/`     | `i18n/` types only                                                                                            |

- **Barrels:** each feature exposes `index.ts`, and so does `content/` (`@content/index`); outside code imports `@features/records`, never a
  deep path. `shared/` has no barrels: import the file (`@shared/components/atoms/Button/Button`).
- **Routes are thin:** a page awaits `params`, narrows the locale with `hasLocale`, calls
  `setRequestLocale`, and renders features. No markup beyond layout glue, no styles.
- **Cross-feature effects** go through the trophy bus, not imports: `emitTrophy('email-copied')`
  in `contact`, the `trophies` feature subscribes. Event names are a closed union in the bus.

## 2. Server and client

- Server Components by default. `"use client"` only on the leaf that needs state, effects or
  browser APIs; pass server-rendered children through it instead of moving a tree to the client.
- **No content hidden until hydration.** Every enhancement (reveal, count-up, marquee speed) starts
  from the final server-rendered state and animates only when JS and motion are allowed.
- `process.env` is read only in `src/server/**` and `src/shared/config/site.ts`
  (`NEXT_PUBLIC_SITE_URL`). Secrets (`RESEND_API_KEY`, `CONTACT_TO`) are read and validated once in
  `src/server/env.ts` and never leave `src/server`.
- **Server Actions** (contact form): zod parse → honeypot → rate limit → adapter → typed result
  `{ ok: true } | { ok: false, reason, fieldErrors? }`. With no API key the action reports
  `reason: 'unconfigured'` and the form shows the mailto fallback.

## 3. Styles: CVA in `.variants.ts`

- Inline class strings of more than 4 classes are not allowed in `.tsx` (pattern-scan flags them).
- Atoms export one `cva` + its `VariantProps` (`buttonVariants`, `ButtonVariantProps`); organisms
  export one object of slots: `export const heroVariants = { root: cva('…'), name: cva('…') }`,
  used as `import { heroVariants as styles } from './Hero.variants'` → `className={styles.root()}`.
- Merge caller overrides with `cn` (`@shared/lib/cn`). Tokens only, never hex values in components
  (DESIGN.md). Units in rem (the root font size scales for big screens).

## 4. Components (React 19)

- Named exports only (`export function Button`), no default exports except where Next requires
  them (pages, layouts, metadata routes).
- `ref` is a regular prop: no `forwardRef`, no `displayName`.
- The React Compiler memoises: no `useMemo`/`useCallback` unless a profiler says so.
- Effects only to sync with the outside world (observers, listeners, timers); derive state in render.
- Every interactive element is reachable by keyboard, has a visible `:focus-visible` ring and a
  ≥44 px (2.75rem) target. Dialogs (menu, lightbox, trophy shelf) trap focus and return it to the
  opener on close.

## 5. Content and i18n

- `src/content/` holds every career fact as typed data with `Localized` strings (`{ en, es }`).
  UI chrome (buttons, labels, aria) lives in `src/messages/{en,es}.json`, typed by `en.json`.
- Unknown facts are `pending('what is missing')`, a `Pending` value (`{ kind: 'pending', note }`)
  accepted wherever a field is typed `Localized | Pending` (or `T | Pending`). It renders as the dashed
  Placeholder atom, and `pnpm content:pending` lists every call with its file and line. Never invent
  a fact or a metric.
- Parity tests fail when a key or a localized value exists in one language only.

## 6. Comments: 3 lines at most

Enforced by `local/max-comment-lines` (`eslint/rules/`, with a RuleTester test that runs in
vitest). Comment the why, never the what; longer explanations go to `docs/` and the comment
links there. Don't split one explanation into several blocks to dodge the rule.

## 7. Tests

- Vitest (`src/**/*.test.ts`, `eslint/**/*.test.mjs`): every `model.ts`, the bus, formatters,
  content parity, the form schema and the contrast of the tokens in both themes.
- Playwright (`tests/e2e`) against the production build: both locales, theme persistence, the 8
  trophies, copy email, form validation, CV, and axe on every route.

## 8. Build plan (v4)

| Phase                       | Scope                                                                                                | Done when                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| P0 Reset & foundations      | Remove the game, port career-os tooling, docs, skills, assets                                        | lint, typecheck, test and build green; no three/R3F code or deps |
| P1 Design system            | Tokens (light/dark), theme script, fonts, rem scaling, motion, atoms, contrast test, dev styleguide  | styleguide screenshots pass the full QA matrix                   |
| P2 Content + i18n           | Typed content for every section, `pending()`, `content:pending`, messages, parity tests              | no untranslated string exists                                    |
| P3 Shell + Hero + footer    | Sticky header, nav, mobile menu, progress bar, hero name reveal, marquee, footer clock               | QA matrix + e2e green for the touched screens                    |
| P4 Records + Training log   | Odometer count-up, strike draw, ratio badge; sticky when column, progress rail, disclosures          | same                                                             |
| P5 Off the clock + Projects | Gallery, lightbox, parallax, mockups, stack, `/projects/[slug]` with view transitions                | same                                                             |
| P6 Contact                  | Copy email, magnetic buttons, availability, Server Action form + Resend adapter + mailto fallback    | same + form validation e2e                                       |
| P7 Trophies                 | 8 trophies on the bus, counter, shelf drawer, toast, sound toggle, Konami beast mode                 | same + 8-trophy e2e                                              |
| P8 CV + SEO + a11y + perf   | `/cv`, metadata, hreflang, sitemap, robots, JSON-LD, OG images, manifest/icons, full e2e, Lighthouse | Lighthouse ≥95 ×4, zero axe violations, budgets met              |
| P9 Close-out                | Whole-branch review, dead code, README, SUMMARY with the human actions                               | summary written, preview checked                                 |
