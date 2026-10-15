import { describe, expect, it } from 'vitest';
import { countUp, formatCount, improvement } from './model';

const rec = (
  before: number,
  after: number,
  better: 'lower' | 'higher',
  unit?: string,
  gain?: 'ratio' | 'percent',
) => ({
  before: unit ? { value: before, unit } : { value: before },
  after: unit ? { value: after, unit } : { value: after },
  better,
  ...(gain ? { gain } : {}),
});

describe('improvement', () => {
  it('reads a time going down as × faster', () => {
    expect(improvement(rec(90, 1, 'lower', 's'))).toEqual({ kind: 'faster', value: '90' });
    expect(improvement(rec(900, 300, 'lower', 'ms'))).toEqual({ kind: 'faster', value: '3' });
  });

  it('reads a count going down as × fewer, rounded to whole numbers from 10 up', () => {
    expect(improvement(rec(6000, 7, 'lower'))).toEqual({ kind: 'fewer', value: '857' });
  });

  it('keeps one decimal under 10 and drops a trailing .0', () => {
    expect(improvement(rec(19, 2, 'lower'))).toEqual({ kind: 'fewer', value: '9.5' });
    expect(improvement(rec(8, 2, 'lower'))).toEqual({ kind: 'fewer', value: '4' });
  });

  it('reads a score going up as + points', () => {
    expect(improvement(rec(60, 100, 'higher'))).toEqual({ kind: 'points', value: '40' });
  });

  it('reads a count going up as × more when the record asks for a ratio', () => {
    expect(improvement(rec(2, 4, 'higher', undefined, 'ratio'))).toEqual({
      kind: 'more',
      value: '2',
    });
  });
});

describe('improvement for costs', () => {
  it('reads a cost going down as a whole-percent cut when the record asks for a percent', () => {
    expect(improvement(rec(1500, 800, 'lower', '€', 'percent'))).toEqual({
      kind: 'cut',
      value: '47',
    });
  });
});

describe('countUp', () => {
  it('goes from the before value to the after value along an ease-out curve', () => {
    expect(countUp(90, 1, 0)).toBe(90);
    expect(countUp(90, 1, 1)).toBe(1);
    expect(countUp(6000, 7, 0.5)).toBe(756);
  });

  it('clamps progress outside 0..1', () => {
    expect(countUp(60, 100, 2)).toBe(100);
    expect(countUp(60, 100, -1)).toBe(60);
  });
});

describe('formatCount', () => {
  it('groups thousands the way each locale does', () => {
    expect(formatCount(6000, 'en')).toBe('6,000');
    expect(formatCount(6000, 'es')).toBe('6000');
    expect(formatCount(12000, 'es')).toBe('12.000');
  });
});
