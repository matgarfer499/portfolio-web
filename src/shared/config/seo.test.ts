import { describe, expect, it } from 'vitest';
import { alternatesFor, absoluteUrl } from './seo';

describe('alternatesFor', () => {
  it('points English at the unprefixed URL and lists both languages plus x-default', () => {
    expect(alternatesFor('en', '/cv')).toEqual({
      canonical: 'https://matiasgarcia.dev/cv',
      languages: {
        en: 'https://matiasgarcia.dev/cv',
        es: 'https://matiasgarcia.dev/es/cv',
        'x-default': 'https://matiasgarcia.dev/cv',
      },
    });
  });

  it('gives the Spanish page its own canonical, and the home has no trailing slash in Spanish', () => {
    const alt = alternatesFor('es', '/');
    expect(alt.canonical).toBe('https://matiasgarcia.dev/es');
    expect(alt.languages.en).toBe('https://matiasgarcia.dev/');
  });
});

describe('absoluteUrl', () => {
  it('joins the site URL and a localized path', () => {
    expect(absoluteUrl('es', '/projects/chefory')).toBe(
      'https://matiasgarcia.dev/es/projects/chefory',
    );
  });
});
