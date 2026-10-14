import { describe, expect, it } from 'vitest';
import { isPending, pending, resolve, resolveRich } from './types';

describe('pending content', () => {
  const gap = pending({ en: 'Team size', es: 'Tamaño del equipo' });

  it('is recognised as pending, and real values are not', () => {
    expect(isPending(gap)).toBe(true);
    expect(isPending({ en: 'Django', es: 'Django' })).toBe(false);
    expect(isPending('Django')).toBe(false);
  });

  it('resolves a localized value or reports the gap for the active locale', () => {
    expect(resolve({ en: 'Now', es: 'Ahora' }, 'es')).toEqual({ kind: 'text', text: 'Ahora' });
    expect(resolve(gap, 'es')).toEqual({ kind: 'pending', note: 'Tamaño del equipo' });
  });

  it('resolves a rich sentence part by part', () => {
    const rich = [{ en: 'Tech lead of my team.', es: 'Tech lead de mi equipo.' }, gap] as const;
    expect(resolveRich(rich, 'en')).toEqual([
      { kind: 'text', text: 'Tech lead of my team.' },
      { kind: 'pending', note: 'Team size' },
    ]);
  });
});
