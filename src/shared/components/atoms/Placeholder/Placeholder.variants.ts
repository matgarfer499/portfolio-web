import { cva, type VariantProps } from 'class-variance-authority';

// Content the owner still has to fill (`pending()`): visibly unfinished, never invented.
export const placeholderVariants = cva('border-dashed', {
  variants: {
    display: {
      inline: 'inline-block border-2 px-1.5',
      block: 'block border-[3px] px-8 py-7',
    },
    size: {
      text: 'font-bold',
      poster: 'font-display text-[3.5rem] leading-none uppercase',
    },
    tone: {
      paper: 'border-ink text-ink',
      night: 'border-volt text-night-ink',
    },
  },
  defaultVariants: { display: 'inline', size: 'text', tone: 'paper' },
});

export type PlaceholderVariantProps = VariantProps<typeof placeholderVariants>;
