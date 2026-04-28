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
        'text-fg-muted bg-surface rounded-sm px-2 py-0.5',
        className,
      )}
    >
      {children}
    </span>
  );
}
