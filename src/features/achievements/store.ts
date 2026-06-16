import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import type { AchievementId } from './catalog';

// Server/Node has no localStorage; fall back to a no-op so persist stays inert there.
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

interface AchievementsState {
  /** Every achievement the visitor has ever unlocked (persisted). */
  readonly unlockedIds: AchievementId[];
  /** Achievements currently being shown as toasts (transient, never persisted). */
  readonly toastQueue: AchievementId[];
  unlock: (id: AchievementId) => void;
  dismissToast: (id: AchievementId) => void;
  reset: () => void;
}

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      unlockedIds: [],
      toastQueue: [],
      unlock: (id) => {
        if (get().unlockedIds.includes(id)) return;
        set((state) => ({
          unlockedIds: [...state.unlockedIds, id],
          toastQueue: [...state.toastQueue, id],
        }));
      },
      dismissToast: (id) =>
        set((state) => ({ toastQueue: state.toastQueue.filter((queued) => queued !== id) })),
      reset: () => set({ unlockedIds: [], toastQueue: [] }),
    }),
    {
      name: 'mg-achievements',
      version: 1,
      // Only the permanent unlocks survive a reload; toasts are session-only.
      partialize: (state) => ({ unlockedIds: state.unlockedIds }),
      storage: createJSONStorage(() =>
        typeof window === 'undefined' ? noopStorage : window.localStorage,
      ),
    },
  ),
);

export const selectUnlockedCount = (state: AchievementsState): number => state.unlockedIds.length;
