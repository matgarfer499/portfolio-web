import type { ComponentProps } from 'react';
import { cn } from '@shared/lib/cn';
import { placeholderVariants, type PlaceholderVariantProps } from './Placeholder.variants';

type PlaceholderProps = ComponentProps<'span'> & PlaceholderVariantProps & { note: string };

export function Placeholder({ note, display, tone, className, ...props }: PlaceholderProps) {
  return (
    <span data-pending className={cn(placeholderVariants({ display, tone }), className)} {...props}>
      [{note}]
    </span>
  );
}
