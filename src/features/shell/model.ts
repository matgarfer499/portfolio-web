import type { Locale } from '@/i18n/routing';

export const SECTIONS = ['records', 'log', 'about', 'projects', 'contact'] as const;
export type SectionId = (typeof SECTIONS)[number];

interface FinishLineInput {
  readonly fullyVisible: boolean;
  readonly scrollY: number;
  readonly scrollHeight: number;
  readonly innerHeight: number;
}

// "Reached the end": the footer is fully in view after scrolling, or the page fits the screen.
export function isFinishLine({
  fullyVisible,
  scrollY,
  scrollHeight,
  innerHeight,
}: FinishLineInput) {
  return fullyVisible && (scrollY > 0 || scrollHeight <= innerHeight);
}

const CLOCK_LOCALE: Record<Locale, string> = { en: 'en-GB', es: 'es-ES' };

export function formatClock(now: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(CLOCK_LOCALE[locale], {
    timeZone: 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(now);
}

export function msToNextMinute(now: Date): number {
  return 60_000 - (now.getTime() % 60_000);
}
