import type { Locale } from '@/i18n/routing';
import { localize, profile } from '@content/index';
import { absoluteUrl } from '@shared/config/seo';
import { site } from '@shared/config/site';

type Node = Record<string, unknown>;

// Structured data for the home page; every value comes from content/ or the site config.
export function personSchema(locale: Locale): Node {
  return {
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.fullName,
    jobTitle: localize(profile.role, locale),
    url: absoluteUrl(locale, '/'),
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: profile.city },
    sameAs: profile.socials.map((social) => social.href),
    knowsLanguage: profile.languages.map((language) => language.name.en),
  };
}

export function websiteSchema(locale: Locale): Node {
  return { '@type': 'WebSite', name: site.name, url: absoluteUrl(locale, '/'), inLanguage: locale };
}

// `<` is escaped so no string in the data can end the inline script early.
export function jsonLd(graph: Node[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
    /</g,
    '\\u003c',
  );
}
