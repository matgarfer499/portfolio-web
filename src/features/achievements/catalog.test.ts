import { describe, expect, it } from 'vitest';
import { ACHIEVEMENT_TOTAL, getAchievement } from './catalog';

describe('achievement catalog', () => {
  it('resolves a known achievement to its i18n key', () => {
    expect(getAchievement('first-contact').messageKey).toBe('firstContact');
  });

  it('exposes a non-empty total', () => {
    expect(ACHIEVEMENT_TOTAL).toBeGreaterThan(0);
  });
});
