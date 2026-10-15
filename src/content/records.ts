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
  /** How the badge reads a rise: + points by default (scores), or × more (counts). */
  readonly gain?: 'ratio';
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
    es: 'Cifras reales de producción de mi trabajo en Bettergy, antes y después.',
  },
  items: [
    {
      id: 'chart-load',
      label: { en: '1-year chart load', es: 'Carga de un gráfico de 1 año' },
      before: { value: 5, unit: 's' },
      after: { value: 1, unit: 's' },
      better: 'lower',
      note: {
        en: 'MIOT: a full year at 15-minute resolution now loads in under a second, on TimescaleDB hypertables.',
        es: 'MIOT: un año entero a resolución de 15 minutos carga ahora en menos de un segundo, sobre hypertables de TimescaleDB.',
      },
    },
    {
      id: 'releases',
      label: { en: 'Production releases a month', es: 'Despliegues a producción al mes' },
      before: { value: 2 },
      after: { value: 4 },
      better: 'higher',
      gain: 'ratio',
      note: {
        en: 'From two releases a month at most to one or two every week, with tests and QA in the flow.',
        es: 'De dos despliegues al mes como mucho a uno o dos cada semana, con tests y QA dentro del flujo.',
      },
    },
    {
      id: 'sprint-tickets',
      label: { en: 'Tickets per two-week sprint', es: 'Tickets por sprint de dos semanas' },
      before: { value: 10 },
      after: { value: 30 },
      better: 'higher',
      gain: 'ratio',
      note: {
        en: 'Roughly 10 to 30, testing and QA included, after bringing in an AI-assisted workflow (Claude Code) and tickets of two days or less.',
        es: 'De unos 10 a 30, con tests y QA incluidos, tras introducir un flujo de trabajo con IA (Claude Code) y tickets de dos días como máximo.',
      },
    },
    {
      id: 'qa-first-pass',
      label: { en: 'Tickets passing QA first time', es: 'Tickets que pasan QA a la primera' },
      before: { value: 60, unit: '%' },
      after: { value: 85, unit: '%' },
      better: 'higher',
      note: {
        en: 'From 5–7 out of 10 to 8–9, after bringing in docs, linters, formatters and strict test rules.',
        es: 'De 5–7 de cada 10 a 8–9, tras introducir documentación, linters, formatters y reglas estrictas de tests.',
      },
    },
    {
      id: 'api-response',
      label: { en: 'API response time', es: 'Tiempo de respuesta de la API' },
      before: { value: 90, unit: 's' },
      after: { value: 1, unit: 's' },
      better: 'lower',
      note: {
        en: 'Refactored inefficient Django ORM queries on a core endpoint.',
        es: 'Refactoricé consultas ineficientes del ORM de Django en un endpoint clave.',
      },
    },
    {
      id: 'db-calls',
      label: { en: 'DB calls per request', es: 'Llamadas a la BD por petición' },
      before: { value: 6000 },
      after: { value: 7 },
      better: 'lower',
      note: {
        en: 'Same refactor: from up to 6000 database calls down to 7.',
        es: 'Mismo refactor: de hasta 6000 llamadas a la base de datos a solo 7.',
      },
    },
    {
      id: 'lighthouse-seo',
      label: { en: 'Lighthouse SEO', es: 'SEO en Lighthouse' },
      before: { value: 60 },
      after: { value: 100 },
      better: 'higher',
      note: {
        en: 'Led the migration of a key product from Svelte to SvelteKit.',
        es: 'Lideré la migración de un producto clave de Svelte a SvelteKit.',
      },
    },
  ],
  highlight: {
    id: 'latest-pr',
    label: { en: 'Latest PR', es: 'Último récord' },
    metric: { en: '< 2 months', es: '< 2 meses' },
    note: {
      en: 'MIOT: an IoT monitoring platform built from scratch by two people, live in its second month. 10+ clients in its first six months.',
      es: 'MIOT: una plataforma de monitorización IoT creada desde cero entre dos personas y en producción al segundo mes. Más de 10 clientes en sus primeros seis meses.',
    },
    caseSlug: 'miot',
  },
} as const satisfies {
  readonly lede: Localized;
  readonly items: readonly RecordItem[];
  readonly highlight: HighlightRecord;
};
