import { hasLocale } from 'next-intl';
import { defineRouting } from 'next-intl/routing';

// English only, with no prefix (`/`, `/cv`). The [locale] segment stays so a language can be
// added back later; old `/es` links redirect home (next.config.ts).
export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // `/` is always English: the same URL gives every visitor and crawler the same page.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

// For places that get a raw segment and must render something (metadata, images, not-found).
export function toLocale(value: string): Locale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}

/** The BCP 47 tag each locale formats dates and numbers with (British English: "14 Oct", 24 h). */
export const INTL_LOCALE: Record<Locale, string> = { en: 'en-GB' };
