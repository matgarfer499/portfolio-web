import { useEffect } from 'react';
import type { TrophyId } from '../data/trophies';

export function use404VisitListener(unlock: (id: TrophyId) => void): void {
  useEffect(() => {
    if (document.querySelector('[data-page="404"]') !== null) {
      unlock('wanderer');
    }
  }, [unlock]);
}
