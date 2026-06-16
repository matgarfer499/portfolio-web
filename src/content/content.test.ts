import { describe, expect, it } from 'vitest';
import { routing } from '@/i18n/routing';
import { localize, profile, projects, zones } from './index';

describe('content source', () => {
  it('provides profile copy in every supported locale', () => {
    for (const locale of routing.locales) {
      expect(localize(profile.role, locale)).toBeTruthy();
      expect(localize(profile.hook, locale)).toBeTruthy();
      expect(localize(profile.summary, locale)).toBeTruthy();
    }
  });

  it('has at least one zone, bilingual', () => {
    expect(zones.length).toBeGreaterThan(0);
    for (const zone of zones) {
      expect(localize(zone.heading, 'en')).toBeTruthy();
      expect(localize(zone.heading, 'es')).toBeTruthy();
    }
  });

  it('describes at least one project with a stack', () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]?.stack.length).toBeGreaterThan(0);
  });
});
