import { describe, expect, it } from 'vitest';
import { localize, localizeRich } from './index';

describe('localize', () => {
  it('reads a value in the active locale', () => {
    expect(localize({ en: 'Now' }, 'en')).toBe('Now');
  });

  it('joins a rich sentence run by run', () => {
    expect(localizeRich([{ en: 'Tech lead.' }, { en: 'Team of five.' }], 'en')).toBe(
      'Tech lead. Team of five.',
    );
  });
});
