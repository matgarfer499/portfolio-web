import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import * as content from './index';

type Found = { path: string; en: string; es: string };

function walk(value: unknown, path: string, out: { localized: Found[]; images: string[] }) {
  if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`, out));
  else if (value && typeof value === 'object') {
    const keys = Object.keys(value).sort().join();
    const v = value as Record<string, unknown>;
    if (keys === 'en,es') out.localized.push({ path, en: String(v.en), es: String(v.es) });
    else {
      if (typeof v.src === 'string') out.images.push(v.src);
      for (const [k, child] of Object.entries(v)) walk(child, `${path}.${k}`, out);
    }
  }
}

const found = { localized: [] as Found[], images: [] as string[] };
for (const [name, value] of Object.entries(content))
  if (typeof value !== 'function') walk(value, name, found);

// Same text in both languages is fine for names, units and tech terms, not for prose.
const SAME_OK =
  /^(Chefory|Tech Lead|Full stack|Backend|Frontend|Lighthouse 100|90s → 1s|Málaga|B2 · Cambridge First)$/;

describe('content is bilingual', () => {
  it('walks a meaningful amount of copy', () => expect(found.localized.length).toBeGreaterThan(80));

  it('every localized value has English and Spanish text', () => {
    const empty = found.localized.filter((l) => !l.en.trim() || !l.es.trim());
    expect(empty.map((l) => l.path)).toEqual([]);
  });

  it('Spanish prose is translated, not copied', () => {
    const copied = found.localized.filter(
      (l) => l.en === l.es && l.en.split(' ').length > 1 && !SAME_OK.test(l.en),
    );
    expect(copied.map((l) => `${l.path}: ${l.en}`)).toEqual([]);
  });
});

describe('content invariants', () => {
  const publicDir = join(__dirname, '../../public');

  it('every referenced image exists in public/', () => {
    const missing = found.images.filter((src) => !existsSync(join(publicDir, src)));
    expect(found.images.length).toBeGreaterThan(10);
    expect(missing).toEqual([]);
  });

  it('never ships or references the excluded photo', () => {
    expect(existsSync(join(publicDir, 'photos/mylove.webp'))).toBe(false);
    const sources = readdirSync(__dirname).map((f) => readFileSync(join(__dirname, f), 'utf8'));
    expect(sources.filter((s) => s.includes('mylove.') && !s.includes('never'))).toEqual([]);
    expect(found.localized.filter((l) => /girlfriend|novia/i.test(l.en + l.es))).toEqual([]);
  });

  it('captions the photo with his mother apart from the friends photos', () => {
    const mama = content.about.photos.find((p) => p.src.endsWith('lamama.webp'));
    expect(mama?.caption.en).toMatch(/mom/i);
    expect(mama?.alt.es).toMatch(/madre/i);
    const friends = content.about.photos.filter((p) => /mygang|furunserland/.test(p.src));
    expect(friends.every((p) => !/mom|madre/i.test(p.caption.en + p.caption.es))).toBe(true);
  });

  it('each record improves in the direction it claims', () => {
    for (const r of content.records.items) {
      const improved =
        r.better === 'lower' ? r.after.value < r.before.value : r.after.value > r.before.value;
      expect(improved, r.id).toBe(true);
    }
  });

  it('keeps unknown career facts as pending, never empty strings', () => {
    expect(content.isPending(content.records.next.note)).toBe(true);
    expect(content.isPending(content.projects.next.name)).toBe(true);
  });
});
