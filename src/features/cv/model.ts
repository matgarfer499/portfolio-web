import { INTL_LOCALE, type Locale } from '@/i18n/routing';

function month(iso: string, locale: Locale): string {
  const [year = 0, m = 1] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], { month: 'short', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, m - 1, 1)))
    .replace('.', '');
}

// The CV's date column: "Jan 2024 — Now", "Mar — Jun 2023", "Jun 2023" (a degree).
export function cvPeriod(
  { start, end }: { start?: string; end?: string },
  locale: Locale,
  now: string,
): string {
  const at = (iso: string) => `${month(iso, locale)} ${iso.slice(0, 4)}`;
  if (!start) return end ? at(end) : '';
  if (!end) return `${at(start)} — ${now}`;
  if (start.slice(0, 4) === end.slice(0, 4)) return `${month(start, locale)} — ${at(end)}`;
  return `${at(start)} — ${at(end)}`;
}
