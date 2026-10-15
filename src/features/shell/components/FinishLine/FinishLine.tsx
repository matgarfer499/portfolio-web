'use client';

import { useEffect, useRef } from 'react';
import { emitTrophy } from '@shared/events/trophy-bus';
import { isFinishLine } from '../../model';

// 0.99, not 1: a fractional page height can leave the footer a subpixel short of fully visible.
const FULLY_VISIBLE = 0.99;

// Watches its closest <footer>: reaching it fully, for real, is the "finish line" trophy.
export function FinishLine() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const footer = probe.current?.closest('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const reached = isFinishLine({
          fullyVisible: (entry?.intersectionRatio ?? 0) >= FULLY_VISIBLE,
          scrollY: window.scrollY,
          scrollHeight: document.documentElement.scrollHeight,
          innerHeight: window.innerHeight,
        });
        if (reached) {
          emitTrophy('finish-line');
          observer.disconnect();
        }
      },
      { threshold: FULLY_VISIBLE },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return <span ref={probe} hidden />;
}
