import { cva } from 'class-variance-authority';

export const sectionNavVariants = {
  // Tighter between board and xl: the trophy counter shares the row with five Spanish labels.
  root: cva('ml-auto hidden items-center gap-4 board:flex xl:gap-5'),
  link: cva(
    'border-b-[3px] border-transparent py-3 text-[0.8125rem] font-bold tracking-[0.06em] whitespace-nowrap text-ink uppercase no-underline hover:border-volt aria-[current=location]:border-volt xl:text-[0.875rem] xl:tracking-[0.08em]',
  ),
};
