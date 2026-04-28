import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/lib';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly variant?: 'primary' | 'secondary' | 'ghost';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly children: ReactNode;
};

const variantStyles: Record<'primary' | 'secondary' | 'ghost', string> = {
  primary:
    'bg-accent text-accent-fg border-transparent font-medium hover:opacity-90 motion-safe:transition-opacity motion-safe:duration-[120ms]',
  secondary:
    'bg-surface text-fg border-border hover:bg-neutral-200 dark:hover:bg-neutral-800 motion-safe:transition-colors motion-safe:duration-[150ms]',
  ghost:
    'bg-transparent text-fg-muted border-transparent hover:bg-surface hover:text-fg motion-safe:transition-colors motion-safe:duration-[150ms]',
};

const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-10 px-4 text-sm rounded-md',
  lg: 'h-12 px-6 text-base rounded-lg',
};

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center border font-mono tracking-wide uppercase',
        'focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
