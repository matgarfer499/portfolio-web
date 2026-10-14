import { describe, expect, it } from 'vitest';
import { countUp, improvement, shouldArm } from './model';

const rec = (before: number, after: number, better: 'lower' | 'higher', unit?: string) => ({
  before: unit ? { value: before, unit } : { value: before },
  after: unit ? { value: after, unit } : { value: after },
  better,
});

describe('improvement', () => {
  it('reads a time going down as × faster', () => {
    expect(improvement(rec(90, 1, 'lower', 's'))).toEqual({ kind: 'faster', ratio: '90' });
    expect(improvement(rec(900, 300, 'lower', 'ms'))).toEqual({ kind: 'faster', ratio: '3' });
  });

  it('reads a count going down as × fewer, rounded to whole numbers from 10 up', () => {
    expect(improvement(rec(6000, 7, 'lower'))).toEqual({ kind: 'fewer', ratio: '857' });
  });

  it('keeps one decimal under 10 and drops a trailing .0', () => {
    expect(improvement(rec(19, 2, 'lower'))).toEqual({ kind: 'fewer', ratio: '9.5' });
    expect(improvement(rec(8, 2, 'lower'))).toEqual({ kind: 'fewer', ratio: '4' });
  });

  it('reads a score going up as + points', () => {
    expect(improvement(rec(60, 100, 'higher'))).toEqual({ kind: 'points', ratio: '40' });
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

describe('shouldArm', () => {
  it('arms only below the fold, with motion allowed', () => {
    expect(shouldArm({ boardTop: 1200, innerHeight: 800, reducedMotion: false })).toBe(true);
    expect(shouldArm({ boardTop: 400, innerHeight: 800, reducedMotion: false })).toBe(false);
    expect(shouldArm({ boardTop: 1200, innerHeight: 800, reducedMotion: true })).toBe(false);
  });
});
