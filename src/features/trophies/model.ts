import { TROPHY_EVENTS, type TrophyEvent } from '@shared/events/trophy-bus';

export type TrophyKey =
  | 'finishLine'
  | 'recordsSeen'
  | 'caseStudyOpened'
  | 'languageSwitched'
  | 'themeSwitched'
  | 'emailCopied'
  | 'cvOpened'
  | 'konami';

const KEYS = {
  'finish-line': 'finishLine',
  'records-seen': 'recordsSeen',
  'case-study-opened': 'caseStudyOpened',
  'language-switched': 'languageSwitched',
  'theme-switched': 'themeSwitched',
  'email-copied': 'emailCopied',
  'cv-opened': 'cvOpened',
  konami: 'konami',
} as const satisfies Record<TrophyEvent, TrophyKey>;

// The shelf order is the bus order; `key` names the trophy in the Trophies.items messages.
export const TROPHIES = TROPHY_EVENTS.map((id) => ({ id, key: KEYS[id] }));

export function trophyKey(id: TrophyEvent): TrophyKey {
  return KEYS[id];
}

// Stored trophies come from localStorage: anything unexpected is dropped, never trusted.
export function parseUnlocked(raw: string | null): TrophyEvent[] {
  let stored: unknown;
  try {
    stored = JSON.parse(raw ?? '[]');
  } catch {
    return [];
  }
  if (!Array.isArray(stored)) return [];
  const owned = new Set<unknown>(stored);
  return TROPHY_EVENTS.filter((id) => owned.has(id));
}

export const KONAMI = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

// Holding Shift for the B and A must not break the code.
const MODIFIERS = new Set(['shift', 'control', 'alt', 'meta', 'capslock']);

// How far into the code the visitor is after `key`; KONAMI.length means done.
export function konamiStep(progress: number, key: string): number {
  const k = key.toLowerCase();
  if (MODIFIERS.has(k)) return progress;
  const at = progress >= KONAMI.length ? 0 : progress;
  if (k === KONAMI[at]) return at + 1;
  // ↑↑↑: a mismatch can still be the tail of a new attempt (only ↑↑ overlaps the code's start).
  if (k === KONAMI[0]) return at >= 2 && KONAMI[at - 1] === KONAMI[0] ? at : 1;
  return 0;
}
