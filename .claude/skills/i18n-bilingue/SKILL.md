---
name: i18n-bilingue
description: Use when adding, translating or wiring any user-facing text in portfolio v4 — a new label, aria text, section copy, Spanish translation, locale switch, /es route, hreflang, or a missing-message / parity test failure.
---

# i18n: bilingual EN/ES with next-intl 4

The site ships in two locales: **EN is the default and has no URL prefix** (`/`, `/cv`),
**ES is prefixed** (`/es`, `/es/cv`). Two layers of text coexist and must not be mixed:

- **UI chrome** (buttons, labels, headings, meta) → `src/messages/{en,es}.json`, read via `useTranslations` / `getTranslations`.
- **Portfolio domain content** (bio, records, experience, captions, projects) → `src/content` as `Localized` values, resolved with `localize()`. Unknown facts → `pending()`.

Parity tests fail if a message key or a `Localized` value exists in one language only.

## Wiring (read these before touching i18n)

`src/i18n/routing.ts` — the single routing contract:

```ts
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // EN unprefixed, ES => /es
});
export type Locale = (typeof routing.locales)[number];
```

`src/proxy.ts` — Next 16 renamed `middleware` → `proxy`; the next-intl handler is identical:

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'], // skip internals + files
};
```

`src/i18n/request.ts` — resolves the active locale and loads its message JSON. Always
`await requestLocale` and narrow with `hasLocale` before importing:

```ts
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const messages = (await import(`../messages/${locale}.json`)).default as Record<string, unknown>;
  return { locale, messages };
});
```

`src/i18n/navigation.ts` — locale-aware navigation primitives. **Use these, not `next/link` / `next/navigation`**, so the active locale is preserved across links/redirects:

```ts
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```

## The `[locale]` layout pattern

`params` is async in Next 16. Await it, narrow it, then call `setRequestLocale` so the page
renders statically. See `src/app/[locale]/layout.tsx`:

```tsx
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale); // REQUIRED for static rendering
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

`params` is typed `Promise<{ locale: string }>` — it arrives as a wide `string` and **must** be
narrowed with `hasLocale` before it is usable as a `Locale`. In `generateMetadata`, fall back to
`routing.defaultLocale` rather than 404'ing the metadata pass.

Every server component / layout that needs translations or static rendering must call
`setRequestLocale(locale)` first.

## Typed messages

`src/global.d.ts` augments next-intl's `AppConfig` so locales and message keys are compile-checked:

```ts
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing)['locales'][number];
    Messages: typeof messages; // typeof en.json
  }
}
```

Consequence: `t('Header.hire')` is autocompleted and a typo is a type error. `en.json` is the source
of truth for the key shape — **add a key to both `en.json` and `es.json`**, or types/builds break.

### Reading UI chrome

```tsx
// server component / layout
const t = await getTranslations({ locale, namespace: 'Meta' });
t('title');

// client component
const t = useTranslations('Header');
t('hire');
```

## Domain content: `Localized` + `localize()`

Portfolio copy is bilingual by construction. `src/content/types.ts`:

```ts
export type Localized = Record<Locale, string>; // { en: '…', es: '…' }
```

Content objects (`profile`, `records`, `experience`, `projects`…) hold `Localized` fields. Resolve to a string for
the active locale with `localize()` from `src/content`:

```ts
import { localize, profile } from '@content/index';
const role = localize(profile.role, locale); // locale is a narrowed Locale
```

`localize` is just `value[locale]` — pass a real `Locale`, never an unchecked `string`.

## Anti-patterns

- **Hardcoded user-facing strings** in JSX/TS. Every visible string is either a message key or a
  `Localized` content value. No literals.
- **Domain content in `messages/*.json`** (e.g. a project description) — that belongs in
  `src/content` as `Localized`. Conversely, **UI labels in `src/content`** is wrong; chrome lives
  in messages.
- **Forgetting `setRequestLocale(locale)`** in a server component/layout — it silently breaks
  static rendering and opts the route into dynamic rendering.
- **Using the raw `string` locale** without `hasLocale` narrowing before passing it to `localize`,
  `getTranslations({ locale })`, or anything typed `Locale`.
- **`next/link` / `next/navigation`** for internal nav — use the `@/i18n/navigation` exports so the
  ES prefix is preserved.
- **Adding a key to only one message file.** `en.json` defines the typed shape; `es.json` must
  mirror it exactly or `typecheck`/`build` fail.
- **Hardcoding `/es/...` paths.** Let `localePrefix: 'as-needed'` + the navigation `Link` add the
  prefix; EN must stay unprefixed.

## Spanish that sounds native

Translate the idea, not the words. Use the voice of a Spanish developer from Málaga: direct, warm,
tú, no corporate passive. Fixed section names (decided, keep them):

| EN                        | ES                                |
| ------------------------- | --------------------------------- |
| Personal records          | Récords personales                |
| Training log              | Diario de entreno                 |
| Off the clock             | Fuera del horario                 |
| Projects                  | Proyectos                         |
| Hire me                   | Contrátame                        |
| Let's build it end to end | Construyámoslo de principio a fin |
| Trophy unlocked           | Trofeo desbloqueado               |

Keep tech names, units and numbers as they are (`90 s → 1 s`, `Lighthouse 100`). Dates and times go
through `Intl` with the active locale (`es-ES` / `en-GB`), timezone `Europe/Madrid`.

- **Literal calques** ("Registro de entrenamiento", "Fuera del reloj") → use the table above.
