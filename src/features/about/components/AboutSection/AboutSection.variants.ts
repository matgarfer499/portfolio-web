import { cva } from 'class-variance-authority';

export const aboutSectionVariants = {
  grid: cva(
    'grid grid-cols-1 items-start gap-8 stack:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] stack:gap-12',
  ),
  copy: cva('flex flex-col gap-[1.125rem]'),
  paragraph: cva('m-0 max-w-[52ch] text-ink-soft'),
};
