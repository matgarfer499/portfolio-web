import type { ImageAsset, Localized, Maybe } from './types';

export interface CaseStudy {
  readonly slug: string;
  readonly name: Maybe<Localized>;
  readonly tagline: Maybe<Localized>;
  readonly summary: Maybe<Localized>;
  readonly stack: readonly string[];
  readonly url?: string;
  readonly shots?: { readonly desktop: ImageAsset; readonly phone?: ImageAsset };
  /** Extra screens shown under the long-form sections of the case page. */
  readonly gallery?: readonly ImageAsset[];
  /** Long-form sections of /projects/[slug]: heading + body, each possibly still pending. */
  readonly sections: readonly {
    readonly id: string;
    readonly heading: Localized;
    readonly body?: Maybe<Localized>;
    readonly list?: readonly Localized[];
  }[];
}

const chefory = {
  slug: 'chefory',
  name: { en: 'Chefory' },
  tagline: { en: 'Kitchen inventory SaaS' },
  summary: {
    en: 'Inventory management for professional kitchens: real-time stock in and out, expense analytics, supplier management and a dashboard with the key numbers.',
  },
  stack: ['Next.js', 'TypeScript', 'Supabase', 'TailwindCSS'],
  url: 'https://cheforyapp.com',
  shots: {
    desktop: {
      src: '/projects/chefory-desktop.webp',
      width: 1910,
      height: 1133,
      alt: { en: 'Chefory landing page on a laptop' },
    },
    phone: {
      src: '/projects/chefory-iphone.webp',
      width: 1857,
      height: 3096,
      alt: { en: 'Chefory on a phone' },
    },
  },
  sections: [
    {
      id: 'overview',
      heading: { en: 'Overview' },
      body: {
        en: 'A web application for kitchen inventory management, designed to help businesses track stock, control expenses and manage suppliers. Built as a fully functional SaaS-style product with scalability and user experience in mind.',
      },
    },
    {
      id: 'features',
      heading: { en: 'What it does' },
      list: [
        {
          en: 'Real-time product entry and exit tracking',
        },
        { en: 'Detailed expense analytics' },
        { en: 'Supplier management' },
        {
          en: 'An interactive dashboard with the key metrics',
        },
      ],
    },
    {
      id: 'role',
      heading: { en: 'My role' },
      body: {
        en: 'Built end to end as a side project.',
      },
    },
    {
      id: 'results',
      heading: { en: 'Results' },
      body: {
        en: 'In use at a family business to control warehouse stock and supplier expenses.',
      },
    },
  ],
} as const satisfies CaseStudy;

const miot = {
  slug: 'miot',
  name: { en: 'MIOT Sentra' },
  tagline: {
    en: 'IoT monitoring platform · Bettergy',
  },
  summary: {
    en: 'Monitoring for energy installations: controllers and sensors, live readings, year-long charts and energy-saving calculations. Built from scratch by two people and live in under two months.',
  },
  stack: ['Next.js', 'Django', 'TimescaleDB', 'TypeScript', 'TailwindCSS'],
  shots: {
    desktop: {
      src: '/projects/miot-dashboard.webp',
      width: 1600,
      height: 714,
      alt: {
        en: 'MIOT Sentra dashboard with installations and device status, client names blurred',
      },
    },
  },
  gallery: [
    {
      src: '/projects/miot-charts.webp',
      width: 1600,
      height: 716,
      alt: {
        en: 'MIOT Sentra charts of sensor readings over time, client data blurred',
      },
    },
  ],
  sections: [
    {
      id: 'problem',
      heading: { en: 'The problem' },
      body: {
        en: "Bettergy's IoT monitoring lived in MIOT Classic, a legacy Django monolith on MongoDB (mongoengine). It had to be replaced by a new platform, Sentra, on a tight deadline.",
      },
    },
    {
      id: 'role',
      heading: { en: 'My role and the team' },
      body: {
        en: 'Two developers, with me leading the technical side while I also supported three colleagues on other projects. The IoT lead studied the requirements; I turned them into an architecture plan (database, stack and a set of Claude Code skills we wrote) to keep quality high at that speed.',
      },
    },
    {
      id: 'shipped',
      heading: { en: 'Key decisions' },
      list: [
        {
          en: 'TimescaleDB hypertables for the sensor time series: a 1-year chart at 15-minute resolution went from ~5 s to under a second.',
        },
        {
          en: 'A data model of client → users → installations → devices, where one user can belong to several clients with different roles. I proposed it over a user-first hierarchy, so internal staff run many clients from one account.',
        },
        {
          en: 'Energy-saving formulas for pipes, computed from controller and sensor readings.',
        },
        {
          en: 'A Next.js frontend over a Django API, learning TimescaleDB in about two weeks while designing the architecture.',
        },
      ],
    },
    {
      id: 'results',
      heading: { en: 'Results' },
      body: {
        en: 'Live in month two and still running. 10+ clients and 100+ connected devices (controllers and sensors) in its first six months.',
      },
    },
  ],
} as const satisfies CaseStudy;

const rat = {
  slug: 'rat',
  name: { en: 'R.A.T.' },
  tagline: { en: 'Social deduction party game' },
  summary: {
    en: 'Recognize A Traitor: everyone gets the secret word except the impostor. Play on one shared phone or online in real-time rooms, in English or Spanish.',
  },
  stack: ['Next.js', 'TypeScript', 'Socket.IO', 'FastAPI', 'Redis', 'Docker'],
  url: 'https://rat-frontend.vercel.app/en',
  shots: {
    desktop: {
      src: '/projects/rat-desktop.webp',
      width: 1920,
      height: 1200,
      alt: {
        en: 'R.A.T. home screen with the Play Online and One Device buttons',
      },
    },
    phone: {
      src: '/projects/rat-phone.webp',
      width: 780,
      height: 1688,
      alt: { en: 'R.A.T. on a phone' },
    },
  },
  sections: [
    {
      id: 'overview',
      heading: { en: 'Overview' },
      body: {
        en: 'A party game I built for my friends. Each round hands out roles (civilians, the impostor, and special roles like the detective and the joker); players give clues, argue and vote out whoever they think is lying. We played it a lot for over a month, mostly around one phone.',
      },
    },
    {
      id: 'features',
      heading: { en: 'What it does' },
      list: [
        {
          en: 'Two modes: pass one device around, or play online in rooms anyone can join from a public list.',
        },
        {
          en: 'Real-time game state over Socket.IO, through the clue, discussion and voting phases.',
        },
        {
          en: 'A FastAPI backend that keeps rooms in Redis and uses pub/sub to run on several instances.',
        },
        {
          en: 'English and Spanish, with word categories to choose from.',
        },
      ],
    },
    {
      id: 'role',
      heading: { en: 'My role' },
      body: {
        en: 'Designed and built alone, front and back, from November 2025 to January 2026. The frontend runs on Vercel; the API ships in Docker.',
      },
    },
  ],
} as const satisfies CaseStudy;

const physics = {
  slug: 'physics-sketchbook',
  name: { en: 'Physics Sketchbook' },
  tagline: { en: 'Real-time physics simulator' },
  summary: {
    en: 'Drop a body, pick its material and watch it fall, bounce or shatter in 3D, with the exact formulas and the measured values updating live beside it.',
  },
  stack: ['React', 'TypeScript', 'React Three Fiber', 'Rapier', 'Zustand', 'KaTeX', 'Bun'],
  url: 'https://physics-draft.netlify.app/',
  shots: {
    desktop: {
      src: '/projects/physics-desktop.webp',
      width: 1920,
      height: 1200,
      alt: {
        en: 'Physics Sketchbook: material controls, a 3D blueprint view of a falling sphere and the live formula panel',
      },
    },
    phone: {
      src: '/projects/physics-phone.webp',
      width: 780,
      height: 1688,
      alt: { en: 'Physics Sketchbook on a phone' },
    },
  },
  sections: [
    {
      id: 'overview',
      heading: { en: 'Overview' },
      body: {
        en: 'A physics sandbox with a technical-blueprint look. Its first module, free fall, runs on the Rapier physics engine: real collisions, bounce that depends on the material, and fracture (glass shatters, concrete and wood break into chunks, steel dents).',
      },
    },
    {
      id: 'features',
      heading: { en: 'What it does' },
      list: [
        {
          en: 'Ten materials with their own density, bounciness, friction and hardness.',
        },
        {
          en: 'Deterministic, seeded fracture: the same drop breaks the same way every time.',
        },
        {
          en: 'Every run is recorded frame by frame, so the timeline scrubs back and forth through the replay.',
        },
        {
          en: 'A live formula panel (KaTeX) with the measured position, velocity and energy, plus CSV export.',
        },
      ],
    },
    {
      id: 'role',
      heading: { en: 'My role' },
      body: {
        en: 'The idea came from a friend; I designed and built almost all of it, from March to July 2026. A Bun monorepo with the pure solvers in their own package, Biome, lefthook and CI.',
      },
    },
  ],
} as const satisfies CaseStudy;

const rascame = {
  slug: 'rascame-esta',
  name: { en: 'Ráscame esta' },
  tagline: {
    en: 'A birthday game, Metal Gear Solid style',
  },
  summary: {
    en: 'A private web game I made as a birthday present for two friends: a wall of scratch cards hides the real gifts among fakes, and codec calls unlock challenges along the way.',
  },
  stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Upstash Redis', 'Howler.js', 'Vitest'],
  shots: {
    desktop: {
      src: '/projects/rascame-desktop.webp',
      width: 1920,
      height: 1200,
      alt: {
        en: 'An incoming codec call on frequency 140.85, in the style of Metal Gear Solid',
      },
    },
    phone: {
      src: '/projects/rascame-phone.webp',
      width: 780,
      height: 1688,
      alt: { en: 'The codec call on a phone' },
    },
  },
  sections: [
    {
      id: 'overview',
      heading: { en: 'Overview' },
      body: {
        en: 'Built for two people and played on their phones. The jokes inside stay between friends; the engineering is fair game.',
      },
    },
    {
      id: 'features',
      heading: { en: 'What it does' },
      list: [
        {
          en: 'Scratch cards drawn on canvas, with grid-based tracking of how much of each card has been scratched.',
        },
        {
          en: "Four challenges: trivia, memory, a confession that listens to the microphone's volume, and a boss fight driven by the accelerometer and a war cry.",
        },
        {
          en: 'Codec calls with voice, sound effects and synced subtitles (Howler.js).',
        },
        {
          en: 'The deck is generated on the server and kept with the session in Upstash Redis, so the real codes stay on the server until a card is scratched.',
        },
      ],
    },
    {
      id: 'role',
      heading: { en: 'My role' },
      body: {
        en: 'Built alone, from March to April 2026, with Vitest covering the game logic.',
      },
    },
  ],
} as const satisfies CaseStudy;

// Order matters: the first is featured on the home, each page links to the next one.
export const projects = {
  caseStudies: [miot, rat, physics, chefory, rascame],
  stack: [
    {
      id: 'daily',
      title: { en: 'Daily drivers' },
      items: [
        'Python',
        'Django',
        'PostgreSQL',
        'Next.js',
        'TypeScript',
        'TailwindCSS',
        'Docker',
        'Kubernetes',
      ],
    },
    {
      id: 'also',
      title: { en: 'Also shipped with' },
      items: [
        'FastAPI',
        'Redis',
        'Socket.IO',
        'TimescaleDB',
        'Grafana',
        'Loki',
        'Prometheus',
        'SvelteKit',
        'Flask',
      ],
    },
    {
      id: 'tools',
      title: { en: 'Tools' },
      items: ['Claude Code', 'Git', 'Jira', 'Figma'],
    },
  ],
} as const satisfies {
  readonly caseStudies: readonly CaseStudy[];
  readonly stack: readonly {
    readonly id: string;
    readonly title: Localized;
    readonly items: readonly string[];
  }[];
};
