import { cva, type VariantProps } from 'class-variance-authority';

export const iconVariants = cva('shrink-0 fill-none stroke-current', {
  variants: {
    size: { sm: 'size-4', md: 'size-[1.125rem]', lg: 'size-6', xl: 'size-[2.875rem]' },
  },
  defaultVariants: { size: 'md' },
});

export type IconVariantProps = VariantProps<typeof iconVariants>;
