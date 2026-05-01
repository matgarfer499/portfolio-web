import { useEffect } from 'react';
import type { TrophyId } from '../data/trophies';

const SECTION_IDS = ['hero', 'projects', 'experience', 'about', 'contact'] as const;

export function useScrollAllSections(unlock: (id: TrophyId) => void) {
  useEffect(() => {
    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) seen.add(e.target.id);
        });
        if (SECTION_IDS.every((id) => seen.has(id))) {
          unlock('lurker');
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [unlock]);
}
