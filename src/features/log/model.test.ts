import { describe, expect, it } from 'vitest';
import { formatWhen, shouldCollapse } from './model';

const place = 'Málaga';

describe('formatWhen', () => {
  it('shows an ongoing role as "start — now" with the start month', () => {
    expect(formatWhen({ start: '2024-01' }, place, 'en', 'Now')).toEqual({
      big: '2024 — Now',
      small: 'Jan 2024 · Málaga',
    });
    expect(formatWhen({ start: '2024-01' }, place, 'es', 'Ahora')).toEqual({
      big: '2024 — Ahora',
      small: 'ene 2024 · Málaga',
    });
  });

  it('shows a range inside one year as that year and its months', () => {
    expect(formatWhen({ start: '2023-03', end: '2023-06' }, 'Cologne', 'en', 'Now')).toEqual({
      big: '2023',
      small: 'Mar — Jun · Cologne',
    });
  });

  it('shows a range across years with both years', () => {
    expect(formatWhen({ start: '2021-09', end: '2023-06' }, place, 'en', 'Now')).toEqual({
      big: '2021 — 2023',
      small: 'Sept 2021 — Jun 2023 · Málaga',
    });
  });

  it('shows a single date (a degree) with the full month name', () => {
    expect(formatWhen({ end: '2023-06' }, place, 'en', 'Now')).toEqual({
      big: '2023',
      small: 'June · Málaga',
    });
    expect(formatWhen({ end: '2023-06' }, place, 'es', 'Ahora').small).toBe('junio · Málaga');
  });
});

describe('shouldCollapse', () => {
  it('collapses rows only on narrow screens while the log is still below the fold', () => {
    expect(shouldCollapse({ narrow: true, listTop: 1500, innerHeight: 800 })).toBe(true);
    expect(shouldCollapse({ narrow: true, listTop: 300, innerHeight: 800 })).toBe(false);
    expect(shouldCollapse({ narrow: false, listTop: 1500, innerHeight: 800 })).toBe(false);
  });
});
