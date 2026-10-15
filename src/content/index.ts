import type { Locale } from '@/i18n/routing';
import type { Localized } from './types';

export { about } from './about';
export { contact } from './contact';
export { experience } from './experience';
export { hero } from './hero';
export { profile } from './profile';
export { projects } from './projects';
export { records } from './records';
export { isPending, pending, resolve, resolveRich } from './types';
export type { GalleryPhoto } from './about';
export type { LogEntry } from './experience';
export type { CaseStudy } from './projects';
export type { HighlightRecord, RecordItem } from './records';
export type * from './types';

/** Resolve a bilingual content value to a single string for the active locale. */
export function localize(value: Localized, locale: Locale): string {
  return value[locale];
}
