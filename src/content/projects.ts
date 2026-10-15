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
  name: { en: 'Chefory', es: 'Chefory' },
  tagline: { en: 'Kitchen inventory SaaS', es: 'SaaS de inventario para cocinas' },
  summary: {
    en: 'Inventory management for professional kitchens: real-time stock in and out, expense analytics, supplier management and a dashboard with the key numbers.',
    es: 'Gestión de inventario para cocinas profesionales: entradas y salidas de stock en tiempo real, analítica de gastos, gestión de proveedores y un panel con los números clave.',
  },
  stack: ['Next.js', 'TypeScript', 'Supabase', 'TailwindCSS'],
  url: 'https://cheforyapp.com',
  shots: {
    desktop: {
      src: '/projects/chefory-desktop.webp',
      width: 1910,
      height: 1133,
      alt: { en: 'Chefory landing page on a laptop', es: 'La landing de Chefory en un portátil' },
    },
    phone: {
      src: '/projects/chefory-iphone.webp',
      width: 1857,
      height: 3096,
      alt: { en: 'Chefory on a phone', es: 'Chefory en un móvil' },
    },
  },
  sections: [
    {
      id: 'overview',
      heading: { en: 'Overview', es: 'De qué va' },
      body: {
        en: 'A web application for kitchen inventory management, designed to help businesses track stock, control expenses and manage suppliers. Built as a fully functional SaaS-style product with scalability and user experience in mind.',
        es: 'Una aplicación web de gestión de inventario para cocinas, pensada para que los negocios controlen el stock, los gastos y los proveedores. Construida como un SaaS completo y funcional, pensando en la escalabilidad y en la experiencia de usuario.',
      },
    },
    {
      id: 'features',
      heading: { en: 'What it does', es: 'Qué hace' },
      list: [
        {
          en: 'Real-time product entry and exit tracking',
          es: 'Registro de entradas y salidas de producto en tiempo real',
        },
        { en: 'Detailed expense analytics', es: 'Analítica de gastos detallada' },
        { en: 'Supplier management', es: 'Gestión de proveedores' },
        {
          en: 'An interactive dashboard with the key metrics',
          es: 'Un panel interactivo con las métricas clave',
        },
      ],
    },
    {
      id: 'role',
      heading: { en: 'My role', es: 'Mi papel' },
      body: {
        en: 'Built end to end as a side project.',
        es: 'Construido de principio a fin como proyecto personal.',
      },
    },
    {
      id: 'results',
      heading: { en: 'Results', es: 'Resultados' },
      body: {
        en: 'In use at a family business to control warehouse stock and supplier expenses.',
        es: 'En uso en un negocio familiar para controlar el stock del almacén y los gastos con proveedores.',
      },
    },
  ],
} as const satisfies CaseStudy;

const miot = {
  slug: 'miot',
  name: { en: 'MIOT', es: 'MIOT' },
  tagline: {
    en: 'IoT monitoring platform · Bettergy',
    es: 'Plataforma de monitorización IoT · Bettergy',
  },
  summary: {
    en: 'Monitoring for energy installations: controllers and sensors, live readings, year-long charts and energy-saving calculations. Built from scratch by two people and live in under two months.',
    es: 'Monitorización de instalaciones energéticas: controladores y sensores, lecturas en directo, gráficos de un año y cálculo de ahorro energético. Creada desde cero entre dos personas y en producción en menos de dos meses.',
  },
  stack: ['Next.js', 'Django', 'TimescaleDB', 'TypeScript', 'TailwindCSS'],
  shots: {
    desktop: {
      src: '/projects/miot-dashboard.webp',
      width: 1600,
      height: 714,
      alt: {
        en: 'MIOT dashboard with installations and device status, client names blurred',
        es: 'Panel de MIOT con instalaciones y estado de los dispositivos, con los nombres de clientes difuminados',
      },
    },
  },
  gallery: [
    {
      src: '/projects/miot-charts.webp',
      width: 1600,
      height: 716,
      alt: {
        en: 'MIOT charts of sensor readings over time, client data blurred',
        es: 'Gráficos de MIOT con lecturas de sensores en el tiempo, con los datos del cliente difuminados',
      },
    },
  ],
  sections: [
    {
      id: 'problem',
      heading: { en: 'The problem', es: 'El problema' },
      body: {
        en: "Bettergy's IoT monitoring lived in a legacy Django monolith on MongoDB (mongoengine). It had to be replaced by a new platform, on a tight deadline.",
        es: 'La monitorización IoT de Bettergy vivía en un monolito heredado de Django sobre MongoDB (mongoengine). Había que sustituirlo por una plataforma nueva, con un plazo muy ajustado.',
      },
    },
    {
      id: 'role',
      heading: { en: 'My role and the team', es: 'Mi papel y el equipo' },
      body: {
        en: 'Two developers, with me leading the technical side while I also supported three colleagues on other projects. The IoT lead studied the requirements; I turned them into an architecture plan (database, stack and a set of Claude Code skills we wrote) to keep quality high at that speed.',
        es: 'Dos desarrolladores, con yo al frente de la parte técnica mientras apoyaba a tres compañeros en otros proyectos. El responsable de IoT estudió los requisitos; yo los convertí en un plan de arquitectura (base de datos, stack y unas skills de Claude Code que escribimos) para mantener la calidad a ese ritmo.',
      },
    },
    {
      id: 'shipped',
      heading: { en: 'Key decisions', es: 'Decisiones clave' },
      list: [
        {
          en: 'TimescaleDB hypertables for the sensor time series: a 1-year chart at 15-minute resolution went from ~5 s to under a second.',
          es: 'Hypertables de TimescaleDB para las series temporales de los sensores: un gráfico de un año a resolución de 15 minutos pasó de ~5 s a menos de un segundo.',
        },
        {
          en: 'A data model of client → users → installations → devices, where one user can belong to several clients with different roles. I proposed it over a user-first hierarchy, so internal staff run many clients from one account.',
          es: 'Un modelo de datos cliente → usuarios → instalaciones → dispositivos, en el que un usuario puede pertenecer a varios clientes con roles distintos. Lo propuse frente a una jerarquía centrada en el usuario, para que el personal interno lleve muchos clientes desde una sola cuenta.',
        },
        {
          en: 'Energy-saving formulas for pipes, computed from controller and sensor readings.',
          es: 'Fórmulas de ahorro energético para tuberías, calculadas a partir de las lecturas de controladores y sensores.',
        },
        {
          en: 'A Next.js frontend over a Django API, learning TimescaleDB in about two weeks while designing the architecture.',
          es: 'Un frontend en Next.js sobre una API de Django, aprendiendo TimescaleDB en unas dos semanas mientras diseñaba la arquitectura.',
        },
      ],
    },
    {
      id: 'results',
      heading: { en: 'Results', es: 'Resultados' },
      body: {
        en: 'Live in month two and still running. 10+ clients and 100+ connected devices (controllers and sensors) in its first six months.',
        es: 'En producción al segundo mes y sigue funcionando. Más de 10 clientes y más de 100 dispositivos conectados (controladores y sensores) en sus primeros seis meses.',
      },
    },
  ],
} as const satisfies CaseStudy;

const rat = {
  slug: 'rat',
  name: { en: 'R.A.T.', es: 'R.A.T.' },
  tagline: { en: 'Social deduction party game', es: 'Juego social de deducción' },
  summary: {
    en: 'Recognize A Traitor: everyone gets the secret word except the impostor. Play on one shared phone or online in real-time rooms, in English or Spanish.',
    es: 'Recognize A Traitor: todos reciben la palabra secreta menos el impostor. Se juega pasando un móvil o en línea, en salas en tiempo real, en inglés o en español.',
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
        es: 'Pantalla de inicio de R.A.T. con los botones para jugar en línea o en un solo dispositivo',
      },
    },
    phone: {
      src: '/projects/rat-phone.webp',
      width: 780,
      height: 1688,
      alt: { en: 'R.A.T. on a phone', es: 'R.A.T. en un móvil' },
    },
  },
  sections: [
    {
      id: 'overview',
      heading: { en: 'Overview', es: 'De qué va' },
      body: {
        en: 'A party game I built for my friends. Each round hands out roles (civilians, the impostor, and special roles like the detective and the joker); players give clues, argue and vote out whoever they think is lying. We played it a lot for over a month, mostly around one phone.',
        es: 'Un juego de fiesta que hice para mis amigos. Cada ronda reparte roles (civiles, el impostor y roles especiales como el detective y el bufón); los jugadores dan pistas, discuten y votan a quien creen que miente. Lo jugamos muchísimo durante más de un mes, sobre todo con un solo móvil.',
      },
    },
    {
      id: 'features',
      heading: { en: 'What it does', es: 'Qué hace' },
      list: [
        {
          en: 'Two modes: pass one device around, or play online in rooms anyone can join from a public list.',
          es: 'Dos modos: pasar un solo dispositivo o jugar en línea en salas a las que cualquiera puede unirse desde una lista pública.',
        },
        {
          en: 'Real-time game state over Socket.IO, through the clue, discussion and voting phases.',
          es: 'Estado de la partida en tiempo real con Socket.IO, a lo largo de las fases de pistas, debate y votación.',
        },
        {
          en: 'A FastAPI backend that keeps rooms in Redis and uses pub/sub to run on several instances.',
          es: 'Un backend en FastAPI que guarda las salas en Redis y usa pub/sub para funcionar en varias instancias.',
        },
        {
          en: 'English and Spanish, with word categories to choose from.',
          es: 'En inglés y en español, con categorías de palabras para elegir.',
        },
      ],
    },
    {
      id: 'role',
      heading: { en: 'My role', es: 'Mi papel' },
      body: {
        en: 'Designed and built alone, front and back, from November 2025 to January 2026. The frontend runs on Vercel; the API ships in Docker.',
        es: 'Diseñado y construido por mí solo, front y back, entre noviembre de 2025 y enero de 2026. El frontend corre en Vercel; la API se despliega con Docker.',
      },
    },
  ],
} as const satisfies CaseStudy;

const physics = {
  slug: 'physics-sketchbook',
  name: { en: 'Physics Sketchbook', es: 'Physics Sketchbook' },
  tagline: { en: 'Real-time physics simulator', es: 'Simulador de física en tiempo real' },
  summary: {
    en: 'Drop a body, pick its material and watch it fall, bounce or shatter in 3D, with the exact formulas and the measured values updating live beside it.',
    es: 'Suelta un cuerpo, elige su material y míralo caer, rebotar o romperse en 3D, con las fórmulas exactas y los valores medidos actualizándose en directo a su lado.',
  },
  stack: ['React', 'TypeScript', 'React Three Fiber', 'Rapier', 'Zustand', 'KaTeX', 'Bun'],
  shots: {
    desktop: {
      src: '/projects/physics-desktop.webp',
      width: 1920,
      height: 1200,
      alt: {
        en: 'Physics Sketchbook: material controls, a 3D blueprint view of a falling sphere and the live formula panel',
        es: 'Physics Sketchbook: controles de material, una vista 3D tipo plano de una esfera cayendo y el panel de fórmulas en directo',
      },
    },
    phone: {
      src: '/projects/physics-phone.webp',
      width: 780,
      height: 1688,
      alt: { en: 'Physics Sketchbook on a phone', es: 'Physics Sketchbook en un móvil' },
    },
  },
  sections: [
    {
      id: 'overview',
      heading: { en: 'Overview', es: 'De qué va' },
      body: {
        en: 'A physics sandbox with a technical-blueprint look. Its first module, free fall, runs on the Rapier physics engine: real collisions, bounce that depends on the material, and fracture (glass shatters, concrete and wood break into chunks, steel dents).',
        es: 'Un laboratorio de física con estética de plano técnico. Su primer módulo, la caída libre, funciona sobre el motor de física Rapier: colisiones reales, rebote según el material y fractura (el vidrio se hace añicos, el hormigón y la madera se parten en trozos, el acero se abolla).',
      },
    },
    {
      id: 'features',
      heading: { en: 'What it does', es: 'Qué hace' },
      list: [
        {
          en: 'Ten materials with their own density, bounciness, friction and hardness.',
          es: 'Diez materiales, cada uno con su densidad, rebote, fricción y dureza.',
        },
        {
          en: 'Deterministic, seeded fracture: the same drop breaks the same way every time.',
          es: 'Fractura determinista con semilla: la misma caída se rompe siempre igual.',
        },
        {
          en: 'Every run is recorded frame by frame, so the timeline scrubs back and forth through the replay.',
          es: 'Cada simulación se graba fotograma a fotograma, así que la línea de tiempo avanza y retrocede sobre la repetición.',
        },
        {
          en: 'A live formula panel (KaTeX) with the measured position, velocity and energy, plus CSV export.',
          es: 'Un panel de fórmulas en directo (KaTeX) con la posición, la velocidad y la energía medidas, y exportación a CSV.',
        },
      ],
    },
    {
      id: 'role',
      heading: { en: 'My role', es: 'Mi papel' },
      body: {
        en: 'The idea came from a friend; I designed and built almost all of it, from March to July 2026. A Bun monorepo with the pure solvers in their own package, Biome, lefthook and CI.',
        es: 'La idea fue de un amigo; yo lo diseñé y construí casi entero, de marzo a julio de 2026. Un monorepo con Bun, con los solvers puros en su propio paquete, Biome, lefthook y CI.',
      },
    },
  ],
} as const satisfies CaseStudy;

const rascame = {
  slug: 'rascame-esta',
  name: { en: 'Ráscame esta', es: 'Ráscame esta' },
  tagline: {
    en: 'A birthday game, Metal Gear Solid style',
    es: 'Un juego de cumpleaños al estilo Metal Gear Solid',
  },
  summary: {
    en: 'A private web game I made as a birthday present for two friends: a wall of scratch cards hides the real gifts among fakes, and codec calls unlock challenges along the way.',
    es: 'Un juego web privado que hice como regalo de cumpleaños para dos amigos: un muro de rasca y gana esconde los regalos de verdad entre otros falsos, y las llamadas por códec desbloquean retos por el camino.',
  },
  stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Upstash Redis', 'Howler.js', 'Vitest'],
  shots: {
    desktop: {
      src: '/projects/rascame-desktop.webp',
      width: 1920,
      height: 1200,
      alt: {
        en: 'An incoming codec call on frequency 140.85, in the style of Metal Gear Solid',
        es: 'Una llamada de códec entrante en la frecuencia 140.85, al estilo de Metal Gear Solid',
      },
    },
    phone: {
      src: '/projects/rascame-phone.webp',
      width: 780,
      height: 1688,
      alt: { en: 'The codec call on a phone', es: 'La llamada de códec en un móvil' },
    },
  },
  sections: [
    {
      id: 'overview',
      heading: { en: 'Overview', es: 'De qué va' },
      body: {
        en: 'Built for two people and played on their phones. The jokes inside stay between friends; the engineering is fair game.',
        es: 'Hecho para dos personas y para jugarlo en sus móviles. Las bromas de dentro se quedan entre amigos; la ingeniería, no.',
      },
    },
    {
      id: 'features',
      heading: { en: 'What it does', es: 'Qué hace' },
      list: [
        {
          en: 'Scratch cards drawn on canvas, with grid-based tracking of how much of each card has been scratched.',
          es: 'Rasca y gana dibujado en canvas, con un seguimiento por cuadrícula de cuánto se ha rascado cada carta.',
        },
        {
          en: "Four challenges: trivia, memory, a confession that listens to the microphone's volume, and a boss fight driven by the accelerometer and a war cry.",
          es: 'Cuatro retos: trivial, memoria, una confesión que escucha el volumen del micrófono y un jefe final que se controla con el acelerómetro y un grito de guerra.',
        },
        {
          en: 'Codec calls with voice, sound effects and synced subtitles (Howler.js).',
          es: 'Llamadas de códec con voz, efectos de sonido y subtítulos sincronizados (Howler.js).',
        },
        {
          en: 'The deck is generated on the server and kept with the session in Upstash Redis, so the real codes stay on the server until a card is scratched.',
          es: 'La baraja se genera en el servidor y se guarda con la sesión en Upstash Redis, así que los códigos reales no salen del servidor hasta que se rasca la carta.',
        },
      ],
    },
    {
      id: 'role',
      heading: { en: 'My role', es: 'Mi papel' },
      body: {
        en: 'Built alone, from March to April 2026, with Vitest covering the game logic.',
        es: 'Construido por mí solo, entre marzo y abril de 2026, con Vitest cubriendo la lógica del juego.',
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
      title: { en: 'Daily drivers', es: 'Día a día' },
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
      title: { en: 'Also shipped with', es: 'También en producción' },
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
      title: { en: 'Tools', es: 'Herramientas' },
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
