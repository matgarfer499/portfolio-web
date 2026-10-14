'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { Locale } from '@/i18n/routing';
import { emitTrophy } from '@shared/events/trophy-bus';
import { DURATION } from '@shared/motion/tokens';
import { countUp, formatCount, shouldArm } from '../../model';
import { recordsMotionVariants as styles } from './RecordsMotion.variants';

type Frames = Map<Element, number>;

function countTo(digits: HTMLElement, locale: Locale, frames: Frames) {
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
}

// Wraps the server-rendered board. Below the fold with motion allowed, it rewinds every card
// (strike undrawn, "before" digits) and plays each one when 60 % of it is in view.
// Either way, once every card has been in view it emits records-seen.
export function RecordsMotion({ locale, children }: { locale: Locale; children: ReactNode }) {
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const cards = [...el.querySelectorAll<HTMLElement>('[data-record]')];
    const digitsOf = new Map(
      cards.map((card) => [card, card.querySelector<HTMLElement>('[data-count]')]),
    );
    const armed = shouldArm({
      boardTop: el.getBoundingClientRect().top,
      innerHeight: window.innerHeight,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
    const frames: Frames = new Map();

    if (armed) {
      for (const [card, digits] of digitsOf) {
        card.dataset.state = 'armed';
        if (digits) digits.textContent = formatCount(Number(digits.dataset.from), locale);
      }
    }

    let seen = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          observer.unobserve(target);
          const digits = digitsOf.get(target as HTMLElement);
          if (armed) {
            (target as HTMLElement).dataset.state = 'played';
            if (digits) countTo(digits, locale, frames);
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
    <div ref={board} className={styles.board()}>
      {children}
    </div>
  );
}
