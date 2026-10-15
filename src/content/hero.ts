import type { Highlighted, Localized } from './types';

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
  // The hero's right-hand poster: what he does in three verbs, each with its proof.
  words: [
    {
      id: 'build',
      word: { en: 'Build', es: 'Construyo' },
      proof: { en: 'Next.js · Django · PostgreSQL', es: 'Next.js · Django · PostgreSQL' },
    },
    {
      id: 'lead',
      word: { en: 'Lead', es: 'Lidero' },
      proof: { en: 'A team of five', es: 'Un equipo de cinco' },
    },
    {
      id: 'ship',
      word: { en: 'Ship', es: 'Lanzo' },
      proof: { en: 'Every week, to production', es: 'Cada semana, a producción' },
    },
  ],
} as const satisfies {
  readonly roleLine: Highlighted;
  readonly lede: Localized;
  readonly yearsLabel: Localized;
  readonly stats: readonly Stat[];
  readonly words: readonly {
    readonly id: string;
    readonly word: Localized;
    readonly proof: Localized;
  }[];
};
