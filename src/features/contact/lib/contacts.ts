type ContactKind = 'email' | 'linkedin' | 'github';

type ContactEntry = {
  readonly kind: ContactKind;
  readonly label: string;
  readonly href: string;
  readonly display: string;
  readonly ariaLabel: string;
  readonly external: boolean;
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
] as const;

export type { ContactEntry, ContactKind };
