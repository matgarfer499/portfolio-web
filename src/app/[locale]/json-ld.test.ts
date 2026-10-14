import { describe, expect, it } from 'vitest';
import { jsonLd, personSchema } from './json-ld';

describe('personSchema', () => {
  it('describes Matías from the content, in the page language', () => {
    expect(personSchema('es')).toMatchObject({
      '@type': 'Person',
      name: 'Matías García',
      alternateName: 'Matías José García Fernández',
      jobTitle: 'Tech Lead · Desarrollador Full Stack',
      url: 'https://matiasgarcia.dev/es',
      email: 'mailto:mjgarciadev14@gmail.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Málaga' },
      sameAs: ['https://www.linkedin.com/in/mgarfer/', 'https://github.com/matgarfer499'],
      knowsLanguage: ['Spanish', 'English'],
    });
  });
});

describe('jsonLd', () => {
  it('serialises a graph that cannot close the script tag', () => {
    const out = jsonLd([{ '@type': 'Thing', name: '</script><b>' }]);
    expect(out).not.toContain('</script>');
    expect(JSON.parse(out)).toMatchObject({
      '@context': 'https://schema.org',
      '@graph': [{ name: '</script><b>' }],
    });
  });
});
