import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// WCAG 2.2 AA on the real tokens: 4.5:1 text (1.4.3), 3:1 large text and focus rings (1.4.11).
const css = readFileSync(join(__dirname, 'globals.css'), 'utf8');

function block(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`no block ${selector}`);
  return css.slice(start, css.indexOf('}', start));
}

const LIGHT = block(':root');
const THEMES = {
  light: LIGHT,
  dark: LIGHT + block(":root[data-theme='dark']"),
  beast: LIGHT + block(':root[data-beast]'),
  'beast-dark': LIGHT + block(":root[data-theme='dark']") + block(':root[data-beast]'),
};

function token(source: string, name: string): number[] {
  const matches = [...source.matchAll(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'gi'))];
  const hex = matches.at(-1)?.[1];
  if (!hex) throw new Error(`no hex token --${name}`);
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}
const linear = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = ([r = 0, g = 0, b = 0]: number[]) =>
  0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
const ratio = (a: number[], b: number[]) => {
  const [hi = 0, lo = 0] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// surface → [text tokens at 4.5:1, large-text tokens at 3:1, its focus ring token]
const SURFACES = {
  paper: { text: ['ink', 'ink-soft', 'steel'], large: ['ghost'], ring: 'ink' },
  night: { text: ['night-ink', 'night-muted', 'night-ghost', 'volt'], large: [], ring: 'volt' },
  volt: { text: ['on-volt'], large: [], ring: 'on-volt' },
} as const;

for (const [theme, source] of Object.entries(THEMES)) {
  describe(`contrast — ${theme}`, () => {
    for (const [surface, rules] of Object.entries(SURFACES)) {
      const bg = () => token(source, surface);
      for (const fg of rules.text)
        it(`${fg} on ${surface} ≥ 4.5:1`, () =>
          expect(ratio(token(source, fg), bg())).toBeGreaterThanOrEqual(4.5));
      for (const fg of rules.large)
        it(`${fg} (large text) on ${surface} ≥ 3:1`, () =>
          expect(ratio(token(source, fg), bg())).toBeGreaterThanOrEqual(3));
      it(`focus ring (${rules.ring}) on ${surface} ≥ 3:1`, () =>
        expect(ratio(token(source, rules.ring), bg())).toBeGreaterThanOrEqual(3));
    }
  });
}

describe('no dimmed text or rings in the styles', () => {
  it('never fades text or ring tokens with alpha', () => {
    const files = import.meta.glob(['../**/*.variants.ts', '../**/*.tsx', './globals.css'], {
      query: '?raw',
      import: 'default',
      eager: true,
    });
    expect(Object.keys(files).some((f) => f.endsWith('globals.css'))).toBe(true);
    const offenders = Object.entries(files).filter(([, src]) =>
      /(text|outline|ring)-(ink|ink-soft|steel|ghost|night-ink|night-muted|night-ghost|on-volt)\/\d/.test(
        String(src),
      ),
    );
    expect(offenders.map(([path]) => path)).toEqual([]);
  });
});
