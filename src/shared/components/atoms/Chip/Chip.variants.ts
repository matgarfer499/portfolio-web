import { cva } from 'class-variance-authority';

export const chipVariants = cva(
  'inline-flex items-center border-2 border-ink bg-paper px-[0.5625rem] py-[0.3125rem] text-[0.8125rem] leading-none font-bold text-ink',
);
