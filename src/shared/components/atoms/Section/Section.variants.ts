import { cva, type VariantProps } from 'class-variance-authority';

// Each tone sets its own focus-ring colour, proven per surface by contrast.test.ts.
export const sectionVariants = cva('scroll-mt-16', {
  variants: {
    tone: {
      paper: 'bg-paper text-ink',
      night: 'bg-night text-night-ink [--ring:var(--volt)]',
      volt: 'bg-volt text-on-volt [--ring:var(--on-volt)]',
    },
    spacing: {
      default: 'py-14 stack:py-[5.5rem]',
      tight: 'py-10 stack:py-14',
      flush: 'py-0',
    },
  },
  defaultVariants: { tone: 'paper', spacing: 'default' },
});

export type SectionVariantProps = VariantProps<typeof sectionVariants>;
