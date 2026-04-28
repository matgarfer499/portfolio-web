import type { ReactNode } from 'react';
import { cn } from '@shared/lib';

type Props = {
  readonly id?: string;
  readonly as?: 'section' | 'div';
  readonly className?: string;
  readonly children: ReactNode;
};

export function Section({ id, as: Tag = 'section', className, children }: Props) {
  return (
    <Tag id={id} className={cn('py-20 md:py-32', className)}>
      {children}
    </Tag>
  );
}
