import { cva } from 'class-variance-authority';

export const stackGridVariants = {
  root: cva('mt-10'),
  heading: cva('mb-3'),
  grid: cva('grid grid-cols-1 gap-0.5 border-2 border-ink bg-ink stack:grid-cols-3'),
  cell: cva('bg-paper px-6 py-[1.375rem]'),
  title: cva('mb-2.5 block font-display text-[1.625rem] leading-none uppercase'),
  items: cva('text-ink-soft'),
};
