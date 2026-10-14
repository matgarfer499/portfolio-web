import { pending, type Localized, type Maybe } from './types';

export interface RecordItem {
  readonly id: string;
  readonly label: Localized;
  readonly before: { readonly value: number; readonly unit?: string };
  readonly after: { readonly value: number; readonly unit?: string };
  /** Which way is an improvement: response times go down, scores go up. */
  readonly better: 'lower' | 'higher';
  readonly note: Localized;
}

export interface PendingRecord {
  readonly id: string;
  readonly label: Localized;
  readonly metric: Maybe<Localized>;
  readonly note: Maybe<Localized>;
}

export const records = {
  lede: {
    en: 'Production numbers from my work at Bettergy, before and after.',
    es: 'Números de producción de mi trabajo en Bettergy, antes y después.',
  },
  items: [
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
  next: {
    id: 'new-pr',
    label: { en: 'New PR', es: 'Nuevo récord' },
    metric: pending({ en: 'Metric', es: 'Métrica' }),
    note: pending({
      en: 'New PR — a product you led as Tech Lead, and its result',
      es: 'Nuevo récord — un producto que lideraste como Tech Lead y su resultado',
    }),
  },
} as const satisfies {
  readonly lede: Localized;
  readonly items: readonly RecordItem[];
  readonly next: PendingRecord;
};
