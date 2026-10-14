import { cva } from 'class-variance-authority';

// data-state comes from RecordsMotion: "armed" (strike undrawn, before value showing) then "played".
// The ::after bar is the volt flash: on pointer hover, and once when a card plays in view.
export const recordCardVariants = {
  root: cva(
    'relative flex flex-col gap-3.5 bg-night px-6 pt-[1.625rem] pb-6 transition-transform duration-(--dur-base) ease-pr-out after:absolute after:inset-x-0 after:top-0 after:h-1 after:bg-volt after:opacity-0 after:transition-opacity after:duration-(--dur-base) motion-safe:data-[state=played]:after:animate-[record-flash_var(--dur-reveal)_var(--ease-out-soft)_var(--dur-count)] board:min-h-[18.75rem] pointer-fine:hover:z-10 pointer-fine:hover:after:opacity-100 motion-safe:pointer-fine:hover:-translate-y-1',
  ),
  before: cva('relative self-start font-display text-[2.125rem] leading-none text-night-ghost'),
  strike: cva(
    'absolute inset-x-0 top-1/2 h-[3px] origin-left -translate-y-1/2 bg-current transition-[scale] duration-(--dur-reveal) ease-pr-out in-data-[state=armed]:scale-x-0',
  ),
  after: cva(
    'flex items-baseline gap-1 font-display text-[5rem] leading-[0.85] text-volt tabular-nums stack:text-[6rem]',
  ),
  unit: cva('text-[0.42em]'),
  badge: cva(
    'self-start border-2 border-volt px-2 py-1 text-[0.8125rem] leading-none font-bold tracking-[0.06em] text-volt uppercase',
  ),
  note: cva('m-0 mt-auto text-[0.9375rem] leading-[1.45] text-night-ink'),
};
