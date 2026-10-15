import type { Metadata } from 'next';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { site } from './site';

export function absoluteUrl(locale: Locale, path: string): string {
  return new URL(localizedPath(locale, path), site.url).toString();
}

// The canonical URL of a page (English only, so no hreflang alternates).
export function alternatesFor(locale: Locale, path: string): { canonical: string } {
  return { canonical: absoluteUrl(locale, path) };
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
