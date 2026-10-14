import { defineRouting } from 'next-intl/routing';

// English is the default and has no prefix (`/`, `/cv`); Spanish is prefixed (`/es`, `/es/cv`).
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // `/` is always English: the same URL gives every visitor and crawler the same page.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
