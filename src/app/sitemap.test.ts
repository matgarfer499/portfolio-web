import { describe, expect, it } from 'vitest';
import robots from './robots';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('lists home, cv and every case study in both locales, with their translations', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain('https://matiasgarcia.dev/');
    expect(urls).toContain('https://matiasgarcia.dev/es/cv');
    expect(urls).toContain('https://matiasgarcia.dev/es/projects/chefory');
    expect(urls).toHaveLength(8);
    expect(sitemap()[0]?.alternates?.languages).toMatchObject({
      es: 'https://matiasgarcia.dev/es',
    });
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
