import { useEffect } from 'react';
import type { TrophyId } from '../data/trophies';

export function useThemeToggleListener(unlock: (id: TrophyId) => void) {
  useEffect(() => {
    // Skip class mutations that happen during initial mount
    let ready = false;
    const readyTimer = setTimeout(() => {
      ready = true;
    }, 600);

    const observer = new MutationObserver(() => {
      if (!ready) return;
      unlock('switcher');
      observer.disconnect();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      clearTimeout(readyTimer);
      observer.disconnect();
    };
  }, [unlock]);
}
