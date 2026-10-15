import type { Highlighted, ImageAsset, Localized } from './types';

type Stat = { readonly value: string; readonly label: Localized };

export const hero = {
  roleLine: {
    before: { en: 'Tech Lead at Bettergy. ', es: 'Tech Lead en Bettergy. ' },
    mark: { en: 'I build products end to end', es: 'Construyo productos de principio a fin' },
    after: {
      en: ', from the database to the deploy.',
      es: ', desde la base de datos hasta el despliegue.',
    },
  },
  lede: {
    en: 'Full stack engineer leading a team of five in Málaga. Django and PostgreSQL on the back, Next.js and TypeScript on the front, Docker and Kubernetes to run it, and an AI-assisted workflow with Claude Code to ship faster without dropping quality.',
    es: 'Ingeniero full stack al frente de un equipo de cinco personas en Málaga. Django y PostgreSQL en el back, Next.js y TypeScript en el front, Docker y Kubernetes para ponerlo en marcha y un flujo de trabajo con IA (Claude Code) para lanzar más rápido sin perder calidad.',
  },
  // Value computed from profile.careerSince, so it never goes stale.
  yearsLabel: { en: 'Shipping web apps', es: 'Lanzando apps web' },
  stats: [
    { value: '3', label: { en: 'Products I lead', es: 'Productos que lidero' } },
    {
      value: '10+',
      label: { en: 'Sentra clients in 6 months', es: 'Clientes de Sentra en 6 meses' },
    },
  ],
  marquee: [
    { en: 'Owns it end to end', es: 'De principio a fin' },
    { en: 'Tech Lead', es: 'Tech Lead' },
    { en: 'Sentra live in < 2 months', es: 'Sentra en producción en < 2 meses' },
    { en: '90 s → 1 s', es: '90 s → 1 s' },
    { en: 'Weekly releases', es: 'Despliegues semanales' },
    { en: '−47% infra bill', es: '−47 % en infraestructura' },
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
  readonly yearsLabel: Localized;
  readonly stats: readonly Stat[];
  readonly marquee: readonly Localized[];
  readonly photo: ImageAsset;
  readonly photoCaption: Localized;
};
