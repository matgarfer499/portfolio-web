import { describe, expect, it } from 'vitest';
import { TROPHY_EVENTS } from '@shared/events/trophy-bus';
import en from '@/messages/en.json';

type Tree = { [key: string]: string | Tree };

function leaves(tree: Tree, prefix = ''): Map<string, string> {
  const out = new Map<string, string>();
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') out.set(path, value);
    else for (const [p, v] of leaves(value, path)) out.set(p, v);
  }
  return out;
}

const EN = leaves(en);
const camel = (s: string) => s.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

describe('UI messages', () => {
  it('have no empty strings', () => {
    expect([...EN].filter(([, v]) => !v.trim()).map(([k]) => k)).toEqual([]);
  });

  it('name and describe every trophy on the bus', () => {
    for (const event of TROPHY_EVENTS) {
      const key = `Trophies.items.${camel(event)}`;
      expect(EN.get(`${key}.title`), event).toBeTruthy();
      expect(EN.get(`${key}.description`), event).toBeTruthy();
    }
    expect(Object.keys(en.Trophies.items)).toHaveLength(TROPHY_EVENTS.length);
  });
});
