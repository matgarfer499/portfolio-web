import type { Locale } from '@/i18n/routing';

/** A string provided in every supported locale. The content source is bilingual by construction. */
export type Localized = Record<Locale, string>;

export interface SocialLinks {
  readonly github: string;
  readonly linkedin: string;
}

export interface Profile {
  readonly name: string;
  readonly role: Localized;
  readonly hook: Localized;
  readonly summary: Localized;
  readonly location: Localized;
  readonly email: string;
  readonly cvUrl: string;
  readonly socials: SocialLinks;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly tagline: Localized;
  readonly description: Localized;
  readonly stack: readonly string[];
  readonly url?: string;
  readonly repo?: string;
}
