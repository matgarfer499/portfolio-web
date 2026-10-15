import { describe, expect, it } from 'vitest';
import { yearsSince } from './model';

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
