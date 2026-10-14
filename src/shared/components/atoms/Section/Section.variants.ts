import { cva, type VariantProps } from 'class-variance-authority';

// Each tone remaps paper/ink and the focus ring for its surface (globals.css, contrast.test.ts).
export const sectionVariants = cva('scroll-mt-16', {
  variants: {
    tone: {
      paper: 'bg-paper text-ink',
      night: 'surface-night bg-night text-night-ink',
      volt: 'surface-volt bg-volt text-on-volt',
    },
    spacing: {
      default: 'py-14 stack:py-[5.5rem]',
      tight: 'py-10 stack:py-14',
      flush: 'py-0',
      // Follows another paper section: the previous one's bottom padding is the gap.
      continued: 'pt-0 pb-14 stack:pb-[5.5rem]',
    },
  },
  defaultVariants: { tone: 'paper', spacing: 'default' },
});

export type SectionVariantProps = VariantProps<typeof sectionVariants>;
