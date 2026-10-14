import { INTL_LOCALE, type Locale } from '@/i18n/routing';
import type { RecordItem } from '@content/index';
import { easeOutCubic } from '@shared/motion/tokens';

export type Improvement = { kind: 'faster' | 'fewer' | 'points'; ratio: string };

const TIME_UNITS = new Set(['s', 'ms']);

// lower-is-better: before/after as a ratio (× faster for time, × fewer for counts);
// higher-is-better: the difference in points.
export function improvement(record: Pick<RecordItem, 'before' | 'after' | 'better'>): Improvement {
  const { before, after, better } = record;
  if (better === 'higher') return { kind: 'points', ratio: String(after.value - before.value) };
  const ratio = before.value / after.value;
  const rounded = ratio >= 10 ? Math.round(ratio) : Math.round(ratio * 10) / 10;
  return {
    kind: before.unit && TIME_UNITS.has(before.unit) ? 'faster' : 'fewer',
    ratio: String(rounded),
  };
}

export function countUp(from: number, to: number, progress: number): number {
  const t = Math.min(1, Math.max(0, progress));
  return Math.round(from + (to - from) * easeOutCubic(t));
}

// The artifact's rule: only content that starts below the first screen animates in.
export function shouldArm(input: {
  boardTop: number;
  innerHeight: number;
  reducedMotion: boolean;
}) {
  return !input.reducedMotion && input.boardTop > input.innerHeight;
}

export function formatCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale]).format(value);
}
