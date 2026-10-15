import { cva } from 'class-variance-authority';

export const trophyShelfVariants = {
  // A modal drawer from the right; @starting-style slides it in (instant with reduced motion).
  dialog: cva(
    'fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(26rem,100vw)] max-w-none flex-col gap-5 overflow-y-auto overscroll-contain border-l-[3px] border-ink bg-paper p-6 text-ink transition-[translate] duration-(--dur-base) ease-pr-out backdrop:bg-night/60 open:flex starting:open:translate-x-full',
  ),
  head: cva('flex items-center justify-between gap-4'),
  title: cva('m-0 font-display text-[2.125rem] leading-none uppercase'),
  list: cva('m-0 grid list-none gap-3 p-0'),
  item: cva('flex items-start gap-3 border-2 border-ink p-3', {
    variants: {
      owned: { true: 'bg-volt text-on-volt surface-volt', false: 'border-dashed text-steel' },
    },
  }),
  name: cva('block font-display text-[1.25rem] leading-tight uppercase'),
  meta: cva('block text-[0.875rem]'),
  tools: cva('mt-auto flex flex-wrap gap-2'),
};
