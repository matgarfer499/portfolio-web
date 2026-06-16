import type { Locale } from '@/i18n/routing';
import type { Localized } from './types';

export { profile, zones, projects } from './profile';
export type { Profile, Project, Zone, Localized, SocialLinks, Accent } from './types';

/** Resolve a bilingual content value to a single string for the active locale. */
export function localize(value: Localized, locale: Locale): string {
  return value[locale];
}
