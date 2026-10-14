import { describe, expect, it } from 'vitest';
import { marqueeRate, yearsSince } from './model';

describe('yearsSince', () => {
  const at = (iso: string) => new Date(`${iso}T12:00:00Z`);

  it('counts whole years from an ISO month', () => {
    expect(yearsSince('2024-01', at('2026-10-14'))).toBe(2);
    expect(yearsSince('2024-01', at('2027-01-01'))).toBe(3);
  });

  it('does not round up before the anniversary month', () => {
    expect(yearsSince('2024-03', at('2026-02-28'))).toBe(1);
  });

  it('never goes negative for a future start', () => {
    expect(yearsSince('2030-01', at('2026-10-14'))).toBe(0);
  });
});

describe('marqueeRate', () => {
  it('runs at base speed forward when the page is still', () => {
    expect(marqueeRate(0, 1)).toBe(1);
  });

  it('speeds up with scroll velocity, up to 4×', () => {
    expect(marqueeRate(1, 1)).toBeGreaterThan(1);
    expect(marqueeRate(50, 1)).toBe(4);
  });

  it('flips direction with the scroll direction and keeps it when scrolling stops', () => {
    expect(marqueeRate(-1, 1)).toBeLessThan(-1);
    expect(marqueeRate(0, -1)).toBe(-1);
  });
});
