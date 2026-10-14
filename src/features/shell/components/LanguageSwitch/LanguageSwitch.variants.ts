import { cva } from 'class-variance-authority';

export const languageSwitchVariants = cva(
  'inline-flex size-11 items-center justify-center rounded-[2px] border-2 border-ink bg-paper text-[0.8125rem] font-bold tracking-[0.06em] text-ink no-underline transition-transform duration-(--dur-fast) ease-pr-out motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5',
);
