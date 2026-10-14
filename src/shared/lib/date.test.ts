import { describe, expect, it } from 'vitest';
import { monthName } from './date';

describe('monthName', () => {
  it('names the month in each locale, short or long, never with a trailing dot', () => {
    expect(monthName('2024-01', 'en', 'short')).toBe('Jan');
    expect(monthName('2024-01', 'es', 'short')).toBe('ene');
    expect(monthName('2023-06', 'es', 'long')).toBe('junio');
  });
});
