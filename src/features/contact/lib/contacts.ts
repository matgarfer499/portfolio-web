type ContactKind = 'email' | 'linkedin' | 'github' | 'cv';

type ContactEntry = {
  readonly kind: ContactKind;
  readonly label: string;
  readonly href: string;
  readonly display: string;
  readonly ariaLabel: string;
  readonly external: boolean;
  readonly download?: string;
};

export const CONTACTS: readonly ContactEntry[] = [
  {
    kind: 'email',
    label: 'Email',
    href: 'mailto:mjgarciadev14@gmail.com',
    display: 'mjgarciadev14@gmail.com',
    ariaLabel: 'Email Matías García at mjgarciadev14@gmail.com',
    external: false,
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mgarfer/',
    display: 'linkedin.com/in/mgarfer',
    ariaLabel: 'Matías García on LinkedIn (opens in new tab)',
    external: true,
  },
  {
    kind: 'github',
    label: 'GitHub',
    href: 'https://github.com/matgarfer499',
    display: 'github.com/matgarfer499',
    ariaLabel: 'Matías García on GitHub (opens in new tab)',
    external: true,
  },
  {
    kind: 'cv',
    label: 'CV',
    href: '/matias-garcia-cv.pdf',
    display: 'matias-garcia-cv.pdf',
    ariaLabel: 'Download CV (PDF)',
    external: false,
    download: 'Matias-Garcia-CV.pdf',
  },
] as const;

export type { ContactEntry, ContactKind };
