import { describe, expect, it } from 'vitest';
import { formatClock, isFinishLine, msToNextMinute, SECTIONS } from './model';

describe('sections', () => {
  it('follow the page order of the home', () => {
    expect(SECTIONS).toEqual(['records', 'log', 'about', 'projects', 'contact']);
  });
});

describe('isFinishLine', () => {
  const page = { scrollY: 0, scrollHeight: 4000, innerHeight: 900 };

  it('needs the footer fully in view', () => {
    expect(isFinishLine({ ...page, scrollY: 3100, fullyVisible: false })).toBe(false);
    expect(isFinishLine({ ...page, scrollY: 3100, fullyVisible: true })).toBe(true);
  });

  it('needs the visitor to have scrolled, unless the page fits the screen (a 4K TV)', () => {
    expect(isFinishLine({ ...page, fullyVisible: true })).toBe(false);
    expect(isFinishLine({ ...page, scrollHeight: 900, fullyVisible: true })).toBe(true);
  });
});

describe('clock', () => {
  const instant = new Date('2026-10-14T16:05:30Z');

  it('shows Málaga time (Europe/Madrid, CEST in October) in 24 h for both locales', () => {
    expect(formatClock(instant, 'en')).toBe('18:05');
    expect(formatClock(instant, 'es')).toBe('18:05');
  });

  it('switches with daylight saving time', () => {
    expect(formatClock(new Date('2026-12-14T16:05:30Z'), 'en')).toBe('17:05');
  });

  it('waits until the next minute boundary', () => {
    expect(msToNextMinute(instant)).toBe(30_000);
  });
});
