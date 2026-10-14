import type { ComponentProps } from 'react';
import { cn } from '@shared/lib/cn';
import { containerVariants } from './Container.variants';

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(containerVariants(), className)} {...props} />;
}
