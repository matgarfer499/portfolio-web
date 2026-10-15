import { describe, expect, it } from 'vitest';
import { localizedPath } from './paths';

describe('localizedPath', () => {
  it('keeps English paths and anchors unprefixed', () => {
    expect(localizedPath('en', '/projects/chefory')).toBe('/projects/chefory');
    expect(localizedPath('en', '/')).toBe('/');
    expect(localizedPath('en', '/#records')).toBe('/#records');
  });
});
