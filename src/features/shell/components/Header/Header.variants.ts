import { cva } from 'class-variance-authority';

export const headerVariants = {
  // Named so view transitions keep it still while page content slides.
  root: cva(
    'sticky top-0 z-30 border-b-2 border-ink bg-paper [view-transition-name:site-header] print:hidden',
  ),
  bar: cva('flex h-16 items-center gap-4 board:gap-5 xl:gap-7'),
  mark: cva(
    'inline-flex size-11 shrink-0 items-center justify-center bg-night font-display text-[1.375rem] leading-none text-volt no-underline',
  ),
  actions: cva('ml-auto flex items-center gap-2 board:ml-0'),
  wide: cva('hidden items-center gap-2 board:flex'),
};
