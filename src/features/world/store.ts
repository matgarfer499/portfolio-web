import { create } from 'zustand';

interface WorldState {
  /** The zone whose trigger the avatar is currently inside, or `null`. */
  readonly activeZoneId: string | null;
  enterZone: (id: string) => void;
  leaveZone: (id: string) => void;
  reset: () => void;
}

export const useWorldStore = create<WorldState>((set, get) => ({
  activeZoneId: null,
  enterZone: (id) => set({ activeZoneId: id }),
  leaveZone: (id) => {
    if (get().activeZoneId === id) set({ activeZoneId: null });
  },
  reset: () => set({ activeZoneId: null }),
}));
