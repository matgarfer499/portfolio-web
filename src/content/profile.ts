import type { Profile, Project, Zone } from './types';

/**
 * The single source of truth for portfolio content.
 * Both layers — the 3D game and the fast/SEO version — render from this exact data.
 * Strings that vary by language carry both locales; pick one with `localize()`.
 *
 * NOTE: placeholder content for the vertical slice. Real copy lands with the art phase.
 */
export const profile: Profile = {
  name: 'Matías García',
  role: {
    en: 'Software engineer',
    es: 'Ingeniero de software',
  },
  hook: {
    en: 'I put AI to work inside developer workflows — shipping in days what used to take months.',
    es: 'Pongo la IA a trabajar dentro del flujo del equipo — entrego en días lo que antes tomaba meses.',
  },
  summary: {
    en: 'Full-stack engineer (Next.js · Django · Python · TypeScript · PostgreSQL) who automates the toil so teams spend their time building.',
    es: 'Ingeniero full-stack (Next.js · Django · Python · TypeScript · PostgreSQL) que automatiza lo tedioso para que el equipo dedique su tiempo a construir.',
  },
  location: {
    en: 'Remote · EU',
    es: 'Remoto · UE',
  },
  email: 'mjgarciadev14@gmail.com',
  cvUrl: '/cv.pdf',
  socials: {
    github: 'https://github.com/matgarfer499',
    linkedin: 'https://www.linkedin.com/in/mgarfer',
  },
};

/**
 * The five sections of the portfolio, strung left→right along the Paseo Marítimo (the world
 * runs along Z, so positions step from the Intro end toward the far quay). Each zone has a
 * themed landmark in the world layer. NOTE: placeholder copy for the art phase.
 */
export const zones: readonly Zone[] = [
  {
    id: 'intro',
    name: { en: 'Intro', es: 'Intro' },
    heading: {
      en: 'Press start on a career',
      es: 'Pulsa start a una carrera',
    },
    body: {
      en: 'Matías builds software that puts AI to work inside real team workflows. This whole seafront is his portfolio — walk the paseo; every landmark is a section.',
      es: 'Matías construye software que pone la IA a trabajar dentro del flujo real de los equipos. Todo este paseo marítimo es su portfolio — recórrelo; cada hito es una sección.',
    },
    position: [2, 0, 30],
    accent: 'azure',
  },
  {
    id: 'projects',
    name: { en: 'Projects', es: 'Proyectos' },
    heading: {
      en: 'Things I have shipped',
      es: 'Cosas que he lanzado',
    },
    body: {
      en: 'Products taken from idea to production — like Chefory, a recipe & meal manager. Activate the shrine to see what got built and the stack behind it.',
      es: 'Productos llevados de la idea a producción — como Chefory, un gestor de recetas y comidas. Activa el santuario para ver qué se construyó y el stack detrás.',
    },
    position: [2, 0, 15],
    accent: 'azure',
  },
  {
    id: 'experience',
    name: { en: 'Experience', es: 'Experiencia' },
    heading: {
      en: 'Where I have worked',
      es: 'Dónde he trabajado',
    },
    body: {
      en: 'Full-stack engineering across Next.js, Django, Python and PostgreSQL — automating the toil so teams ship faster. Grab the artifact to dig into the roles.',
      es: 'Ingeniería full-stack con Next.js, Django, Python y PostgreSQL — automatizando lo tedioso para que los equipos entreguen más rápido. Coge el artefacto para ver los roles.',
    },
    position: [2, 0, 0],
    accent: 'azure',
  },
  {
    id: 'about',
    name: { en: 'About', es: 'Sobre mí' },
    heading: {
      en: 'The person behind the code',
      es: 'La persona tras el código',
    },
    body: {
      en: 'An engineer who likes shipping, anime and a good RPG. Friki by default, pragmatic by training. Step onto the terrace for the longer story.',
      es: 'Un ingeniero al que le gusta entregar, el anime y un buen RPG. Friki de serie, pragmático por oficio. Entra en la terraza para la historia larga.',
    },
    position: [2, 0, -15],
    accent: 'azure',
  },
  {
    id: 'contact',
    name: { en: 'Contact', es: 'Contacto' },
    heading: {
      en: 'Say hello',
      es: 'Saluda',
    },
    body: {
      en: 'Open to roles and freelance work. Drop a note in the mailbox at the end of the quay — or reach out directly and build something together.',
      es: 'Abierto a empleo y proyectos freelance. Deja una nota en el buzón al final del muelle — o escríbeme directamente y construyamos algo juntos.',
    },
    position: [2, 0, -30],
    accent: 'flame',
  },
];

export const projects: readonly Project[] = [
  {
    id: 'chefory',
    name: 'Chefory',
    tagline: {
      en: 'A recipe & meal manager',
      es: 'Un gestor de recetas y comidas',
    },
    description: {
      en: 'My first shipped product: plan meals, organize recipes, and keep a kitchen running without the spreadsheet chaos.',
      es: 'Mi primer producto en producción: planifica comidas, organiza recetas y mantén la cocina en marcha sin el caos de las hojas de cálculo.',
    },
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
  },
];
