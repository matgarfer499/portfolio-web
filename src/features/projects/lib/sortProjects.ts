import type { CollectionEntry } from 'astro:content';

type ProjectEntry = CollectionEntry<'projects'>;

export function sortProjects(a: ProjectEntry, b: ProjectEntry): number {
  return Number(b.data.featured) - Number(a.data.featured) || a.data.order - b.data.order;
}
