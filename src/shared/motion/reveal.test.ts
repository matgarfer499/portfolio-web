import { describe, expect, it } from 'vitest';
import { startsBelowFold } from './reveal';

describe('startsBelowFold', () => {
  it('is true only for content below the first screen of where the page lands', () => {
    expect(startsBelowFold({ top: 1200, landing: 0, innerHeight: 800 })).toBe(true);
    expect(startsBelowFold({ top: 400, landing: 0, innerHeight: 800 })).toBe(false);
  });

  it('measures from a deep link target that has not been scrolled to yet', () => {
    // /#log: the target sits 3000 px down; content 200 px below it lands on screen.
    expect(startsBelowFold({ top: 3200, landing: 3000, innerHeight: 800 })).toBe(false);
    expect(startsBelowFold({ top: 4200, landing: 3000, innerHeight: 800 })).toBe(true);
  });

  it('is false for content above the landing point', () => {
    expect(startsBelowFold({ top: 100, landing: 3000, innerHeight: 800 })).toBe(false);
  });
});
