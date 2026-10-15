import { describe, expect, it } from 'vitest';
import { wrapIndex } from './model';

describe('wrapIndex', () => {
  it('steps through the photos and wraps at both ends', () => {
    expect(wrapIndex(1, 8)).toBe(1);
    expect(wrapIndex(8, 8)).toBe(0);
    expect(wrapIndex(-1, 8)).toBe(7);
  });
});
