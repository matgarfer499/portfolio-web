import { describe, expect, it } from 'vitest';
import { cvPeriod } from './model';

describe('cvPeriod', () => {
  it('writes an open role up to now', () => {
    expect(cvPeriod({ start: '2024-01' }, 'en', 'Now')).toBe('Jan 2024 — Now');
  });

  it('keeps the year once inside a single year', () => {
    expect(cvPeriod({ start: '2023-03', end: '2023-06' }, 'en', 'Now')).toBe('Mar — Jun 2023');
  });

  it('writes both years across years (British short months, as in the log)', () => {
    expect(cvPeriod({ start: '2021-09', end: '2023-06' }, 'en', 'Now')).toBe(
      'Sept 2021 — Jun 2023',
    );
  });

  it('dates a degree by its completion month, in Spanish too', () => {
    expect(cvPeriod({ end: '2023-06' }, 'es', 'Actualidad')).toBe('jun 2023');
  });
});
