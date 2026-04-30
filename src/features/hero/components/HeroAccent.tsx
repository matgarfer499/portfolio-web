import { cn } from '@shared/lib';

type Props = {
  readonly className?: string;
};

export function HeroAccent({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute -inset-3 -translate-x-2 translate-y-3 rotate-[-2deg]',
        'border-border bg-surface rounded-lg border',
        'shadow-[var(--shadow-lg)]',
        '-z-10',
        className,
      )}
    />
  );
}
