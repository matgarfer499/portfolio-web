import { cva } from 'class-variance-authority';

export const heroVariants = {
  root: cva('overflow-hidden pt-7'),
  meta: cva(
    'flex flex-col gap-0.5 border-b-2 border-ink pb-2.5 text-[0.875rem] font-bold tracking-[0.1em] uppercase stack:flex-row stack:justify-between stack:gap-4',
  ),
  grid: cva(
    'mt-7 grid grid-cols-1 gap-7 stack:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] stack:items-stretch stack:gap-10',
  ),
  intro: cva('flex flex-col gap-[1.375rem] stack:pb-10'),
  role: cva(
    'm-0 text-[clamp(1.625rem,2.4cqi,2.125rem)] leading-[1.1] font-extrabold tracking-[-0.01em] text-balance',
  ),
  firstLine: cva('block'),
  mark: cva('bg-volt [box-decoration-break:clone] px-1 text-on-volt'),
  lede: cva('m-0 max-w-[46ch] text-steel'),
  ctas: cva('flex flex-wrap gap-3'),
  stats: cva('m-0 mt-auto grid grid-cols-3 border-t-2 border-ink'),
  stat: cva('flex flex-col-reverse pt-3.5 pr-3'),
  statValue: cva('m-0 font-display text-[1.625rem] leading-none stack:text-[1.875rem]'),
  statLabel: cva('text-[0.75rem] leading-[1.3] font-semibold text-steel stack:text-[0.8125rem]'),
};
