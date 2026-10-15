import type { ImageAsset, Localized, Maybe, Rich } from './types';

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
    role: { en: 'Full Stack Engineer · Tech Lead', es: 'Ingeniero Full Stack · Tech Lead' },
    roleSince: { en: '2026', es: '2026' },
    bullets: [
      [
        {
          en: "Lead a team of five technically: architecture, code reviews, standards, and who takes what, matching each task to each person's strengths.",
          es: 'Lidero técnicamente un equipo de cinco: arquitectura, revisiones de código, estándares y quién se encarga de qué, según los puntos fuertes de cada persona.',
        },
      ],
      [
        {
          en: 'Built MIOT Sentra, an IoT monitoring platform, from scratch with one other developer: live in under two months, with 10+ clients and 100+ connected devices in six.',
          es: 'Construí MIOT Sentra, una plataforma de monitorización IoT, desde cero junto a otro desarrollador: en producción en menos de dos meses, con más de 10 clientes y más de 100 dispositivos conectados en seis.',
        },
      ],
      [
        {
          en: "Designed MIOT Sentra's data model (client → users → installations → devices) so staff manage several clients from one account; a 1-year chart went from ~5 s to under 1 s on TimescaleDB.",
          es: 'Diseñé el modelo de datos de MIOT Sentra (cliente → usuarios → instalaciones → dispositivos) para que el personal gestione varios clientes desde una sola cuenta; un gráfico de un año pasó de ~5 s a menos de 1 s con TimescaleDB.',
        },
      ],
      [
        {
          en: 'Introduced an AI-assisted workflow (Claude Code) and tickets of two days or less: ~3× more tickets per two-week sprint (about 10 → 30), testing and QA included.',
          es: 'Introduje un flujo de trabajo con IA (Claude Code) y tickets de dos días como máximo: unas 3× más tareas por sprint de dos semanas (de unas 10 a 30), con tests y QA incluidos.',
        },
      ],
      [
        {
          en: 'Brought in docs, linters, formatters and strict test rules: tickets passing QA first time went from 5–7 out of 10 to 8–9, and releases from two a month to one or two a week.',
          es: 'Introduje documentación, linters, formatters y reglas estrictas de tests: los tickets que pasan QA a la primera pasaron de 5–7 de cada 10 a 8–9, y los despliegues, de dos al mes a uno o dos por semana.',
        },
      ],
      [
        {
          en: "Rebuilt the main product's frontend in Next.js over a versioned Django API (v1 kept, v2 extends it), with a new flow that gives internal technicians more autonomy.",
          es: 'Rehíce el frontend del producto principal en Next.js sobre una API de Django versionada (se mantiene la v1 y la v2 la amplía), con un flujo nuevo que da más autonomía a los técnicos internos.',
        },
      ],
      [
        {
          en: 'Internal apps, including a new company hub: satisfaction and usage up from 30% to 75%, measured with surveys and real usage.',
          es: 'Apps internas, incluido un nuevo hub de empresa: satisfacción y uso del 30 % al 75 %, medido con encuestas y uso real.',
        },
      ],
      [
        {
          en: 'Cut the monthly infrastructure bill from €1,500 to €800 (about €8,400 a year) by automating the cleanup of stale Velero backups on Kubernetes (OVH); set up Grafana, Loki and Prometheus alerts to Teams and email, so we catch incidents before clients do.',
          es: 'Bajé la factura mensual de infraestructura de 1500 € a 800 € (unos 8400 € al año) automatizando la limpieza de copias de Velero obsoletas en Kubernetes (OVH); monté alertas con Grafana, Loki y Prometheus a Teams y al correo, para detectar incidencias antes que los clientes.',
        },
      ],
      [
        {
          en: 'Onboarded three juniors this year with weekly sessions and joint reviews; each one shipped to production within their first month.',
          es: 'Incorporé a tres juniors este año con sesiones semanales y revisiones conjuntas; cada uno subió algo a producción en su primer mes.',
        },
      ],
      [
        {
          en: 'Django ORM refactor: 90 s → 1 s response time and up to 6000 → 7 DB calls per request. Svelte → SvelteKit migration: SEO 60 → 100 in Lighthouse.',
          es: 'Refactor del ORM de Django: respuesta de 90 s a 1 s y de hasta 6000 a 7 llamadas a la BD por petición. Migración de Svelte a SvelteKit: SEO de 60 a 100 en Lighthouse.',
        },
      ],
    ],
    chips: [
      'Next.js',
      'Django',
      'TypeScript',
      'PostgreSQL',
      'TimescaleDB',
      'TailwindCSS',
      'Docker',
      'Kubernetes',
    ],
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
