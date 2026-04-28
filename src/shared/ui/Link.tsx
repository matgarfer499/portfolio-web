import type { ReactNode } from 'react';
import { cn } from '@shared/lib';

type Props = {
  readonly href: string;
  readonly external?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
};

export function Link({ href, external = false, className, children }: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn('text-accent underline-offset-4 hover:underline', className)}
    >
      {children}
    </a>
  );
}
