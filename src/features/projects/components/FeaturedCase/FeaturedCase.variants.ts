import { cva } from 'class-variance-authority';

export const featuredCaseVariants = {
  root: cva(
    'grid grid-cols-1 border-[3px] border-ink [view-timeline:--case] board:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]',
  ),
  visual: cva(
    'surface-volt relative flex items-end overflow-hidden border-b-[3px] border-ink bg-volt px-6 pt-8 stack:px-12 stack:pt-12 board:border-r-[3px] board:border-b-0',
  ),
  desk: cva('block h-auto w-[92%] mockup-rise [--rise:0.5rem]'),
  phone: cva(
    'absolute right-4 bottom-4 h-auto w-[24%] mockup-rise drop-shadow-mockup [--rise:2rem] stack:right-7 stack:bottom-6',
  ),
  copy: cva('flex flex-col items-start gap-[1.125rem] p-6 stack:p-10'),
  summary: cva('m-0 text-ink-soft'),
  chips: cva('flex flex-wrap gap-1.5'),
  ctas: cva('flex flex-wrap gap-3'),
};
