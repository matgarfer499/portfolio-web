import { routing } from '@/i18n/routing';

/** Static, locale-independent site metadata. */
export const site = {
  name: 'Matías García',
  shortName: 'matiasgarcia.dev',
  domain: 'matiasgarcia.dev',
  url: 'https://matiasgarcia.dev',
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
} as const;
