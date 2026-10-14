import { createStore } from 'zustand/vanilla';
import type { TrophyEvent } from '@shared/events/trophy-bus';
import { parseUnlocked } from './model';

export type KeyValueStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

interface TrophyState {
  unlocked: TrophyEvent[];
  sound: boolean;
  latest: TrophyEvent | null;
  hydrate: () => void;
  unlock: (id: TrophyEvent) => void;
  dismiss: () => void;
  toggleSound: () => void;
  reset: () => void;
}

const TROPHIES_KEY = 'pr-trophies';
const SOUND_KEY = 'pr-trophy-sound';

// Storage can be missing or throw (private mode, blocked site data): trophies then live in memory.
function attempt<T>(run: () => T, fallback: T): T {
  try {
    return run();
  } catch {
    return fallback;
  }
}

// Starts empty: the server renders 0/8 and the first client render must match; hydrate() runs in
// an effect. unlock() persists synchronously because the CV link leaves the page right after.
export function createTrophyStore(storage: () => KeyValueStorage) {
  return createStore<TrophyState>()((set, get) => ({
    unlocked: [],
    sound: false,
    latest: null,
    hydrate: () =>
      set({
        unlocked: attempt(() => parseUnlocked(storage().getItem(TROPHIES_KEY)), []),
        sound: attempt(() => storage().getItem(SOUND_KEY) === '1', false),
      }),
    unlock: (id) => {
      if (get().unlocked.includes(id)) return;
      const unlocked = [...get().unlocked, id];
      attempt(() => storage().setItem(TROPHIES_KEY, JSON.stringify(unlocked)), undefined);
      set({ unlocked, latest: id });
    },
    dismiss: () => set({ latest: null }),
    toggleSound: () => {
      const sound = !get().sound;
      attempt(() => storage().setItem(SOUND_KEY, sound ? '1' : '0'), undefined);
      set({ sound });
    },
    reset: () => {
      attempt(() => storage().removeItem(TROPHIES_KEY), undefined);
      set({ unlocked: [], latest: null });
    },
  }));
}

export const trophyStore = createTrophyStore(() => window.localStorage);
