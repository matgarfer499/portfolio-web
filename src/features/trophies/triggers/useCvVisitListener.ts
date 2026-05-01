import { useEffect } from 'react';
import type { TrophyId } from '../data/trophies';

export function useCvVisitListener(unlock: (id: TrophyId) => void) {
  useEffect(() => {
    if (window.location.pathname === '/cv') {
      unlock('wanderer');
    }
  }, [unlock]);
}
