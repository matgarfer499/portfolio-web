import type { Locale } from '@/i18n/routing';
import { localize, projects, type CaseStudy } from '@content/index';

const cases: readonly CaseStudy[] = projects.caseStudies;

export function findCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

// Every case page ends on the next one; the last wraps to the first.
export function nextCase(slug: string): CaseStudy {
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i + 1) % cases.length]!;
}

export function caseSlugs(): string[] {
  return cases.map((c) => c.slug);
}

// <title> and description of a case page.
export function caseMeta(
  study: CaseStudy,
  locale: Locale,
  siteName: string,
): { title: string; description: string } {
  return {
    title: `${localize(study.name, locale)} — ${siteName}`,
    description: localize(study.summary, locale),
  };
}

// The home element that holds a case (featured card or list row): "back" lands right on it.
export function caseAnchor(slug: string): string {
  return `project-${slug}`;
}

// Shared-element names: the home card and the case page must use the same one to morph.
export function caseTransition(part: 'title', slug: string): string {
  return `case-${part}-${slug}`;
}

// Text for a case's share image.
export function caseOg(study: CaseStudy, locale: Locale): { title: string; kicker: string } {
  return { title: localize(study.name, locale), kicker: localize(study.tagline, locale) };
}
