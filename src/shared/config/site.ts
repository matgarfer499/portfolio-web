import { routing } from '@/i18n/routing';

/** Static, locale-independent site metadata. */
export const site = {
  name: 'Matías García',
  shortName: 'matiasgarcia.dev',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://matiasgarcia.dev',
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  isProduction: process.env.NODE_ENV === 'production',
  // Analytics and Speed Insights only exist on Vercel; elsewhere their scripts 404 in the console.
  onVercel: Boolean(process.env.VERCEL),
} as const;
