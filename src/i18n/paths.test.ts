import { describe, expect, it } from 'vitest';
import { localizedPath, switchLocalePath } from './paths';

describe('localizedPath', () => {
  it('keeps English unprefixed and prefixes Spanish', () => {
    expect(localizedPath('en', '/projects/chefory')).toBe('/projects/chefory');
    expect(localizedPath('es', '/projects/chefory')).toBe('/es/projects/chefory');
  });

  it('handles the home and in-page anchors', () => {
    expect(localizedPath('es', '/')).toBe('/es');
    expect(localizedPath('es', '/#records')).toBe('/es#records');
    expect(localizedPath('en', '/#records')).toBe('/#records');
  });
});

describe('switchLocalePath', () => {
  it('maps the current pathname to the other locale', () => {
    expect(switchLocalePath('/projects/chefory', 'es')).toBe('/es/projects/chefory');
    expect(switchLocalePath('/es/projects/chefory', 'en')).toBe('/projects/chefory');
    expect(switchLocalePath('/es', 'en')).toBe('/');
    expect(switchLocalePath('/', 'es')).toBe('/es');
  });
});
