import type { ComponentProps } from 'react';
import { cn } from '@shared/lib/cn';
import { displayVariants, type DisplayVariantProps } from './Display.variants';

type DisplayProps = ComponentProps<'h2'> &
  DisplayVariantProps & { as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' };

export function Display({ as: Tag = 'h2', size, className, ...props }: DisplayProps) {
  return <Tag className={cn(displayVariants({ size }), className)} {...props} />;
}
