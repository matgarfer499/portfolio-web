import type { ReactNode } from 'react';
import { cn } from '@shared/lib';

type Props = {
  readonly variant?: 'body' | 'lead' | 'small';
  readonly as?: 'p' | 'span' | 'div';
  readonly className?: string;
  readonly children: ReactNode;
};

const variantStyles: Record<'body' | 'lead' | 'small', string> = {
  lead: 'text-lg leading-relaxed text-fg',
  body: 'text-base leading-relaxed text-fg',
  small: 'text-sm leading-relaxed text-fg-muted',
};

export function Text({ variant = 'body', as: Tag = 'p', className, children }: Props) {
  return <Tag className={cn(variantStyles[variant], className)}>{children}</Tag>;
}
