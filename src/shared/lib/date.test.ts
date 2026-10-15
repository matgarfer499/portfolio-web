import { describe, expect, it } from 'vitest';
import { monthName } from './date';

describe('monthName', () => {
  it('names the month short or long, never with a trailing dot', () => {
    expect(monthName('2024-01', 'en', 'short')).toBe('Jan');
    expect(monthName('2023-06', 'en', 'long')).toBe('June');
  });
});
