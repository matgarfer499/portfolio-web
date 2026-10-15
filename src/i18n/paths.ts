import { routing, type Locale } from './routing';

// Client islands link with plain next/link and these helpers, so next-intl's client runtime
// (~12 kB gz) never ships. Mirrors localePrefix 'as-needed': English has no prefix.
export function localizedPath(locale: Locale, path: string): string {
  if (locale === routing.defaultLocale) return path;
  if (path === '/') return `/${locale}`;
  return `/${locale}${path.startsWith('/#') ? path.slice(1) : path}`;
}
