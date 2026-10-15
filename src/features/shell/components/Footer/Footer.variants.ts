import { cva } from 'class-variance-authority';

export const footerVariants = {
  root: cva('bg-volt text-on-volt surface-volt print:hidden'),
  row: cva(
    'flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t-2 border-ink py-4 text-[0.8125rem] font-bold',
  ),
  top: cva('inline-flex min-h-11 items-center text-ink underline-offset-4 hover:underline'),
};
