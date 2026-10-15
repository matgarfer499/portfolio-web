import { INTL_LOCALE, type Locale } from '@/i18n/routing';
import type { RecordItem } from '@content/index';
import { easeOutCubic } from '@shared/motion/tokens';

type Improvement = { kind: 'faster' | 'fewer' | 'more' | 'points' | 'cut'; value: string };

const TIME_UNITS = new Set(['s', 'ms']);

const roundRatio = (ratio: number) =>
  String(ratio >= 10 ? Math.round(ratio) : Math.round(ratio * 10) / 10);

// lower-is-better: before/after as a ratio (× faster for time, × fewer for counts), or a % cut;
// higher-is-better: the difference in points, or after/before as × more.
export function improvement(
  record: Pick<RecordItem, 'before' | 'after' | 'better' | 'gain'>,
): Improvement {
  const { before, after, better, gain } = record;
  if (better === 'higher')
    return gain === 'ratio'
      ? { kind: 'more', value: roundRatio(after.value / before.value) }
      : { kind: 'points', value: String(after.value - before.value) };
  if (gain === 'percent')
    return { kind: 'cut', value: String(Math.round((1 - after.value / before.value) * 100)) };
  const rounded = roundRatio(before.value / after.value);
  return {
    kind: before.unit && TIME_UNITS.has(before.unit) ? 'faster' : 'fewer',
    value: rounded,
  };
}

export function countUp(from: number, to: number, progress: number): number {
  const t = Math.min(1, Math.max(0, progress));
  return Math.round(from + (to - from) * easeOutCubic(t));
}

export function formatCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale]).format(value);
}
