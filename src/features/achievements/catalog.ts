/** Static definition of an unlockable achievement. */
export interface AchievementDef {
  readonly id: string;
  /** Key under the `Achievements` i18n namespace, e.g. `firstContact` → `firstContact.title`. */
  readonly messageKey: string;
  /** Placeholder glyph until the art phase provides real icons. */
  readonly icon: string;
}

/**
 * The achievement catalog. `as const satisfies` keeps every `id` and `messageKey` as a
 * string literal (so i18n keys stay type-checked) while still validating the shape.
 */
export const ACHIEVEMENTS = [
  { id: 'first-contact', messageKey: 'firstContact', icon: '🎯' },
] as const satisfies readonly AchievementDef[];

export type Achievement = (typeof ACHIEVEMENTS)[number];
export type AchievementId = Achievement['id'];

export const ACHIEVEMENT_TOTAL = ACHIEVEMENTS.length;

export function getAchievement(id: AchievementId): Achievement {
  const found = ACHIEVEMENTS.find((achievement) => achievement.id === id);
  if (!found) {
    throw new Error(`Unknown achievement id: ${id}`);
  }
  return found;
}
