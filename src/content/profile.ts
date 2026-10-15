import type { LinkItem, Localized } from './types';

export const profile = {
  name: 'Matías García',
  fullName: 'Matías José García Fernández',
  role: { en: 'Full Stack Engineer · Tech Lead' },
  location: { en: 'Málaga, Spain' },
  city: 'Málaga',
  timeZone: 'Europe/Madrid',
  email: 'mjgarciadev14@gmail.com',
  // The owner's own PDF (the /cv page is the always-current web version).
  cv: '/matias-garcia-cv.pdf',
  // The month the working career starts (the Uniklinik internship); "3+ yrs" is derived from it.
  careerSince: '2023-03',
  availability: {
    status: 'open',
    label: {
      en: 'Available now · full-time · open to relocating',
    },
  },
  languages: [
    { name: { en: 'Spanish' }, level: { en: 'Native' } },
    {
      name: { en: 'English' },
      level: {
        en: 'Professional working proficiency · B2 Cambridge First',
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
