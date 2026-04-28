import type { ReactNode } from 'react';
import { cn } from '@shared/lib';

type Props = {
  readonly className?: string;
  readonly children: ReactNode;
};

export function Container({ className, children }: Props) {
  return <div className={cn('mx-auto w-full max-w-6xl px-6 md:px-8', className)}>{children}</div>;
}
