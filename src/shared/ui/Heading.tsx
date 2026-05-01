import type { ReactNode } from 'react';
import { cn } from '@shared/lib';

type Props = {
  readonly level: 1 | 2 | 3;
  readonly as?: 'h1' | 'h2' | 'h3' | 'p';
  readonly id?: string;
  readonly className?: string;
  readonly children: ReactNode;
};

const levelStyles: Record<1 | 2 | 3, string> = {
  1: 'text-4xl md:text-5xl font-serif font-medium tracking-tight leading-tight',
  2: 'text-2xl md:text-3xl font-serif font-medium tracking-tight leading-snug',
  3: 'text-xl md:text-2xl font-serif font-medium leading-snug',
};

export function Heading({ level, as, id, className, children }: Props) {
  const Tag = as ?? (`h${level}` as 'h1' | 'h2' | 'h3');
  return (
    <Tag id={id} className={cn('text-fg', levelStyles[level], className)}>
      {children}
    </Tag>
  );
}
