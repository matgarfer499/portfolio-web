import { describe, expect, it } from 'vitest';
import { pointerShift, wrapIndex } from './model';

describe('wrapIndex', () => {
  it('steps through the photos and wraps at both ends', () => {
    expect(wrapIndex(1, 8)).toBe(1);
    expect(wrapIndex(8, 8)).toBe(0);
    expect(wrapIndex(-1, 8)).toBe(7);
  });
});

describe('pointerShift', () => {
  const rect = { left: 100, top: 50, width: 400, height: 200 };

  it('maps the pointer to -1…1 from the centre of the gallery', () => {
    expect(pointerShift(300, 150, rect)).toEqual({ x: 0, y: 0 });
    expect(pointerShift(100, 50, rect)).toEqual({ x: -1, y: -1 });
    expect(pointerShift(500, 250, rect)).toEqual({ x: 1, y: 1 });
  });

  it('clamps outside the gallery', () => {
    expect(pointerShift(900, -100, rect)).toEqual({ x: 1, y: -1 });
  });
});
