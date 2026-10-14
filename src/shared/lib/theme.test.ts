import { describe, expect, it } from 'vitest';
import { isTheme, resolveTheme, THEME_STORAGE_KEY, themeScript } from './theme';

function runScript(stored: string | null, prefersDark: boolean, storageThrows = false) {
  const attrs: Record<string, string> = {};
  const listeners: Array<(e: { matches: boolean }) => void> = [];
  const env = {
    document: { documentElement: { setAttribute: (k: string, v: string) => (attrs[k] = v) } },
    localStorage: {
      getItem: (key: string) => {
        if (storageThrows) throw new Error('blocked');
        return key === THEME_STORAGE_KEY ? stored : null;
      },
    },
    matchMedia: () => ({
      matches: prefersDark,
      addEventListener: (_: string, fn: (e: { matches: boolean }) => void) => listeners.push(fn),
    }),
  };
  new Function('document', 'localStorage', 'matchMedia', themeScript)(
    env.document,
    env.localStorage,
    env.matchMedia,
  );
  return { attrs, listeners };
}

describe('theme', () => {
  it('accepts only light and dark', () => {
    expect(isTheme('light')).toBe(true);
    expect(isTheme('dark')).toBe(true);
    expect(isTheme('system')).toBe(false);
    expect(isTheme(null)).toBe(false);
  });

  it('prefers a stored choice over the system preference', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('falls back to the system preference when nothing valid is stored', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme('purple', false)).toBe('light');
  });

  it('inline script sets data-theme from storage before paint', () => {
    expect(runScript('dark', false).attrs['data-theme']).toBe('dark');
  });

  it('inline script follows the system, live, when nothing is stored', () => {
    const { attrs, listeners } = runScript(null, true);
    expect(attrs['data-theme']).toBe('dark');
    listeners.forEach((fn) => fn({ matches: false }));
    expect(attrs['data-theme']).toBe('light');
  });

  it('inline script survives blocked storage', () => {
    expect(runScript(null, false, true).attrs['data-theme']).toBe('light');
  });
});
