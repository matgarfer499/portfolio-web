'use client';

import { useEffect } from 'react';
import { isBelowFold, landingOffset, prefersReducedMotion } from './viewport';

// Mounted once per page. Elements marked `data-reveal` are visible in the server HTML; below the
// fold, with motion allowed, they are armed (hidden, lowered) and shown as they scroll into view.
export function RevealController() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const landing = landingOffset();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue;
          (target as HTMLElement).dataset.reveal = 'shown';
          observer.unobserve(target);
        }
      },
      { threshold: 0.12 },
    );
    for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
      if (!isBelowFold(el, landing)) continue;
      el.dataset.reveal = 'armed';
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
