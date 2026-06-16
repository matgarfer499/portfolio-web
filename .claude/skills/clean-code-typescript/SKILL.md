---
name: clean-code-typescript
description: Use when writing or reviewing TypeScript in portfolio v3 — covers the strict compiler flags, no-enums, as-const-satisfies, readonly content types, type-guard narrowing, and the per-feature public API.
---

# Clean TypeScript for portfolio v3

This repo runs TypeScript 6 with the strictest practical flag set. The flags are not decoration —
each one changes how you write everyday code. Match the existing files; do not loosen `tsconfig.json`.

## The strict flags and what they force

`tsconfig.json` enables `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
`verbatimModuleSyntax`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitOverride`,
`noFallthroughCasesInSwitch`. The three that change daily code most:

### `verbatimModuleSyntax` → `import type` for type-only imports

Type-only imports must say so, or the build fails. Values use a plain `import`.

```ts
import type { Locale } from '@/i18n/routing';
import type { Localized } from './types';
import { profile, zones, projects } from './profile';
```

Mixed in one statement: `import { localize, type Localized } from '@content/index';`.

### `noUncheckedIndexedAccess` → array/record access is `T | undefined`

Indexing an array or `Record` yields `T | undefined`. Guard it; never assume presence.

```ts
const first = ACHIEVEMENTS[0]; // type is Achievement | undefined
if (!first) return;

// .find already returns T | undefined — handle the miss explicitly:
const found = ACHIEVEMENTS.find((a) => a.id === id);
if (!found) throw new Error(`Unknown achievement id: ${id}`);
return found;
```

For `Localized` (a `Record<Locale, string>`) keyed by a validated `Locale`, access is safe because
the locale was already narrowed with `hasLocale` upstream — that's why `localize` can just return
`value[locale]`.

### `exactOptionalPropertyTypes` → omit optional keys, don't pass `undefined`

`url?: string` accepts a `string` or absence — **not** `undefined`. Omit the key instead.

```ts
// Project has `url?: string` and `repo?: string`
const p: Project = { id, name, tagline, description, stack }; // ok — keys omitted
// const p: Project = { ...rest, url: maybeUrl ?? undefined }; // ✗ type error
const p2: Project = maybeUrl ? { ...base, url: maybeUrl } : base; // ok
```

## No enums — `const` objects with `as const`

Never use `enum`. Use a frozen object literal plus a derived union type. Or, for finite string sets,
a plain union: `export type Accent = 'flame' | 'azure';` (see `content/types.ts`).

```ts
const ACCENTS = { flame: 'flame', azure: 'azure' } as const;
type Accent = (typeof ACCENTS)[keyof typeof ACCENTS];
```

## `as const satisfies T` — validate shape, keep literals

This is the key pattern for any static data whose strings double as type-checked keys. Plain
`satisfies T` widens nothing but a bare object isn't readonly; `as const` alone gives literals but no
shape check. Combine them. From `features/achievements/catalog.ts`:

```ts
export interface AchievementDef {
  readonly id: string;
  readonly messageKey: string; // key under the `Achievements` i18n namespace
  readonly icon: string;
}

export const ACHIEVEMENTS = [
  { id: 'first-contact', messageKey: 'firstContact', icon: '🎯' },
] as const satisfies readonly AchievementDef[];

export type Achievement = (typeof ACHIEVEMENTS)[number];
export type AchievementId = Achievement['id']; // 'first-contact', not string
```

Why it matters here: `AchievementId` stays a literal union, so `getAchievement(id)` callers can't
pass an arbitrary string, and `messageKey` literals flow into `useTranslations('Achievements')`
lookups that next-intl type-checks (via the `Messages` augmentation in `global.d.ts`). If you drop
`as const`, `id` widens to `string` and both guarantees vanish.

## `readonly` and the `Localized` content type

Content interfaces are fully `readonly`, including array fields (`readonly string[]`). Domain content
is bilingual by construction:

```ts
export type Localized = Record<Locale, string>;

export interface Profile {
  readonly name: string;
  readonly role: Localized;
  readonly socials: SocialLinks; // also all-readonly
}
```

Resolve to one language only at render time with `localize(value, locale)`. Do not store
single-language strings in content — store `Localized` so both the game layer and the fast layer read
the same source.

## Narrowing with type guards

Validate untrusted strings (route params, etc.) with a guard before treating them as a `Locale`. Use
next-intl's `hasLocale`, which narrows:

```ts
const { locale } = await params; // Next 16 async params: string
if (!hasLocale(routing.locales, locale)) notFound();
// locale is now Locale here
setRequestLocale(locale);
```

After the guard, `Record<Locale, string>` indexing is safe and `localize` needs no extra check.

## Per-feature public API via `index.ts`

Each feature exposes exactly what it wants consumed through its `index.ts`. Import features only
through that barrel (`@features/world`), never deep paths. Re-export types alongside values:

```ts
export { profile, zones, projects } from './profile';
export type { Profile, Project, Zone, Localized, SocialLinks, Accent } from './types';
```

## No Zod — content is plain typed TS

There is intentionally no runtime schema validation. The content in `src/content` is authored by hand
in TypeScript and checked by the compiler against the `readonly` interfaces in `types.ts`. There is no
CMS, no user input, no network-sourced content — the data ships in the bundle, so a Zod parse would
validate values the type system already proves at build time. Add Zod only if a future phase ingests
data from outside the repo (an API, a form, a CMS). Until then, the interface _is_ the schema.

## Anti-patterns → fixes

- **`enum Accent { ... }`** → `as const` object or a string union (`type Accent = 'flame' | 'azure'`).
- **`const a = ACHIEVEMENTS[0]; a.id`** → `noUncheckedIndexedAccess` makes `a` possibly `undefined`;
  guard with `if (!a) ...` first.
- **Plain `import { Locale }` for a type** → fails under `verbatimModuleSyntax`; use `import type`.
- **`{ url: maybeUrl ?? undefined }`** → `exactOptionalPropertyTypes` rejects it; omit the key or
  spread conditionally.
- **`as const satisfies` dropped to just `[...]`** → `id`/`messageKey` widen to `string`, breaking the
  `AchievementId` union and typed i18n keys. Keep both keywords.
- **`name as Locale`** → no validation; use `hasLocale(routing.locales, name)` to narrow.
- **Deep import `@features/world/components/Scene`** → import from `@features/world` (the index).
- **Mutable content fields / single-language strings** → keep fields `readonly` and bilingual via
  `Localized`; collapse with `localize` at render.
- **Reaching for Zod to "be safe"** → unnecessary for in-repo typed content; the compiler covers it.
