'use client';

import { useEffect, useState } from 'react';
import { pickActive } from './activeSection';

// The reading line is a thin band just above the middle of the viewport: whatever crosses it is
// what the visitor is reading, so a short section between two long ones still gets its turn.
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible[e.isIntersecting ? 'add' : 'delete'](e.target.id);
        setActive(pickActive(ids, visible));
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
