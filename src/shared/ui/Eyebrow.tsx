import type { ReactNode } from 'react';
import { cn } from '@shared/lib';

type Props = {
  readonly className?: string;
  readonly children: ReactNode;
};

export function Eyebrow({ className, children }: Props) {
  return (
    <span className={cn('text-accent font-mono text-xs tracking-widest uppercase', className)}>
      {children}
    </span>
  );
}
