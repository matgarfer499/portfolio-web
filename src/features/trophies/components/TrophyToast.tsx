import { TrophyIcon, XIcon } from '@phosphor-icons/react';
import { cn } from '@shared/lib';
import type { Trophy } from '../data/trophies';

type Props = {
  readonly trophy: Trophy;
  readonly onDismiss: () => void;
};

export function TrophyToast({ trophy, onDismiss }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        'fixed right-4 bottom-4 z-50 flex max-w-xs items-start gap-3 rounded-xl p-4',
        'border-border border',
        'bg-surface/70 backdrop-blur-md',
        'motion-safe:animate-fade-up',
      )}
      style={{ boxShadow: 'var(--shadow-glass)' }}
    >
      <TrophyIcon size={18} weight="light" className="text-accent mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-fg font-mono text-sm font-medium">{trophy.name}</p>
        <p className="text-fg-muted mt-0.5 text-xs">{trophy.flavor}</p>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss trophy notification"
        className="text-fg-muted hover:text-fg focus-visible:outline-accent shrink-0 cursor-pointer focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-1"
      >
        <XIcon size={14} weight="bold" />
      </button>
    </div>
  );
}
