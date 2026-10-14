import { localizedPath } from '@/i18n/paths';
import { routing, type Locale } from '@/i18n/routing';
import { site } from './site';

export function absoluteUrl(locale: Locale, path: string): string {
  return new URL(localizedPath(locale, path), site.url).toString();
}

// Canonical + hreflang for a page that exists in every locale; x-default is the English URL.
export function alternatesFor(locale: Locale, path: string) {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, absoluteUrl(l, path)]),
  ) as Record<Locale, string>;
  return {
    canonical: absoluteUrl(locale, path),
    languages: { ...languages, 'x-default': languages[routing.defaultLocale] },
  };
}
