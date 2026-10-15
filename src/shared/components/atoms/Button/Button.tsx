import type { ComponentProps } from 'react';
import { cn } from '@shared/lib/cn';
import { buttonVariants, type ButtonVariantProps } from './Button.variants';

// Links styled as buttons use buttonVariants() directly on <a> / <Link>.
export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'> & ButtonVariantProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
