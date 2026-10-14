import { cva } from 'class-variance-authority';

export const sectionNavVariants = {
  root: cva('ml-auto hidden items-center gap-5 board:flex'),
  link: cva(
    'border-b-[3px] border-transparent py-3 text-[0.875rem] font-bold tracking-[0.08em] whitespace-nowrap text-ink uppercase no-underline hover:border-volt aria-[current=location]:border-volt',
  ),
};
