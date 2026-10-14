import { pending, type ImageAsset, type Localized, type Maybe, type Rich } from './types';

export interface LogEntry {
  readonly id: string;
  readonly kind: 'job' | 'internship' | 'education';
  /** ISO months; a missing start means a single date (a degree), a missing end means "now". */
  readonly start?: string;
  readonly end?: string;
  readonly place: Localized;
  readonly team: {
    readonly name: string;
    readonly logo?: Omit<ImageAsset, 'alt'>;
  };
  readonly role: Localized;
  readonly roleSince?: Maybe<Localized>;
  readonly bullets: readonly Rich[];
  readonly chips: readonly string[];
  /** The degree row lists the spoken languages from profile.languages (one source). */
  readonly showLanguages?: boolean;
}

// Newest first, in the artifact's order (the degree only has a completion month, so no sorting).
export const experience = [
  {
    id: 'bettergy',
    kind: 'job',
    start: '2024-01',
    place: { en: 'Málaga', es: 'Málaga' },
    team: { name: 'Bettergy', logo: { src: '/logos/bettergy.png', width: 2178, height: 635 } },
    role: { en: 'Tech Lead · Full Stack Developer', es: 'Tech Lead · Desarrollador Full Stack' },
    roleSince: pending({
      en: 'Since when you are Tech Lead (month and year)',
      es: 'Desde cuándo eres Tech Lead (mes y año)',
    }),
    bullets: [
      [
        {
          en: 'Tech lead of my team, leading products end to end.',
          es: 'Tech lead de mi equipo: llevo productos de principio a fin.',
        },
        pending({
          en: 'Products you lead and their outcomes',
          es: 'Productos que lideras y sus resultados',
        }),
      ],
      [
        {
          en: 'Migrated a key product from Svelte to SvelteKit: SEO 60 → 100 in Lighthouse.',
          es: 'Migré un producto clave de Svelte a SvelteKit: SEO de 60 a 100 en Lighthouse.',
        },
      ],
      [
        {
          en: 'Django ORM refactor: 90 s → 1 s response time, up to 6000 → 7 DB calls per request.',
          es: 'Refactor del ORM de Django: respuesta de 90 s a 1 s y de hasta 6000 a 7 llamadas a la BD por petición.',
        },
      ],
      [
        {
          en: 'Defined a Screaming Architecture folder structure that speeds up onboarding.',
          es: 'Definí una estructura de carpetas basada en Screaming Architecture que agiliza la incorporación de gente nueva.',
        },
      ],
      [
        {
          en: 'Built a Celery cronjob system that stabilised data pulls from unreliable APIs.',
          es: 'Monté un sistema de tareas programadas con Celery que estabilizó la descarga de datos de APIs poco fiables.',
        },
      ],
      [
        {
          en: 'Standardised commit conventions and releases: fewer production errors, smoother QA.',
          es: 'Estandaricé las convenciones de commits y las releases: menos errores en producción y un QA más fluido.',
        },
      ],
    ],
    chips: ['Django', 'Flask', 'SvelteKit', 'TailwindCSS', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'uniklinik',
    kind: 'internship',
    start: '2023-03',
    end: '2023-06',
    place: { en: 'Cologne', es: 'Colonia' },
    team: {
      name: 'Uniklinik Köln',
      logo: { src: '/logos/uniklinik.webp', width: 860, height: 292 },
    },
    role: { en: 'Full Stack Developer, internship', es: 'Desarrollador Full Stack, prácticas' },
    bullets: [
      [
        {
          en: 'Built an internal platform where hospital staff publish and read scientific articles.',
          es: 'Construí una plataforma interna en la que el personal del hospital publica y lee artículos científicos.',
        },
      ],
      [
        {
          en: 'Delivered ahead of schedule, which left time for extra QA and exploratory testing.',
          es: 'Entregué antes de plazo, lo que dejó tiempo para más QA y pruebas exploratorias.',
        },
      ],
      [
        {
          en: 'Designed an accessible UI for staff of every age and technical background.',
          es: 'Diseñé una interfaz accesible para personal de todas las edades y niveles técnicos.',
        },
      ],
      [
        {
          en: 'Worked in a fully English-speaking team.',
          es: 'Trabajé en un equipo en el que todo era en inglés.',
        },
      ],
    ],
    chips: ['Flask', 'Jinja2', 'JavaScript', 'Bulma CSS', 'Budibase'],
  },
  {
    id: 'alan-turing',
    kind: 'education',
    end: '2023-06',
    place: { en: 'Málaga', es: 'Málaga' },
    team: { name: 'CPIFP Alan Turing' },
    role: {
      en: 'Higher Technician in Development of Web Applications',
      es: 'Técnico Superior en Desarrollo de Aplicaciones Web',
    },
    bullets: [
      [
        {
          en: 'Vocational degree in web application development, completed June 2023.',
          es: 'Ciclo formativo de grado superior en desarrollo de aplicaciones web, terminado en junio de 2023.',
        },
      ],
    ],
    chips: [],
    showLanguages: true,
  },
] as const satisfies readonly LogEntry[];
