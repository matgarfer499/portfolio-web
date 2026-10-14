# Matías García — portfolio v4 (PR Board)

An editorial, sports-poster portfolio: the career read like an athlete's record. Next.js 16,
React 19, Tailwind 4, next-intl (EN + ES). Work in progress on branch `v4`; the full README lands
with the close-out phase.

- Why it looks like this: [`docs/adr/0004-from-game-to-pr-board.md`](docs/adr/0004-from-game-to-pr-board.md)
- Architecture and build plan: [`docs/architecture.md`](docs/architecture.md)
- Design tokens and motion: [`DESIGN.md`](DESIGN.md)

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # eslint + next build
pnpm test       # vitest
pnpm test:e2e   # playwright on the production build
```
