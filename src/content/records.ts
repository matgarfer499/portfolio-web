import type { Localized, Maybe } from './types';

interface Measure {
  readonly value: number;
  readonly unit?: string;
}

export interface RecordItem {
  readonly id: string;
  readonly label: Localized;
  readonly before: Measure;
  readonly after: Measure;
  /** Which way is an improvement: response times go down, scores go up. */
  readonly better: 'lower' | 'higher';
  /** How the badge reads the change; the default is × for "lower", + points for "higher". */
  readonly gain?: 'ratio' | 'percent';
  readonly note: Localized;
}

/** The last card on the board: one headline result, linked to its case study. */
export interface HighlightRecord {
  readonly id: string;
  readonly label: Localized;
  readonly metric: Maybe<Localized>;
  readonly note: Maybe<Localized>;
  readonly caseSlug?: string;
}

export const records = {
  lede: {
    en: 'Production numbers from my work at Bettergy, before and after.',
  },
  items: [
    {
      id: 'chart-load',
      label: { en: '1-year chart load' },
      before: { value: 5, unit: 's' },
      after: { value: 1, unit: 's' },
      better: 'lower',
      note: {
        en: 'MIOT Sentra: a full year at 15-minute resolution now loads in under a second, on TimescaleDB hypertables.',
      },
    },
    {
      id: 'releases',
      label: { en: 'Production releases a month' },
      before: { value: 2 },
      after: { value: 4 },
      better: 'higher',
      gain: 'ratio',
      note: {
        en: 'From two releases a month at most to one or two every week, with tests and QA in the flow.',
      },
    },
    {
      id: 'sprint-tickets',
      label: { en: 'Tickets per two-week sprint' },
      before: { value: 10 },
      after: { value: 30 },
      better: 'higher',
      gain: 'ratio',
      note: {
        en: 'Roughly 10 to 30, testing and QA included, after bringing in an AI-assisted workflow (Claude Code) and tickets of two days or less.',
      },
    },
    {
      id: 'infra-bill',
      label: { en: 'Monthly infrastructure bill' },
      before: { value: 1500, unit: '€' },
      after: { value: 800, unit: '€' },
      better: 'lower',
      gain: 'percent',
      note: {
        en: 'About €8,400 a year saved by automating the cleanup of stale Velero backups piling up on our Kubernetes cluster at OVH.',
      },
    },
    {
      id: 'qa-first-pass',
      label: { en: 'Tickets passing QA first time' },
      before: { value: 60, unit: '%' },
      after: { value: 85, unit: '%' },
      better: 'higher',
      note: {
        en: 'From 5–7 out of 10 to 8–9, after bringing in docs, linters, formatters and strict test rules.',
      },
    },
    {
      id: 'api-response',
      label: { en: 'API response time' },
      before: { value: 90, unit: 's' },
      after: { value: 1, unit: 's' },
      better: 'lower',
      note: {
        en: 'Refactored inefficient Django ORM queries on a core endpoint: from up to 6000 database calls per request down to 7.',
      },
    },
    {
      id: 'lighthouse-seo',
      label: { en: 'Lighthouse SEO' },
      before: { value: 60 },
      after: { value: 100 },
      better: 'higher',
      note: {
        en: 'Led the migration of a key product from Svelte to SvelteKit.',
      },
    },
  ],
  highlight: {
    id: 'latest-pr',
    label: { en: 'Latest PR' },
    metric: { en: '< 2 months' },
    note: {
      en: 'MIOT Sentra: an IoT monitoring platform built from scratch by two people, live in its second month. 10+ clients in its first six months.',
    },
    caseSlug: 'miot',
  },
} as const satisfies {
  readonly lede: Localized;
  readonly items: readonly RecordItem[];
  readonly highlight: HighlightRecord;
};
