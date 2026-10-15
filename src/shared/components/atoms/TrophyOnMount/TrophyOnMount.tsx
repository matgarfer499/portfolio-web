'use client';

import { useEffect } from 'react';
import { emitTrophy, type TrophyEvent } from '@shared/events/trophy-bus';

// Reports a trophy event when the page that renders it opens (a case study, the CV).
export function TrophyOnMount({ event }: { event: TrophyEvent }) {
  useEffect(() => emitTrophy(event), [event]);
  return null;
}
