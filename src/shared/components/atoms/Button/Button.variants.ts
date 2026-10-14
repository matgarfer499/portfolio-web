import { cva, type VariantProps } from 'class-variance-authority';

// Hover and keyboard focus lift the button onto a hard offset shadow (DESIGN.md § Components).
// Only transform transitions; the shadow and fill switch instantly (motion ban).
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2.5 rounded-[2px] border-2 border-ink font-body leading-none font-bold tracking-[0.06em] whitespace-nowrap uppercase no-underline transition-transform duration-(--dur-fast) ease-pr-out select-none [--shadow:var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[0.25rem_0.25rem_0_var(--shadow)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 focus-visible:shadow-[0.25rem_0.25rem_0_var(--shadow)] active:translate-0 active:shadow-none disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.125rem] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-paper text-ink',
        volt: 'bg-volt text-on-volt',
        dark: 'bg-ink text-paper [--shadow:var(--volt)]',
      },
      size: {
        md: 'min-h-[3.25rem] px-[1.375rem] text-[0.9375rem]',
        sm: 'min-h-11 px-4 text-[0.8125rem]',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
