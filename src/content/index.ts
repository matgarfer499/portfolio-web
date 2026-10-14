import type { Locale } from '@/i18n/routing';
import type { Localized } from './types';

export { profile, projects } from './profile';
export type { Profile, Project, Localized, SocialLinks } from './types';

/** Resolve a bilingual content value to a single string for the active locale. */
export function localize(value: Localized, locale: Locale): string {
  return value[locale];
}
