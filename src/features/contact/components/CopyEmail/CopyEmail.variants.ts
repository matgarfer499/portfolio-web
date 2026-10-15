import { cva } from 'class-variance-authority';

export const copyEmailVariants = {
  // The address replaces the label only when the clipboard is refused (selected for Ctrl+C).
  address: cva('normal-case select-all'),
  button: cva('relative'),
  // Ink rays spark out of the corner once per copy (motion-safe only).
  burst: cva('pointer-events-none absolute top-0 right-0 hidden motion-safe:block'),
  ray: cva(
    'absolute -top-1.5 -left-px h-3 w-[3px] [animation:copy-burst_450ms_var(--ease-out-soft)_both] bg-ink',
  ),
};
