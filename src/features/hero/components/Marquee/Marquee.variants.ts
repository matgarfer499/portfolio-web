import { cva } from 'class-variance-authority';

export const marqueeVariants = {
  band: cva(
    'absolute top-[44%] -right-[60%] -left-[6%] z-[3] -rotate-4 overflow-hidden border-y-[3px] border-ink bg-volt text-on-volt stack:top-[46%] stack:-right-[30%]',
  ),
  track: cva('flex w-max motion-safe:animate-[marquee_26s_linear_infinite]'),
  item: cva(
    'py-2.5 font-display text-[1.875rem] leading-none whitespace-nowrap uppercase stack:py-3.5 stack:text-[2.75rem]',
  ),
  dot: cva(
    'mx-4 inline-block size-2.5 translate-y-[-0.25rem] rotate-45 bg-ink align-middle stack:mx-6 stack:size-3.5',
  ),
};
