# Matías García — portfolio v4 (PR Board)

An editorial, sports-poster portfolio: the career read like an athlete's record board. Giant Anton
type, ink borders, one volt accent, dark only, in English (old `/es` links redirect home),
from 360 px phones to 4K TVs.

**Pages:** the home (hero · personal records · training log · off the clock · projects + stack ·
contact), one page per case study (`/projects/[slug]`), a printable CV (`/cv`), a localized 404.
Six hidden trophies reward exploring (counter in the header, shelf drawer, Konami code included).

## Stack

Next.js 16 (App Router, React Compiler) · React 19 · TypeScript (strict) · Tailwind CSS 4 with CVA
variants · next-intl 4 · zustand (trophies only) · zod (server only) · Resend over `fetch` for the
contact form · `next/og` share images · Vitest · Playwright + axe · Vercel.

All motion is CSS (`transform`/`opacity`/`clip-path`, scroll-driven where supported) and stops
with `prefers-reduced-motion`. Every section is server-rendered and readable without JavaScript.

## Commands

```bash
pnpm install
pnpm dev              # http://localhost:3000 (the dev-only /styleguide shows every atom)
pnpm build            # eslint + next build
pnpm start            # serve the production build
pnpm test             # vitest (models, content parity, contrast, server, SEO)
pnpm test:e2e         # playwright + axe on the production build
pnpm typecheck        # tsc --noEmit
pnpm format           # prettier
pnpm content:pending  # facts the owner still has to fill in
```

Husky + lint-staged run eslint/prettier and commitlint (Conventional Commits) on every commit.

## Editing content

Every career fact lives in `src/content/` — typed (`{ en }` strings, so a language can be added back), never in components:

| File            | What                                                                        |
| --------------- | --------------------------------------------------------------------------- |
| `profile.ts`    | name, role, location, email, socials, availability badge, languages, CV PDF |
| `hero.ts`       | role line, lede, stats                                                      |
| `records.ts`    | personal records (before → after)                                           |
| `experience.ts` | training log entries (jobs, internship, degree) — also the CV               |
| `about.ts`      | "Off the clock" copy and gallery photos (captions, crop focus)              |
| `projects.ts`   | case studies (the first is featured) and the stack groups                   |
| `contact.ts`    | contact headline                                                            |

Unknown facts are written as `pending({ en })`: they render as dashed placeholders and show up
in `pnpm content:pending`. Replace each with the real value. UI strings (labels, buttons) live in
`src/messages/en.json`.

## Contact form

A Server Action (`src/server/contact/`) validates with zod, drops honeypot submissions, rate-limits
per address and sends through Resend. Set in Vercel (Preview + Production):

- `RESEND_API_KEY` — without it the form falls back to opening the visitor's email app.
- `CONTACT_TO` — inbox (defaults to the public email).
- `CONTACT_FROM` — sender on a domain verified in Resend (defaults to `onboarding@resend.dev`).

`NEXT_PUBLIC_SITE_URL` sets canonical URLs (defaults to `https://matiasgarcia.dev`).

## Architecture

`src/app` (routes, metadata, OG images) → `src/features/*` (one folder per section, each with an
`index.ts` barrel) → `src/shared` (atoms, motion helpers, the trophy event bus, config) and
`src/content` / `src/server`. Features never import each other: they emit on the typed trophy bus,
and only `features/trophies` listens. Boundaries are enforced by ESLint.

- Architecture, layers and build plan: [`docs/architecture.md`](docs/architecture.md)
- Design tokens, type, motion catalogue, print, bans: [`DESIGN.md`](DESIGN.md)
- Why the 3D game became a poster: [`docs/adr/0004-from-game-to-pr-board.md`](docs/adr/0004-from-game-to-pr-board.md)
- Contributor rules (also for AI agents): [`CLAUDE.md`](CLAUDE.md), [`AGENTS.md`](AGENTS.md)

## Fonts and assets

Anton and Inter Tight come from `next/font/google`, self-hosted at build time (no runtime font
requests). Share images and icons read the TTFs committed in `assets/fonts/` (SIL OFL, licenses
alongside). Photos, logos and project shots live in `public/`.
