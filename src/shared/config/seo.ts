import type { Metadata } from 'next';
import { localizedPath } from '@/i18n/paths';
import { routing, type Locale } from '@/i18n/routing';
import { site } from './site';

export function absoluteUrl(locale: Locale, path: string): string {
  return new URL(localizedPath(locale, path), site.url).toString();
}

// Canonical + hreflang for a page that exists in every locale; x-default is the English URL.
export function alternatesFor(
  locale: Locale,
  path: string,
): { canonical: string; languages: Record<Locale | 'x-default', string> } {
  const url = (l: Locale) => absoluteUrl(l, path);
  return {
    canonical: url(locale),
    languages: { en: url('en'), es: url('es'), 'x-default': url(routing.defaultLocale) },
  };
}

// A page's whole share surface. Next merges metadata shallowly: a page that set only `title`
// would keep the home's og:title, so every page sets openGraph and twitter in full.
export function pageMeta({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const alternates = alternatesFor(locale, path);
  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: site.name,
      locale,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
