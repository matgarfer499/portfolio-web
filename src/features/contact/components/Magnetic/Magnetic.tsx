'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion } from '@shared/motion/viewport';
import { magnetPull } from '../../model';

const MAX_PX = 6;

// Links inside lean toward a fine pointer (--mx/--my, read by their transform); off otherwise.
export function Magnetic({ className, children }: { className: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    const set = (target: HTMLElement, x: number, y: number) => {
      target.style.setProperty('--mx', `${x}px`);
      target.style.setProperty('--my', `${y}px`);
    };
    const move = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>('a');
      if (!target) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { x, y } = magnetPull(
          event.clientX,
          event.clientY,
          target.getBoundingClientRect(),
          MAX_PX,
        );
        set(target, x, y);
      });
    };
    const leave = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>('a');
      if (!target || target.contains(event.relatedTarget as Node | null)) return;
      cancelAnimationFrame(frame);
      set(target, 0, 0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerout', leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerout', leave);
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
