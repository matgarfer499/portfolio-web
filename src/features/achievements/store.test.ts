import { beforeEach, describe, expect, it } from 'vitest';
import { selectUnlockedCount, useAchievementsStore } from './store';

describe('achievements store', () => {
  beforeEach(() => {
    useAchievementsStore.setState({ unlockedIds: [], toastQueue: [] });
  });

  it('unlocks an achievement and queues a toast', () => {
    useAchievementsStore.getState().unlock('first-contact');

    const state = useAchievementsStore.getState();
    expect(state.unlockedIds).toEqual(['first-contact']);
    expect(state.toastQueue).toEqual(['first-contact']);
    expect(selectUnlockedCount(state)).toBe(1);
  });

  it('never unlocks the same achievement twice', () => {
    const { unlock } = useAchievementsStore.getState();
    unlock('first-contact');
    unlock('first-contact');

    expect(useAchievementsStore.getState().unlockedIds).toHaveLength(1);
    expect(useAchievementsStore.getState().toastQueue).toHaveLength(1);
  });

  it('dismisses a toast without forgetting the unlock', () => {
    const { unlock, dismissToast } = useAchievementsStore.getState();
    unlock('first-contact');
    dismissToast('first-contact');

    const state = useAchievementsStore.getState();
    expect(state.toastQueue).toEqual([]);
    expect(state.unlockedIds).toEqual(['first-contact']);
  });
});
