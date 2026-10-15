import { cva } from 'class-variance-authority';

export const caseListVariants = {
  root: cva('mt-[1.125rem] border-[3px] border-ink'),
  heading: cva('m-0 border-b-[3px] border-ink px-6 py-4 stack:px-8'),
  list: cva('m-0 list-none p-0'),
  item: cva('scroll-mt-20 border-ink not-last:border-b-2'),
  link: cva(
    'group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-5 gap-y-2 px-6 py-6 text-ink no-underline transition-colors duration-(--dur-fast) ease-pr-out hover:bg-volt hover:surface-volt focus-visible:bg-volt focus-visible:surface-volt stack:items-center stack:px-8',
  ),
  index: cva(
    'font-display text-[1.75rem] leading-none text-steel tabular-nums group-hover:text-ink',
  ),
  text: cva('flex min-w-0 flex-col items-start gap-1.5'),
  name: cva('font-display text-[2.125rem] leading-none text-balance uppercase'),
  summary: cva('m-0 text-ink-soft'),
  cue: cva(
    'self-center transition-transform duration-(--dur-fast) ease-pr-out motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1',
  ),
};
