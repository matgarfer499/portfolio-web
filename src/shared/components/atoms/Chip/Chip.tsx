import type { ComponentProps } from 'react';
import { cn } from '@shared/lib/cn';
import { chipVariants } from './Chip.variants';

export function Chip({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn(chipVariants(), className)} {...props} />;
}
