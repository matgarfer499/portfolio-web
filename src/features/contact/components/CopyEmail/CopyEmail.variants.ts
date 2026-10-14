import { cva } from 'class-variance-authority';

export const copyEmailVariants = {
  root: cva('flex flex-wrap items-center gap-3'),
  address: cva(
    'text-[clamp(1.375rem,2.4cqi,2.125rem)] leading-[1.1] font-extrabold tracking-[-0.01em] break-all text-ink no-underline select-all hover:underline',
  ),
  button: cva('relative'),
  // Ink rays spark out of the corner once per copy (motion-safe only).
  burst: cva('pointer-events-none absolute top-0 right-0 hidden motion-safe:block'),
  ray: cva(
    'absolute -top-1.5 -left-px h-3 w-[3px] [animation:copy-burst_450ms_var(--ease-out-soft)_both] bg-ink',
  ),
};
