import { describe, expect, it } from 'vitest';
import { TROPHY_EVENTS } from '@shared/events/trophy-bus';
import en from '@/messages/en.json';
import es from '@/messages/es.json';

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
const ES = leaves(es);
const params = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
const camel = (s: string) => s.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

describe('UI messages', () => {
  it('have the same keys in English and Spanish', () => {
    expect([...ES.keys()].sort()).toEqual([...EN.keys()].sort());
  });

  it('have no empty strings', () => {
    expect([...EN, ...ES].filter(([, v]) => !v.trim()).map(([k]) => k)).toEqual([]);
  });

  it('use the same placeholders in both languages', () => {
    const drift = [...EN].filter(([k, v]) => params(v).join() !== params(ES.get(k) ?? '').join());
    expect(drift.map(([k]) => k)).toEqual([]);
  });

  it('translate prose instead of copying it', () => {
    const copied = [...EN].filter(([k, v]) => v === ES.get(k) && v.split(' ').length > 1);
    expect(copied.map(([k, v]) => `${k}: ${v}`)).toEqual([]);
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
