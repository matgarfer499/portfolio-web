import { describe, expect, it } from 'vitest';
import { alternatesFor, absoluteUrl } from './seo';

describe('alternatesFor', () => {
  it('gives each page its unprefixed canonical URL and no language alternates', () => {
    expect(alternatesFor('en', '/cv')).toEqual({ canonical: 'https://matiasgarcia.dev/cv' });
    expect(alternatesFor('en', '/').canonical).toBe('https://matiasgarcia.dev/');
  });
});

describe('absoluteUrl', () => {
  it('joins the site URL and a path', () => {
    expect(absoluteUrl('en', '/projects/chefory')).toBe(
      'https://matiasgarcia.dev/projects/chefory',
    );
  });
});
