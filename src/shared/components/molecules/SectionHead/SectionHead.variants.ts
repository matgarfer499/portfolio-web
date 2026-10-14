import { cva } from 'class-variance-authority';

export const sectionHeadVariants = {
  root: cva('mb-9 flex flex-wrap items-end justify-between gap-6'),
  lede: cva('m-0 max-w-[44ch] font-medium text-steel'),
};
