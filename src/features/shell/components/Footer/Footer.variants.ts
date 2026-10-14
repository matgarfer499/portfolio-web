import { cva } from 'class-variance-authority';

export const footerVariants = {
  root: cva('surface-volt bg-volt text-on-volt'),
  row: cva(
    'flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-[3px] border-ink pt-5 pb-7 text-[0.875rem] font-bold',
  ),
  top: cva('inline-flex min-h-11 items-center text-ink underline-offset-4 hover:underline'),
};
