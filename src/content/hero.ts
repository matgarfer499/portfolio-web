import type { Highlighted, Localized } from './types';

type Stat = { readonly value: string; readonly label: Localized };

export const hero = {
  roleLine: {
    before: { en: 'Tech Lead at Bettergy. ' },
    mark: { en: 'I build products end to end' },
    after: {
      en: ', from the database to the deploy.',
    },
  },
  lede: {
    en: 'Full stack engineer leading a team of five in Málaga. Django and PostgreSQL on the back, Next.js and TypeScript on the front, Docker and Kubernetes to run it, and an AI-assisted workflow with Claude Code to ship faster without dropping quality.',
  },
  // Value computed from profile.careerSince, so it never goes stale.
  yearsLabel: { en: 'Shipping web apps' },
  stats: [
    { value: '3', label: { en: 'Products I lead' } },
    {
      value: '10+',
      label: { en: 'Sentra clients in 6 months' },
    },
  ],
  // The hero's right-hand poster: what he does in three verbs, each with its proof.
  words: [
    {
      id: 'build',
      word: { en: 'Build' },
      proof: { en: 'Next.js · Django · PostgreSQL' },
    },
    {
      id: 'lead',
      word: { en: 'Lead' },
      proof: { en: 'A team of five' },
    },
    {
      id: 'ship',
      word: { en: 'Ship' },
      proof: { en: 'Every week, to production' },
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
