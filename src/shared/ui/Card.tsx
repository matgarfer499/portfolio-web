import type { ReactNode } from 'react';
import { cn } from '@shared/lib';

type Props = {
  readonly as?: 'div' | 'article';
  readonly className?: string;
  readonly children: ReactNode;
};

export function Card({ as: Tag = 'div', className, children }: Props) {
  return (
    <Tag className={cn('border-border bg-surface rounded-lg border p-6', className)}>
      {children}
    </Tag>
  );
}
