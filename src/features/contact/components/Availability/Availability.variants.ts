import { cva } from 'class-variance-authority';

export const availabilityVariants = {
  root: cva('inline-flex items-center gap-3 text-[0.9375rem] font-bold'),
  dot: cva('relative inline-block size-3 rounded-full', {
    variants: { open: { true: 'bg-ink', false: 'bg-steel' } },
  }),
  // The ring grows and fades from the dot; a status light, still under reduced motion.
  pulse: cva(
    'absolute inset-0 rounded-full bg-ink motion-safe:animate-[dot-pulse_1.8s_ease-out_infinite]',
  ),
};
