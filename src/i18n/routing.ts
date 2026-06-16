import { defineRouting } from 'next-intl/routing';

/**
 * Routing contract for the whole site.
 * English is the default and has no prefix (`/`, `/fast`); Spanish is prefixed (`/es`, `/es/fast`).
 */
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
