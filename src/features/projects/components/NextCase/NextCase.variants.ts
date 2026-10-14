import { cva } from 'class-variance-authority';

export const nextCaseVariants = {
  root: cva(
    'mt-[1.125rem] flex flex-wrap items-center justify-between gap-6 border-[3px] border-dashed border-ink px-6 py-7 text-ink no-underline transition-transform duration-(--dur-fast) ease-pr-out motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1 stack:px-8',
  ),
  text: cva('flex flex-col items-start gap-2'),
  name: cva('font-display text-[2.125rem] leading-none text-balance uppercase'),
  summary: cva('m-0 text-steel'),
  cue: cva('flex items-center gap-2'),
};
