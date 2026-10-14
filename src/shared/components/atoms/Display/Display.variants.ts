import { cva, type VariantProps } from 'class-variance-authority';

// Giant type is sized in cqi against the nearest Container, never the viewport (DESIGN.md).
export const displayVariants = cva(
  'm-0 font-display font-normal tracking-[0.005em] text-balance uppercase',
  {
    variants: {
      size: {
        hero: 'text-[31.5cqi] leading-[0.95] stack:text-[15.2cqi] stack:leading-[0.82]',
        section: 'text-[clamp(3.5rem,7cqi,6.875rem)] leading-[0.9]',
        card: 'text-[clamp(4rem,7cqi,6.75rem)] leading-[0.9]',
        lg: 'text-[2.125rem] leading-none',
        stat: 'text-[1.875rem] leading-none',
      },
    },
    defaultVariants: { size: 'section' },
  },
);

export type DisplayVariantProps = VariantProps<typeof displayVariants>;
