---
name: clean-code-typescript
description: Use when writing or reviewing TypeScript in portfolio v4 — a strict-flag type error (possibly undefined, exactOptionalPropertyTypes, verbatimModuleSyntax), modelling static data or ids, typing bilingual content, narrowing params, or deciding whether a value needs zod.
---

# Clean TypeScript for portfolio v4

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
import { profile, projects } from './profile';
```

Mixed in one statement: `import { localize, type Localized } from '@content/index';`.

### `noUncheckedIndexedAccess` → array/record access is `T | undefined`

Indexing an array or `Record` yields `T | undefined`. Guard it; never assume presence.

```ts
const first = TROPHIES[0]; // type is Trophy | undefined
if (!first) return;

// .find already returns T | undefined — handle the miss explicitly:
const found = TROPHIES.find((t) => t.id === id);
if (!found) throw new Error(`Unknown trophy id: ${id}`);
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
a plain union: `type Theme = 'light' | 'dark';`.

```ts
const THEMES = { light: 'light', dark: 'dark' } as const;
type Theme = (typeof THEMES)[keyof typeof THEMES];
```

## `as const satisfies T` — validate shape, keep literals

This is the key pattern for any static data whose strings double as type-checked keys. Plain
`satisfies T` widens nothing but a bare object isn't readonly; `as const` alone gives literals but no
shape check. Combine them. The trophy catalogue (P7) is the model:

```ts
export interface TrophyDef {
  readonly id: TrophyEvent; // the closed union from src/shared/events/trophy-bus.ts
  readonly messageKey: string; // key under the `Trophies` i18n namespace
}

export const TROPHIES = [
  { id: 'finish-line', messageKey: 'finishLine' },
  { id: 'email-copied', messageKey: 'emailCopied' },
] as const satisfies readonly TrophyDef[];

export type TrophyId = (typeof TROPHIES)[number]['id']; // literal union, not string
```

Drop `as const` and `id` widens to `string`: callers could unlock a trophy that does not exist and
next-intl could no longer type-check the message keys.

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
single-language strings in content. Unknown facts are `pending('what is missing')`, a typed marker
the UI renders as a dashed Placeholder — never a made-up value.

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
through that barrel (`@features/records`), never deep paths. `shared/` has no barrels. Re-export
types alongside values: `export type { RecordItem } from './model';`.

## Zod only at the trust boundary

Content in `src/content` is authored in TS and proved by the compiler: no runtime schema. Zod is
for data from outside the repo: the contact form (`features/contact/model.ts` holds the schema,
parsed in the Server Action) and anything read from `localStorage` (trophies, theme, sound),
which a user or an older version may have written in another shape.

## Anti-patterns → fixes

- **`enum Theme { ... }`** → `as const` object or a string union.
- **`const t = TROPHIES[0]; t.id`** → `noUncheckedIndexedAccess` makes `t` possibly `undefined`;
  guard with `if (!t) ...` first.
- **Plain `import { Locale }` for a type** → fails under `verbatimModuleSyntax`; use `import type`.
- **`{ url: maybeUrl ?? undefined }`** → `exactOptionalPropertyTypes` rejects it; omit the key or
  spread conditionally.
- **`as const satisfies` dropped to just `[...]`** → `id`/`messageKey` widen to `string`, breaking the
  `TrophyId` union and typed i18n keys. Keep both keywords.
- **`name as Locale`** → no validation; use `hasLocale(routing.locales, name)` to narrow.
- **Deep import `@features/records/components/…`** → import from `@features/records` (the index).
- **Mutable content fields / single-language strings** → keep fields `readonly` and bilingual via
  `Localized`; collapse with `localize` at render.
- **Zod over in-repo content** → unnecessary; **`JSON.parse(localStorage…)` without zod** → a crash waiting for old data.
- **`forwardRef`** → `ref` is a regular prop in React 19.
