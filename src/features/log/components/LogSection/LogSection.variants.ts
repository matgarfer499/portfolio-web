import { cva } from 'class-variance-authority';

export const logSectionVariants = {
  list: cva('relative border-t-[3px] border-ink'),
  // A named view timeline on the rail drives the fill (globals.css @utility rail-fill).
  rail: cva(
    'absolute inset-y-0 -left-[1.125rem] hidden w-[3px] bg-line [view-timeline:--log] stack:block',
  ),
  fill: cva('rail-fill size-full origin-top bg-volt'),
  columns: cva(
    'hidden grid-cols-[10.625rem_13.75rem_minmax(0,1fr)_16.25rem] gap-7 border-b-2 border-ink py-3 text-[0.75rem] font-extrabold tracking-[0.12em] text-steel uppercase board:grid',
  ),
};
