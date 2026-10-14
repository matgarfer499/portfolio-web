import type { LinkItem, Localized } from './types';

export const profile = {
  name: 'Matías García',
  fullName: 'Matías José García Fernández',
  role: { en: 'Tech Lead · Full Stack Developer', es: 'Tech Lead · Desarrollador Full Stack' },
  location: { en: 'Málaga, Spain', es: 'Málaga, España' },
  city: 'Málaga',
  timeZone: 'Europe/Madrid',
  email: 'mjgarciadev14@gmail.com',
  cv: '/matias-garcia-cv.pdf',
  // The month the working career starts (Bettergy); "2+ yrs" is derived from it, never typed.
  careerSince: '2024-01',
  availability: {
    status: 'open',
    label: { en: 'Open to new projects', es: 'Disponible para nuevos proyectos' },
  },
  languages: [
    { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
    {
      name: { en: 'English', es: 'Inglés' },
      level: { en: 'B2 · Cambridge First', es: 'B2 · Cambridge First' },
    },
  ],
  socials: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mgarfer/' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/matgarfer499' },
  ],
} as const satisfies {
  readonly name: string;
  readonly fullName: string;
  readonly role: Localized;
  readonly location: Localized;
  readonly city: string;
  readonly timeZone: string;
  readonly email: string;
  readonly cv: string;
  readonly careerSince: string;
  readonly availability: { readonly status: 'open' | 'busy'; readonly label: Localized };
  readonly languages: readonly { readonly name: Localized; readonly level: Localized }[];
  readonly socials: readonly LinkItem[];
};
