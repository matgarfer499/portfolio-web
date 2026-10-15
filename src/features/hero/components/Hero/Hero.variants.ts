import { cva } from 'class-variance-authority';

export const heroVariants = {
  // Desktop: exactly the first screen under the sticky header (4rem + its 2px border), never taller. The name and
  // the words cap their size by height (svh) so short laptops fit too; phones scroll as usual.
  root: cva('overflow-hidden pt-2 stack:h-[calc(100svh-4rem-2px)] stack:min-h-[36rem]'),
  inner: cva('stack:flex stack:h-full stack:flex-col'),
  grid: cva(
    'mt-7 grid grid-cols-1 gap-7 stack:mt-[min(1.75rem,3svh)] stack:min-h-0 stack:flex-1 stack:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] stack:grid-rows-[minmax(0,1fr)] stack:items-stretch stack:gap-10',
  ),
  intro: cva(
    'flex flex-col gap-[1.375rem] stack:gap-[min(1.375rem,2svh)] stack:pb-[min(2.5rem,3svh)]',
  ),
  role: cva(
    'm-0 text-[clamp(1.625rem,2.4cqi,2.125rem)] leading-[1.1] font-extrabold tracking-[-0.01em] text-balance',
  ),
  firstLine: cva('block'),
  mark: cva('bg-volt [box-decoration-break:clone] px-1 text-on-volt'),
  lede: cva('m-0 max-w-[46ch] text-steel'),
  ctas: cva('flex flex-wrap gap-3'),
  stats: cva('m-0 mt-auto grid grid-cols-3 border-t-2 border-ink'),
  stat: cva('flex flex-col-reverse justify-end pt-3.5 pr-3'),
  statValue: cva('m-0 font-display text-[1.625rem] leading-none stack:text-[1.875rem]'),
  statLabel: cva('text-[0.75rem] leading-[1.3] font-semibold text-steel stack:text-[0.8125rem]'),
};
