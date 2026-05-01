import { useRef, useState } from 'react';
import { cn } from '@shared/lib';
import { useMediaQuery } from '@shared/hooks';
import { usePointerPosition } from '../hooks/usePointerPosition';

export function CursorHost() {
  const isFinePointer = useMediaQuery('(pointer: fine)');
  const dotRef = useRef<HTMLDivElement>(null);
  const [inZone, setInZone] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  usePointerPosition((x, y) => {
    if (!isFinePointer) return;
    const target = document.elementFromPoint(x, y);
    const zone = target?.closest('[data-cursor-zone]') ?? null;
    const interactive = zone ? (target?.closest('a, button, [role="button"]') ?? null) : null;

    setInZone(zone !== null);
    setIsHovering(interactive !== null);

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${x.toString()}px, ${y.toString()}px)`;
    }
  });

  if (!isFinePointer) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ opacity: inZone ? 1 : 0 }}
    >
      <div
        className={cn(
          'bg-accent rounded-full mix-blend-difference motion-safe:transition-[width,height] motion-safe:duration-150 motion-safe:ease-out',
          isHovering ? 'h-8 w-8' : 'h-3 w-3',
        )}
      />
    </div>
  );
}
