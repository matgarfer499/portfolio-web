import { INTL_LOCALE, type Locale } from '@/i18n/routing';

function month(iso: string, locale: Locale, style: 'short' | 'long'): string {
  const [year = 0, m = 1] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], { month: style, timeZone: 'UTC' }).format(
    new Date(Date.UTC(year, m - 1, 1)),
  );
}
function year(iso: string): string {
  return iso.slice(0, 4);
}

// The big line is years; the small line adds months and the place. CSS uppercases both.
export function formatWhen(
  { start, end }: { start?: string; end?: string },
  place: string,
  locale: Locale,
  now: string,
): { big: string; small: string } {
  const short = (iso: string) => month(iso, locale, 'short');
  if (!start)
    return end
      ? { big: year(end), small: `${month(end, locale, 'long')} · ${place}` }
      : { big: '', small: place };
  if (!end)
    return { big: `${year(start)} — ${now}`, small: `${short(start)} ${year(start)} · ${place}` };
  if (year(start) === year(end))
    return { big: year(start), small: `${short(start)} — ${short(end)} · ${place}` };
  return {
    big: `${year(start)} — ${year(end)}`,
    small: `${short(start)} ${year(start)} — ${short(end)} ${year(end)} · ${place}`,
  };
}

// Fold only while the log is below the fold, so nothing shifts in view (CSS limits it to phones).
export function shouldCollapse(input: { listTop: number; innerHeight: number }) {
  return input.listTop > input.innerHeight;
}
