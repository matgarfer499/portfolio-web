import type { ComponentProps } from 'react';
import { cn } from '@shared/lib/cn';
import { bulletsVariants } from './Bullets.variants';

export function Bullets({ className, ...props }: ComponentProps<'ul'>) {
  return <ul className={cn(bulletsVariants.list(), className)} {...props} />;
}

export function Bullet({ className, ...props }: ComponentProps<'li'>) {
  return <li className={cn(bulletsVariants.item(), className)} {...props} />;
}
