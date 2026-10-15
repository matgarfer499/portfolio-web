import { cva } from 'class-variance-authority';

export const highlightRecordCardVariants = {
  root: cva(
    'flex flex-col gap-3.5 bg-volt px-6 pt-[1.625rem] pb-6 text-ink surface-volt board:min-h-[18.75rem]',
  ),
  metric: cva('font-display text-[3.5rem] leading-[0.9] uppercase stack:text-[4rem]'),
  note: cva('m-0 text-[0.9375rem] leading-[1.45] text-ink-soft'),
  link: cva(
    'mt-auto inline-flex items-center gap-2 self-start font-bold text-ink underline decoration-2 underline-offset-4 transition-transform duration-(--dur-fast) ease-pr-out motion-safe:hover:translate-x-1',
  ),
};
