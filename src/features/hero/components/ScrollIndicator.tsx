import { CaretDownIcon } from '@phosphor-icons/react';
import { IconProvider } from '@shared/icons';
import { useScrollFade } from '../hooks/useScrollFade';

export function ScrollIndicator() {
  const opacity = useScrollFade(120);

  return (
    <IconProvider>
      <div
        aria-hidden="true"
        className="text-fg-muted absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-xs tracking-widest uppercase"
        style={{ opacity, transition: 'opacity 200ms ease-out' }}
      >
        <span>Scroll</span>
        <CaretDownIcon size={16} className="motion-safe:animate-bounce-subtle" />
      </div>
    </IconProvider>
  );
}
