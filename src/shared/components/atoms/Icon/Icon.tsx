import type { ComponentProps } from 'react';
import { cn } from '@shared/lib/cn';
import { ICONS, type IconName } from './icons';
import { iconVariants, type IconVariantProps } from './Icon.variants';

type IconProps = ComponentProps<'svg'> & IconVariantProps & { name: IconName; label?: string };

// Decorative by default; pass `label` only when the icon is the sole name of its control.
export function Icon({ name, label, size, strokeWidth = 2.6, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconVariants({ size }), className)}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      {...props}
    >
      <path d={ICONS[name]} />
    </svg>
  );
}
