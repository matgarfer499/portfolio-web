import { cva } from 'class-variance-authority';

export const themeToggleVariants = {
  root: cva(
    'inline-flex size-11 items-center justify-center rounded-[2px] border-2 border-ink bg-paper text-ink transition-transform duration-(--dur-fast) ease-pr-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5 active:translate-y-0',
  ),
};
