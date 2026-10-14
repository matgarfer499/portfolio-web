'use client';

import { useEffect, useRef } from 'react';
import { emitTrophy } from '@shared/events/trophy-bus';
import { isFinishLine } from '../../model';

// Watches its closest <footer>: reaching it fully, for real, is the "finish line" trophy.
export function FinishLine() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const footer = probe.current?.closest('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const reached = isFinishLine({
          fullyVisible: (entry?.intersectionRatio ?? 0) >= 0.99,
          scrollY: window.scrollY,
          scrollHeight: document.documentElement.scrollHeight,
          innerHeight: window.innerHeight,
        });
        if (reached) {
          emitTrophy('finish-line');
          observer.disconnect();
        }
      },
      { threshold: 1 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return <span ref={probe} hidden />;
}
