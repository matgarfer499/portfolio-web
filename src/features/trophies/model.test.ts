import { describe, expect, it } from 'vitest';
import { TROPHY_EVENTS } from '@shared/events/trophy-bus';
import { KONAMI, konamiStep, parseUnlocked, TROPHIES } from './model';

describe('TROPHIES', () => {
  it('has one trophy per bus event, in the bus order', () => {
    expect(TROPHIES.map((t) => t.id)).toEqual([...TROPHY_EVENTS]);
  });

  it('gives each trophy its own message key', () => {
    expect(new Set(TROPHIES.map((t) => t.key)).size).toBe(TROPHIES.length);
  });
});

describe('parseUnlocked', () => {
  it('reads stored trophies in shelf order', () => {
    expect(parseUnlocked('["konami","finish-line"]')).toEqual(['finish-line', 'konami']);
  });

  it('drops unknown ids and duplicates', () => {
    expect(parseUnlocked('["konami","hacked","konami",3]')).toEqual(['konami']);
  });

  it('treats missing or corrupted storage as no trophies', () => {
    expect(parseUnlocked(null)).toEqual([]);
    expect(parseUnlocked('{oops')).toEqual([]);
    expect(parseUnlocked('{"a":1}')).toEqual([]);
  });
});

describe('konamiStep', () => {
  const run = (keys: string[]) => keys.reduce(konamiStep, 0);

  it('completes on the full code, case-insensitive', () => {
    expect(run([...KONAMI.slice(0, 8), 'B', 'a'])).toBe(KONAMI.length);
  });

  it('starts over on a wrong key', () => {
    expect(run(['ArrowUp', 'ArrowUp', 'x'])).toBe(0);
  });

  it('a wrong key that is the first of the code starts a new attempt', () => {
    expect(run(['ArrowUp', 'ArrowUp', 'ArrowUp'])).toBe(2);
    expect(run(['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowUp'])).toBe(1);
  });

  it('ignores modifier keys, so Shift+B still counts', () => {
    expect(run([...KONAMI.slice(0, 8), 'Shift', 'B', 'Shift', 'A'])).toBe(KONAMI.length);
  });
});
