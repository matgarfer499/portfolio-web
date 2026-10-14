import { pending, type ImageAsset, type Localized, type Maybe } from './types';

export interface CaseStudy {
  readonly slug: string;
  readonly name: Maybe<Localized>;
  readonly tagline: Maybe<Localized>;
  readonly summary: Maybe<Localized>;
  readonly stack: readonly string[];
  readonly url?: string;
  readonly shots?: { readonly desktop: ImageAsset; readonly phone: ImageAsset };
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
      body: pending({
        en: 'Results you can share: kitchens, users, numbers',
        es: 'Resultados que puedas compartir: cocinas, usuarios, cifras',
      }),
    },
  ],
} as const satisfies CaseStudy;

const techLead = {
  slug: 'tech-lead',
  name: pending({
    en: 'Product you led as Tech Lead',
    es: 'Producto que lideraste como Tech Lead',
  }),
  tagline: pending({
    en: 'One-line description of the product',
    es: 'Descripción del producto en una línea',
  }),
  summary: pending({
    en: 'Problem, your role, the team, what shipped and the result',
    es: 'Problema, tu papel, el equipo, qué se lanzó y el resultado',
  }),
  stack: [],
  sections: [
    {
      id: 'problem',
      heading: { en: 'The problem', es: 'El problema' },
      body: pending({
        en: 'What was broken or missing, and for whom',
        es: 'Qué fallaba o faltaba, y para quién',
      }),
    },
    {
      id: 'role',
      heading: { en: 'My role and the team', es: 'Mi papel y el equipo' },
      body: pending({
        en: 'Team size, what you owned, how you led',
        es: 'Tamaño del equipo, de qué te encargabas, cómo lideraste',
      }),
    },
    {
      id: 'shipped',
      heading: { en: 'What shipped', es: 'Qué se lanzó' },
      body: pending({
        en: 'Key decisions and what went live',
        es: 'Decisiones clave y qué salió a producción',
      }),
    },
    {
      id: 'results',
      heading: { en: 'Results', es: 'Resultados' },
      body: pending({ en: 'The measurable outcome', es: 'El resultado medible' }),
    },
  ],
} as const satisfies CaseStudy;

// Order matters: the first is featured on the home, each page links to the next one.
export const projects = {
  caseStudies: [chefory, techLead],
  stack: [
    {
      id: 'backend',
      title: { en: 'Backend', es: 'Backend' },
      items: ['Python', 'Django', 'Flask', 'PostgreSQL', 'MongoDB', 'Celery'],
    },
    {
      id: 'frontend',
      title: { en: 'Frontend', es: 'Frontend' },
      items: ['SvelteKit', 'Next.js', 'TypeScript', 'JavaScript', 'TailwindCSS'],
    },
    {
      id: 'ship',
      title: { en: 'Ship it', es: 'A producción' },
      items: ['Docker', 'Kubernetes', 'Git', 'Jira', 'Figma'],
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
