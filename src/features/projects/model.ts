import type { Locale } from '@/i18n/routing';
import { projects, resolve, type CaseStudy, type Localized, type Maybe } from '@content/index';

const cases: readonly CaseStudy[] = projects.caseStudies;

export function findCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

// Every case page ends on the next one; the last wraps to the first.
export function nextCase(slug: string): CaseStudy {
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i + 1) % cases.length] ?? cases[0]!;
}

// For plain-text slots (titles, metadata, alt): a pending value reads as its note in brackets.
export function caseText(value: Maybe<Localized>, locale: Locale): string {
  const r = resolve(value, locale);
  return r.kind === 'pending' ? `[${r.note}]` : r.text;
}
