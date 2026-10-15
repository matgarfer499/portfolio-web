import type { ComponentProps } from 'react';
import { cn } from '@shared/lib/cn';
import { sectionVariants, type SectionVariantProps } from './Section.variants';

export function Section({
  tone,
  spacing,
  className,
  ...props
}: ComponentProps<'section'> & SectionVariantProps) {
  return <section className={cn(sectionVariants({ tone, spacing }), className)} {...props} />;
}
