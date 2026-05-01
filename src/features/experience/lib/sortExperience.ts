import type { CollectionEntry } from 'astro:content';

type ExperienceEntry = CollectionEntry<'experiences'>;

export function sortExperience(a: ExperienceEntry, b: ExperienceEntry): number {
  const dateCmp = b.data.startDate.localeCompare(a.data.startDate);
  if (dateCmp !== 0) return dateCmp;
  return a.data.order - b.data.order;
}
