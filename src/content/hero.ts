import type { Highlighted, ImageAsset, Localized } from './types';

type Stat = { readonly value: string | { readonly yearsSince: string }; readonly label: Localized };

export const hero = {
  roleLine: {
    before: { en: 'Tech Lead at Bettergy. ', es: 'Tech Lead en Bettergy. ' },
    mark: { en: 'I own products end to end', es: 'Llevo productos de principio a fin' },
    after: {
      en: ', from the database query to the last pixel.',
      es: ', desde la consulta a la base de datos hasta el último píxel.',
    },
  },
  lede: {
    en: 'Full stack developer building simple, fast and enjoyable web apps for the energy sector. Python and Django on the back, SvelteKit and Next.js on the front, Docker and Kubernetes to ship it.',
    es: 'Desarrollador full stack que construye aplicaciones web simples, rápidas y agradables de usar para el sector energético. Python y Django en el back, SvelteKit y Next.js en el front, Docker y Kubernetes para llevarlo a producción.',
  },
  stats: [
    {
      value: { yearsSince: '2024-01' },
      label: { en: 'Shipping web apps', es: 'Lanzando apps web' },
    },
    { value: '2', label: { en: 'Countries worked in', es: 'Países en los que he trabajado' } },
    { value: 'B2', label: { en: 'English, Cambridge First', es: 'Inglés, Cambridge First' } },
  ],
  marquee: [
    { en: 'Owns it end to end', es: 'De principio a fin' },
    { en: 'Tech Lead', es: 'Tech Lead' },
    { en: '90s → 1s', es: '90s → 1s' },
    { en: 'Lighthouse 100', es: 'Lighthouse 100' },
    { en: '6000 → 7 queries', es: '6000 → 7 consultas' },
    { en: 'Full stack', es: 'Full stack' },
  ],
  photo: {
    src: '/photos/gym.webp',
    width: 1024,
    height: 936,
    alt: {
      en: 'Dumbbells, plates, a jump rope and resistance bands laid out on a concrete floor',
      es: 'Mancuernas, discos, una comba y gomas elásticas sobre un suelo de hormigón',
    },
  },
  photoCaption: { en: 'My second job', es: 'Mi segundo trabajo' },
} as const satisfies {
  readonly roleLine: Highlighted;
  readonly lede: Localized;
  readonly stats: readonly Stat[];
  readonly marquee: readonly Localized[];
  readonly photo: ImageAsset;
  readonly photoCaption: Localized;
};
