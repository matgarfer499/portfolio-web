import { cva } from 'class-variance-authority';

// Screen: a paper sheet on the site. Print (globals.css @media print): A4, light, no chrome.
export const cvPageVariants = {
  sheet: cva('mx-auto max-w-[52rem] print:max-w-none'),
  tools: cva('mb-10 flex flex-wrap items-center gap-3 print:hidden'),
  link: cva(
    'inline-flex min-h-11 items-center gap-2 font-bold text-ink underline underline-offset-4',
  ),
  head: cva('border-b-[3px] border-ink pb-6'),
  name: cva(
    'm-0 font-display text-[clamp(3rem,9cqi,4.5rem)] leading-[0.95] uppercase print:text-[34pt]',
  ),
  role: cva('mt-2 text-[1.125rem] font-bold'),
  contact: cva('mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.9375rem] text-ink-soft'),
  section: cva('mt-8 print:mt-5'),
  heading: cva(
    'mb-3 break-after-avoid border-b-2 border-ink pb-1 font-display text-[1.5rem] leading-none uppercase print:text-[14pt]',
  ),
  // A4 is narrower than `stack`: print keeps the date column anyway. A long job may span two
  // pages; single bullets and projects never split.
  entry: cva(
    'mb-5 grid gap-1 stack:grid-cols-[9.5rem_1fr] stack:gap-4 print:mb-3 print:grid-cols-[8rem_1fr] print:gap-4',
  ),
  project: cva('mb-4 break-inside-avoid print:mb-2.5'),
  stack: cva('m-0 mt-1 text-[0.8125rem] font-bold tracking-[0.04em] text-steel'),
  period: cva('text-[0.8125rem] font-bold tracking-[0.06em] text-steel uppercase'),
  title: cva('m-0 text-[1.0625rem] font-extrabold'),
  meta: cva('text-[0.9375rem] text-ink-soft'),
  text: cva('m-0 mt-1 text-[0.9375rem] text-ink-soft'),
  list: cva(
    'mt-2 print:gap-1 print:text-[0.9375rem] print:leading-[1.4] [&_li]:break-inside-avoid',
  ),
  pairs: cva('m-0 grid gap-1 text-[0.9375rem]'),
};
