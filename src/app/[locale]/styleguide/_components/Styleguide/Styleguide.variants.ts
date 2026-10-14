import { cva } from 'class-variance-authority';

export const styleguideVariants = {
  root: cva('min-h-dvh bg-paper text-ink'),
  bar: cva('flex items-center justify-between gap-4 border-b-2 border-ink py-4'),
  block: cva('flex flex-col gap-6'),
  row: cva('flex flex-wrap items-center gap-3'),
  grid: cva('grid grid-cols-2 gap-3 stack:grid-cols-4 board:grid-cols-6'),
  swatch: cva('flex flex-col gap-2 border-2 border-ink p-3 text-[0.8125rem] font-bold'),
  chip: cva('h-12 border-2 border-ink'),
  icon: cva('flex flex-col items-center gap-2 border-2 border-ink p-3 text-[0.75rem]'),
  body: cva('max-w-[46ch] text-steel'),
  longform: cva('max-w-[52ch] text-ink-soft'),
};

// Literal class names so Tailwind generates every swatch.
export const SWATCHES = {
  paper: 'bg-paper',
  ink: 'bg-ink',
  'ink-soft': 'bg-ink-soft',
  steel: 'bg-steel',
  line: 'bg-line',
  ghost: 'bg-ghost',
  volt: 'bg-volt',
  night: 'bg-night',
  'night-muted': 'bg-night-muted',
  'night-ghost': 'bg-night-ghost',
  'night-line': 'bg-night-line',
} as const;
