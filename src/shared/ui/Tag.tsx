import type { ReactNode } from 'react';
import { cn } from '@shared/lib';

type Props = {
  readonly className?: string;
  readonly children: ReactNode;
};

export function Tag({ className, children }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono text-xs tracking-wide uppercase',
        'text-fg-muted rounded-sm bg-neutral-100 px-2 py-0.5 dark:bg-neutral-900',
        className,
      )}
    >
      {children}
    </span>
  );
}
