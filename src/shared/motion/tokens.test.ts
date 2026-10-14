import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DURATION, EASE, easeOutCubic } from './tokens';

const css = readFileSync(join(__dirname, '../../app/globals.css'), 'utf8');
const cssVar = (name: string) => new RegExp(`--${name}:\\s*([^;]+);`).exec(css)?.[1]?.trim();

describe('motion tokens', () => {
  it('match the CSS custom properties, so CSS and Motion animate alike', () => {
    for (const [name, seconds] of Object.entries(DURATION))
      expect(cssVar(`dur-${name}`), name).toBe(`${Math.round(seconds * 1000)}ms`);
    for (const [name, points] of Object.entries(EASE))
      expect(cssVar(`ease-${name}`), name).toBe(`cubic-bezier(${points.join(', ')})`);
  });
});

describe('easeOutCubic', () => {
  it('starts at 0, ends at 1 and front-loads the motion', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeCloseTo(0.875);
  });
});
