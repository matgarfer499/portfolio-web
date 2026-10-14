import type { Transition } from 'motion/react';

// DESIGN.md § Motion. Seconds for Motion; globals.css mirrors them as --dur-* / --ease-* (tested).
export const DURATION = { fast: 0.15, base: 0.3, reveal: 0.6, count: 1.4, toast: 0.55 } as const;

export const EASE = {
  'out-soft': [0.2, 0.7, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
  'out-cubic': [0.33, 1, 0.68, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

export const reveal: Transition = { duration: DURATION.reveal, ease: EASE['out-soft'] };
export const toast: Transition = { duration: DURATION.toast, ease: EASE.spring };
export const STAGGER_S = 0.06;

// The artifact's count-up curve: 1 - (1 - t)^3.
export const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;
