import { cva } from 'class-variance-authority';

export const caseStudyPageVariants = {
  top: cva('mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2'),
  back: cva(
    'inline-flex min-h-11 items-center gap-2 text-[0.875rem] font-bold tracking-[0.08em] text-ink uppercase no-underline hover:text-steel',
  ),
  head: cva('flex flex-col items-start gap-[1.125rem]'),
  summary: cva('m-0 max-w-[52ch] text-[1.125rem] text-ink-soft'),
  chips: cva('flex flex-wrap gap-1.5'),
  shot: cva(
    'mt-10 flex justify-center border-[3px] border-ink bg-volt px-6 pt-8 surface-volt stack:px-16 stack:pt-14',
  ),
  shotImage: cva('block h-auto w-full max-w-[56rem]'),
  next: cva('mt-14'),
  body: cva('flex max-w-[46rem] flex-col gap-10'),
  block: cva('flex flex-col gap-3'),
  heading: cva('m-0 font-display text-[2.125rem] leading-none text-balance uppercase'),
  text: cva('m-0 text-ink-soft'),
};
