import { describe, expect, it } from 'vitest';
import robots from './robots';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('lists home, cv and every case study once, at their canonical URLs', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain('https://matiasgarcia.dev/');
    expect(urls).toContain('https://matiasgarcia.dev/cv');
    expect(urls).toContain('https://matiasgarcia.dev/projects/miot');
    expect(urls).toHaveLength(7);
    expect(urls.filter((url) => url.includes('/es'))).toEqual([]);
  });
});

describe('robots', () => {
  it('allows the whole site and points at the sitemap', () => {
    expect(robots()).toMatchObject({
      rules: { allow: '/' },
      sitemap: 'https://matiasgarcia.dev/sitemap.xml',
    });
  });
});
