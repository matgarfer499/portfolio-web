export const TROPHY_STORAGE_KEY = 'trophies-v1';

export function getUnlockedTrophies(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(TROPHY_STORAGE_KEY);
    const parsed: unknown = raw !== null ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? (parsed as string[]) : []);
  } catch {
    return new Set();
  }
}

export function persistTrophy(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getUnlockedTrophies();
    current.add(id);
    localStorage.setItem(TROPHY_STORAGE_KEY, JSON.stringify([...current]));
  } catch {
    // ignore quota/private-mode errors
  }
}
