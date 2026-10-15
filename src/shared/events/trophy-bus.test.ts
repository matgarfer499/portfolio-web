import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createTrophyBus, TROPHY_EVENTS, type TrophyEvent } from './trophy-bus';

describe('trophy bus', () => {
  it('delivers an emitted event to every subscriber', () => {
    const bus = createTrophyBus();
    const a = vi.fn();
    const b = vi.fn();
    bus.on(a);
    bus.on(b);
    bus.emit('email-copied');
    expect(a).toHaveBeenCalledWith('email-copied');
    expect(b).toHaveBeenCalledWith('email-copied');
  });

  it('stops delivering after unsubscribe', () => {
    const bus = createTrophyBus();
    const handler = vi.fn();
    const off = bus.on(handler);
    off();
    bus.emit('cv-opened');
    expect(handler).not.toHaveBeenCalled();
  });

  it('buffers events emitted before anyone listens and flushes them to the first subscriber', () => {
    const bus = createTrophyBus();
    bus.emit('konami');
    bus.emit('email-copied');
    const first = vi.fn();
    bus.on(first);
    expect(first.mock.calls).toEqual([['konami'], ['email-copied']]);

    const second = vi.fn();
    bus.on(second);
    expect(second).not.toHaveBeenCalled();
  });

  it('does nothing when created outside a browser', () => {
    const bus = createTrophyBus({ enabled: false });
    const handler = vi.fn();
    bus.emit('konami');
    bus.on(handler);
    bus.emit('konami');
    expect(handler).not.toHaveBeenCalled();
  });

  it('knows exactly the six trophy events', () => {
    expect(TROPHY_EVENTS).toHaveLength(6);
    expect(new Set(TROPHY_EVENTS).size).toBe(6);
    expectTypeOf<'email-copied'>().toExtend<TrophyEvent>();
    expectTypeOf<'unknown'>().not.toExtend<TrophyEvent>();
  });
});
