// The one channel between features: anything may emit, only features/trophies subscribes.
export const TROPHY_EVENTS = [
  'finish-line',
  'records-seen',
  'case-study-opened',
  'language-switched',
  'theme-switched',
  'email-copied',
  'cv-opened',
  'konami',
] as const;

export type TrophyEvent = (typeof TROPHY_EVENTS)[number];
type Handler = (event: TrophyEvent) => void;

export interface TrophyBus {
  emit(event: TrophyEvent): void;
  on(handler: Handler): () => void;
}

// The trophy shelf loads on demand, so events fired before it subscribes are kept and replayed once.
export function createTrophyBus({ enabled = true }: { enabled?: boolean } = {}): TrophyBus {
  const handlers = new Set<Handler>();
  let pending: TrophyEvent[] = [];

  return {
    emit(event) {
      if (!enabled) return;
      if (handlers.size === 0) pending.push(event);
      for (const handler of handlers) handler(event);
    },
    on(handler) {
      if (!enabled) return () => {};
      handlers.add(handler);
      const replay = pending;
      pending = [];
      for (const event of replay) handler(event);
      return () => handlers.delete(handler);
    },
  };
}

const bus = createTrophyBus({ enabled: typeof window !== 'undefined' });
export const emitTrophy = bus.emit;
export const onTrophy = bus.on;
