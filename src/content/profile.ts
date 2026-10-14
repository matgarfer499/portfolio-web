import type { Profile, Project } from './types';

// The single source of truth for portfolio content (rewritten in P2).
// Strings that vary by language carry both locales; pick one with `localize()`.
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
