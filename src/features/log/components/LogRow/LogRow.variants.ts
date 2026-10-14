import { cva } from 'class-variance-authority';

// One column on phones; from `stack` the when column holds the left side (sticky) and the rest
// stacks on the right; from `board` the artifact's four columns.
export const logRowVariants = {
  root: cva(
    'grid grid-cols-1 gap-3.5 border-b-2 border-ink py-6 stack:grid-cols-[9.375rem_minmax(0,1fr)] stack:gap-x-7 stack:py-7 stack:[grid-template-areas:"when_team"_"when_head"_"when_list"_"when_chips"] board:grid-cols-(--log-cols) board:grid-rows-[auto_1fr] board:gap-y-2.5 board:[grid-template-areas:"when_team_head_chips"_"when_team_list_chips"]',
  ),
  when: cva(
    'font-display text-[1.875rem] leading-none uppercase stack:sticky stack:top-20 stack:self-start stack:[grid-area:when]',
  ),
  whenSmall: cva(
    'mt-2 block font-body text-[0.8125rem] leading-[1.4] font-bold tracking-[0.08em] text-steel',
  ),
  team: cva('flex flex-col items-start gap-2.5 stack:[grid-area:team]'),
  logo: cva('rounded-[2px] bg-logo p-1.5'),
  logoImage: cva('h-10 w-auto max-w-[10.625rem] object-contain object-left'),
  teamName: cva('text-[0.9375rem] font-bold'),
  head: cva('flex flex-col gap-1.5 stack:[grid-area:head]'),
  role: cva(
    'm-0 text-[1.375rem] leading-[1.15] font-extrabold tracking-[-0.01em] stack:text-[1.5rem]',
  ),
  since: cva('m-0 text-[0.875rem] font-semibold text-steel'),
  list: cva('m-0 grid list-none gap-2 p-0 stack:[grid-area:list]'),
  bullet: cva(
    'relative pl-[1.375rem] text-ink-soft before:absolute before:top-[0.55em] before:left-0 before:size-2.5 before:border-2 before:border-ink before:bg-volt',
  ),
  chips: cva('flex flex-wrap content-start gap-1.5 stack:[grid-area:chips]'),
};
