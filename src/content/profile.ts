import type { LinkItem, Localized } from './types';

export const profile = {
  name: 'Matías García',
  fullName: 'Matías José García Fernández',
  role: { en: 'Full Stack Engineer · Tech Lead', es: 'Ingeniero Full Stack · Tech Lead' },
  location: { en: 'Málaga, Spain', es: 'Málaga, España' },
  city: 'Málaga',
  timeZone: 'Europe/Madrid',
  email: 'mjgarciadev14@gmail.com',
  cv: '/matias-garcia-cv.pdf',
  // The month the working career starts (the Uniklinik internship); "3+ yrs" is derived from it.
  careerSince: '2023-03',
  availability: {
    status: 'open',
    label: {
      en: 'Available now · full-time · open to relocating',
      es: 'Disponible ya · jornada completa · abierto a mudarme',
    },
  },
  languages: [
    { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
    {
      name: { en: 'English', es: 'Inglés' },
      level: {
        en: 'Professional working proficiency · B2 Cambridge First',
        es: 'Nivel profesional · B2 Cambridge First',
      },
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
