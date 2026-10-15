import { cva } from 'class-variance-authority';

export const trophiesVariants = {
  counter: cva(
    'inline-flex min-h-11 items-center gap-1.5 rounded-[2px] border-2 border-ink bg-paper px-2.5 text-[0.875rem] font-bold text-ink tabular-nums',
  ),
  // Re-keyed on every unlock so the pop replays; motion-safe only.
  count: cva('inline-block min-w-[2.5ch] text-center', {
    variants: {
      pop: { true: 'motion-safe:animate-[counter-pop_300ms_var(--ease-spring)]', false: '' },
    },
  }),
  // The artifact's toast: always mounted (one live region), risen into view by data-open.
  toast: cva(
    'fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-50 flex max-w-[min(23.75rem,calc(100vw-2rem))] translate-y-[160%] -rotate-3 items-center gap-4 border-[3px] border-ink bg-volt px-5 py-4 text-left text-on-volt shadow-[0.5rem_0.5rem_0_var(--ink)] transition-[translate] duration-(--dur-toast) ease-pr-spring surface-volt data-open:translate-y-0 stack:right-6 stack:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] print:hidden',
  ),
  toastLabel: cva('block text-[0.75rem] font-extrabold tracking-[0.12em] uppercase'),
  toastTitle: cva('block font-display text-[1.375rem] leading-none uppercase'),
};
