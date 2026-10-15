import { INTL_LOCALE, type Locale } from '@/i18n/routing';

// The month of an ISO "YYYY-MM" in the locale's style, without the trailing dot some locales add.
export function monthName(iso: string, locale: Locale, style: 'short' | 'long'): string {
  const [year = 0, m = 1] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], { month: style, timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, m - 1, 1)))
    .replace('.', '');
}
