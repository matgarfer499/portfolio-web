'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { Locale } from '@/i18n/routing';
import { emitTrophy } from '@shared/events/trophy-bus';
import { DURATION } from '@shared/motion/tokens';
import { countUp, formatCount, shouldArm } from '../../model';

// Wraps the server-rendered board. Below the fold with motion allowed, it rewinds every card
// (strike undrawn, "before" digits) and plays each one when 60 % of it is in view.
// Either way, once every card has been in view it emits records-seen.
export function RecordsMotion({
  locale,
  className,
  children,
}: {
  locale: Locale;
  className: string;
  children: ReactNode;
}) {
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const cards = [...el.querySelectorAll<HTMLElement>('[data-record]')];
    const armed = shouldArm({
      boardTop: el.getBoundingClientRect().top,
      innerHeight: window.innerHeight,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
    const frames = new Map<Element, number>();

    const count = (digits: HTMLElement) => {
      const from = Number(digits.dataset.from);
      const to = Number(digits.dataset.to);
      let start = 0;
      const step = (now: number) => {
        start ||= now;
        const progress = (now - start) / (DURATION.count * 1000);
        digits.textContent = formatCount(countUp(from, to, progress), locale);
        if (progress < 1) frames.set(digits, requestAnimationFrame(step));
      };
      frames.set(digits, requestAnimationFrame(step));
    };

    if (armed) {
      for (const card of cards) {
        card.dataset.state = 'armed';
        const digits = card.querySelector<HTMLElement>('[data-count]');
        if (digits) digits.textContent = formatCount(Number(digits.dataset.from), locale);
      }
    }

    let seen = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const card = entry.target as HTMLElement;
          observer.unobserve(card);
          if (armed) {
            card.dataset.state = 'played';
            const digits = card.querySelector<HTMLElement>('[data-count]');
            if (digits) count(digits);
          }
          seen += 1;
          if (seen === cards.length) emitTrophy('records-seen');
        }
      },
      { threshold: 0.6 },
    );
    for (const card of cards) observer.observe(card);

    return () => {
      observer.disconnect();
      for (const frame of frames.values()) cancelAnimationFrame(frame);
    };
  }, [locale]);

  return (
    <div ref={board} className={className}>
      {children}
    </div>
  );
}
