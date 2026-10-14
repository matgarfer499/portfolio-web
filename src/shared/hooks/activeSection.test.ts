import { describe, expect, it } from 'vitest';
import { pickActive } from './activeSection';

describe('pickActive', () => {
  const ids = ['records', 'log', 'about'];

  it('picks the first section, in page order, that crosses the reading line', () => {
    expect(pickActive(ids, new Set(['about', 'log']))).toBe('log');
  });

  it('keeps nothing active when no section crosses it', () => {
    expect(pickActive(ids, new Set())).toBeNull();
  });
});
