import type { Locale } from '@/i18n/routing';
import { monthName } from '@shared/lib/date';

const month = monthName;
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
