import { describe, expect, it } from 'vitest';
import { routing } from '@/i18n/routing';
import { localize, profile, projects } from './index';

describe('content source', () => {
  it('provides profile copy in every supported locale', () => {
    for (const locale of routing.locales) {
      expect(localize(profile.role, locale)).toBeTruthy();
      expect(localize(profile.hook, locale)).toBeTruthy();
      expect(localize(profile.summary, locale)).toBeTruthy();
    }
  });

  it('describes at least one project with a stack', () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]?.stack.length).toBeGreaterThan(0);
  });
});
