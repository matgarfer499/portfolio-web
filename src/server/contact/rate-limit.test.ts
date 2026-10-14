import { describe, expect, it } from 'vitest';
import { createRateLimit } from './rate-limit';

const MIN = 60_000;

describe('createRateLimit', () => {
  it('allows three messages per address in ten minutes, then blocks', () => {
    const hit = createRateLimit({ limit: 3, windowMs: 10 * MIN });
    expect([hit('1.2.3.4', 0), hit('1.2.3.4', MIN), hit('1.2.3.4', 2 * MIN)]).toEqual([
      true,
      true,
      true,
    ]);
    expect(hit('1.2.3.4', 3 * MIN)).toBe(false);
    expect(hit('5.6.7.8', 3 * MIN)).toBe(true);
  });

  it('opens again once the window has passed', () => {
    const hit = createRateLimit({ limit: 1, windowMs: 10 * MIN });
    expect(hit('a', 0)).toBe(true);
    expect(hit('a', 9 * MIN)).toBe(false);
    expect(hit('a', 10 * MIN)).toBe(true);
  });

  it('forgets expired windows, so memory does not grow with every address', () => {
    const hit = createRateLimit({ limit: 1, windowMs: 10 * MIN });
    for (let i = 0; i < 100; i++) hit(`ip-${i}`, 0);
    hit('late', 10 * MIN);
    expect(hit.size()).toBe(1);
  });
});
