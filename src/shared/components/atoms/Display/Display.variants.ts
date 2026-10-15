import { cva, type VariantProps } from 'class-variance-authority';

// Giant type is sized in cqi against the nearest Container, never the viewport (DESIGN.md).
export const displayVariants = cva(
  'font-display font-normal tracking-[0.005em] text-balance uppercase',
  {
    variants: {
      size: {
        hero: 'text-[31.5cqi] leading-[1.18] stack:text-[min(15.2cqi,22svh)] stack:leading-[0.82]',
        section: 'text-[clamp(3.5rem,7cqi,6.875rem)] leading-[0.9]',
        card: 'text-[clamp(4rem,7cqi,6.75rem)] leading-[0.9]',
        poster: 'text-[16.4cqi] leading-[0.9] stack:text-[12.2cqi]',
        // A poster headline in one of two columns: about half the full poster on desktop.
        half: 'text-[16.4cqi] leading-[0.9] stack:text-[8cqi]',
        lg: 'text-[2.125rem] leading-none',
        stat: 'text-[1.875rem] leading-none',
      },
    },
    defaultVariants: { size: 'section' },
  },
);

export type DisplayVariantProps = VariantProps<typeof displayVariants>;
