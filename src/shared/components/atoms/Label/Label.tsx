import type { ComponentProps } from 'react';
import { cn } from '@shared/lib/cn';
import { labelVariants, type LabelVariantProps } from './Label.variants';

// Polymorphic tag: `ref` is left out because span and p refs differ.
type LabelProps = Omit<ComponentProps<'span'>, 'ref'> & LabelVariantProps & { as?: 'span' | 'p' };

export function Label({ as: Tag = 'span', tone, className, ...props }: LabelProps) {
  return <Tag className={cn(labelVariants({ tone }), className)} {...props} />;
}
