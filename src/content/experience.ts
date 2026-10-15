import type { ImageAsset, Localized, Rich } from './types';

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
  readonly roleSince?: Localized;
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
    place: { en: 'Málaga' },
    team: { name: 'Bettergy', logo: { src: '/logos/bettergy.png', width: 2178, height: 635 } },
    role: { en: 'Full Stack Engineer · Tech Lead' },
    roleSince: { en: '2026' },
    bullets: [
      [
        {
          en: "Lead a team of five technically: architecture, code reviews, standards, and who takes what, matching each task to each person's strengths.",
        },
      ],
      [
        {
          en: 'Built MIOT Sentra, an IoT monitoring platform, from scratch with one other developer: live in under two months, with 10+ clients and 100+ connected devices in six.',
        },
      ],
      [
        {
          en: "Designed MIOT Sentra's data model (client → users → installations → devices) so staff manage several clients from one account; a 1-year chart went from ~5 s to under 1 s on TimescaleDB.",
        },
      ],
      [
        {
          en: 'Introduced an AI-assisted workflow (Claude Code) and tickets of two days or less: ~3× more tickets per two-week sprint (about 10 → 30), testing and QA included.',
        },
      ],
      [
        {
          en: 'Brought in docs, linters, formatters and strict test rules: tickets passing QA first time went from 5–7 out of 10 to 8–9, and releases from two a month to one or two a week.',
        },
      ],
      [
        {
          en: "Rebuilt the main product's frontend in Next.js over a versioned Django API (v1 kept, v2 extends it), with a new flow that gives internal technicians more autonomy.",
        },
      ],
      [
        {
          en: 'Internal apps, including a new company hub: satisfaction and usage up from 30% to 75%, measured with surveys and real usage.',
        },
      ],
      [
        {
          en: 'Cut the monthly infrastructure bill from €1,500 to €800 (about €8,400 a year) by automating the cleanup of stale Velero backups on Kubernetes (OVH); set up Grafana, Loki and Prometheus alerts to Teams and email, so we catch incidents before clients do.',
        },
      ],
      [
        {
          en: 'Onboarded three juniors this year with weekly sessions and joint reviews; each one shipped to production within their first month.',
        },
      ],
      [
        {
          en: 'Django ORM refactor: 90 s → 1 s response time and up to 6000 → 7 DB calls per request. Svelte → SvelteKit migration: SEO 60 → 100 in Lighthouse.',
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
    place: { en: 'Cologne' },
    team: {
      name: 'Uniklinik Köln',
      logo: { src: '/logos/uniklinik.webp', width: 860, height: 292 },
    },
    role: { en: 'Full Stack Developer, internship' },
    bullets: [
      [
        {
          en: 'Built an internal platform where hospital staff publish and read scientific articles.',
        },
      ],
      [
        {
          en: 'Delivered ahead of schedule, which left time for extra QA and exploratory testing.',
        },
      ],
      [
        {
          en: 'Designed an accessible UI for staff of every age and technical background.',
        },
      ],
      [
        {
          en: 'Worked in a fully English-speaking team.',
        },
      ],
    ],
    chips: ['Flask', 'Jinja2', 'JavaScript', 'Bulma CSS', 'Budibase'],
  },
  {
    id: 'alan-turing',
    kind: 'education',
    end: '2023-06',
    place: { en: 'Málaga' },
    team: { name: 'CPIFP Alan Turing' },
    role: {
      en: 'Higher Technician in Development of Web Applications',
    },
    bullets: [
      [
        {
          en: 'Vocational degree in web application development, completed June 2023.',
        },
      ],
    ],
    chips: [],
    showLanguages: true,
  },
] as const satisfies readonly LogEntry[];
