import { cva, type VariantProps } from 'class-variance-authority';

export const labelVariants = cva('text-[0.8125rem] font-bold tracking-[0.12em] uppercase', {
  variants: {
    tone: { default: 'text-steel', ink: 'text-ink', night: 'text-night-muted' },
  },
  defaultVariants: { tone: 'default' },
});

export type LabelVariantProps = VariantProps<typeof labelVariants>;
