import { routing, type Locale } from './routing';

// Client islands link with plain next/link and these helpers, so next-intl's client runtime
// (~12 kB gz) never ships. Mirrors localePrefix 'as-needed': English has no prefix.
export function localizedPath(locale: Locale, path: string): string {
  if (locale === routing.defaultLocale) return path;
  if (path === '/') return `/${locale}`;
  return `/${locale}${path.startsWith('/#') ? path.slice(1) : path}`;
}

const PREFIX = new RegExp(
  `^/(${routing.locales.filter((l) => l !== routing.defaultLocale).join('|')})(?=/|$)`,
);

export function switchLocalePath(pathname: string, to: Locale): string {
  const bare = pathname.replace(PREFIX, '') || '/';
  return localizedPath(to, bare);
}
