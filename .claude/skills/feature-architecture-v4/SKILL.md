---
name: feature-architecture-v4
description: Use when adding, moving or wiring code in portfolio v4 (PR Board) — choosing the layer or folder for a file, splitting a component into Name.tsx + Name.variants.ts, making two features react to each other, emitting a trophy, or fixing an import-boundary / no-restricted-imports lint error.
---

# Feature architecture (portfolio v4)

`docs/architecture.md` is the binding source; this is the quick map. ESLint enforces the
boundaries, and `pnpm build` runs ESLint, so a violation fails the Vercel preview.

## Where does this file go?

| It is…                                                                                         | Put it in                                                    |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| a route, layout, metadata, OG image, sitemap                                                   | `src/app/[locale]/…` (thin: narrow locale, render features)  |
| UI or logic of one section (shell, hero, records, log, about, projects, contact, trophies, cv) | `src/features/<f>/`                                          |
| pure logic of that section (formatting, ratios, state machines)                                | `src/features/<f>/model.ts` + `model.test.ts`                |
| a Server Action                                                                                | `src/features/<f>/actions.ts` (`'use server'`)               |
| a design-system piece with no domain words                                                     | `src/shared/components/atoms/<Name>/` or `molecules/<Name>/` |
| motion tokens/provider/hooks                                                                   | `src/shared/motion/`                                         |
| secrets, env, mail adapter, rate limit                                                         | `src/server/` (`import 'server-only'`)                       |
| a career fact or bilingual copy                                                                | `src/content/` (`Localized`, `pending()`)                    |
| button labels, aria text, meta                                                                 | `src/messages/{en,es}.json`                                  |

If it mentions a domain word (record, trophy, project), it is not `shared`.

## Folder contract

```
src/features/records/
  components/RecordCard/RecordCard.tsx
  components/RecordCard/RecordCard.variants.ts
  model.ts  model.test.ts
  index.ts                      // export { RecordsSection } from './components/RecordsSection/RecordsSection';
```

- **Barrels:** a feature's `index.ts` is its only entry: `import { RecordsSection } from '@features/records'`.
  Deep paths (`@features/records/components/…`) are a lint error. `shared/` has **no** barrels:
  `import { Button } from '@shared/components/atoms/Button/Button'`.
- **Variants:** styled component = `Name.tsx` + `Name.variants.ts` (CVA). More than 4 classes inline
  in a `.tsx` is a review finding. Atoms export `nameVariants` + `NameVariantProps`; organisms export
  `nameVariants = { root: cva(…), title: cva(…) }` used as `styles.root()`.

## Boundaries (eslint.config.mjs)

```
app      → features, shared, content, i18n, server     (only layer composing several features)
features → shared, content, i18n, server (actions)     (never another feature, never app)
shared   → shared, i18n                                 (never features, app, content, server)
server   → shared, content                              (never features, app)
content  → i18n types only
```

## Cross-feature effects: the trophy bus

Features never import each other. When one feature's event matters to another (today: trophies),
emit on the typed bus in `src/shared/events/trophy-bus.ts`:

```ts
// in features/contact — after a successful copy
import { emitTrophy } from '@shared/events/trophy-bus';
emitTrophy('email-copied');

// only features/trophies subscribes
const off = onTrophy((event) => unlock(event));
```

The event names are a closed `as const` union in the bus file; adding a trophy means adding the
name there first. Nothing but `trophies` calls `onTrophy`.

## Common mistakes

| Mistake                                                       | Fix                                       |
| ------------------------------------------------------------- | ----------------------------------------- |
| `import { emailCopied } from '@features/trophies'` in contact | `emitTrophy('email-copied')`              |
| Wiring two features with a `useEffect` in `app/`              | Use the bus; `app/` composes markup only  |
| `shared/` atom importing `@content/…`                         | Pass the value as a prop from the feature |
| `process.env.RESEND_API_KEY` in a feature                     | Read env in `src/server/env.ts` only      |
| `export { Button } from './Button'` in `shared/…/index.ts`    | Delete the barrel; import the file        |
| Logic inside a component file                                 | Move it to `model.ts` with a test         |
