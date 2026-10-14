import { describe, expect, it } from 'vitest';
import { createTrophyStore, type KeyValueStorage } from './store';

const memory = (
  seed: Record<string, string> = {},
): KeyValueStorage & { data: Record<string, string> } => {
  const data = { ...seed };
  return {
    data,
    getItem: (key) => data[key] ?? null,
    setItem: (key, value) => {
      data[key] = value;
    },
    removeItem: (key) => {
      delete data[key];
    },
  };
};

const broken: KeyValueStorage = {
  getItem: () => {
    throw new Error('denied');
  },
  setItem: () => {
    throw new Error('quota');
  },
  removeItem: () => {
    throw new Error('denied');
  },
};

describe('trophy store', () => {
  it('starts empty and silent until hydrated (server and first client render agree)', () => {
    const store = createTrophyStore(() =>
      memory({ 'pr-trophies': '["konami"]', 'pr-trophy-sound': '1' }),
    );
    expect(store.getState()).toMatchObject({ unlocked: [], sound: false, latest: null });
    store.getState().hydrate();
    expect(store.getState()).toMatchObject({ unlocked: ['konami'], sound: true });
  });

  it('unlocks a trophy once, persists it at once and announces it', () => {
    const storage = memory();
    const store = createTrophyStore(() => storage);
    store.getState().hydrate();
    store.getState().unlock('email-copied');
    store.getState().unlock('email-copied');
    expect(store.getState().unlocked).toEqual(['email-copied']);
    expect(store.getState().latest).toBe('email-copied');
    expect(storage.data['pr-trophies']).toBe('["email-copied"]');
  });

  it('does not announce a trophy already owned', () => {
    const store = createTrophyStore(() => memory({ 'pr-trophies': '["cv-opened"]' }));
    store.getState().hydrate();
    store.getState().unlock('cv-opened');
    expect(store.getState().latest).toBeNull();
  });

  it('remembers the sound choice and resets trophies', () => {
    const storage = memory();
    const store = createTrophyStore(() => storage);
    store.getState().hydrate();
    store.getState().toggleSound();
    expect(storage.data['pr-trophy-sound']).toBe('1');
    store.getState().unlock('konami');
    store.getState().reset();
    expect(store.getState()).toMatchObject({ unlocked: [], latest: null, sound: true });
    expect(storage.data['pr-trophies']).toBeUndefined();
  });

  it('keeps working in memory when storage throws', () => {
    const store = createTrophyStore(() => broken);
    expect(() => {
      store.getState().hydrate();
      store.getState().unlock('konami');
      store.getState().toggleSound();
      store.getState().reset();
    }).not.toThrow();
  });
});
