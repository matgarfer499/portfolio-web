'use client';

import type { ComponentProps } from 'react';
import { emitTrophy, type TrophyEvent } from '@shared/events/trophy-bus';

// A plain link that also reports a trophy event when followed (e.g. opening the CV).
export function TrophyLink({
  event,
  onClick,
  ...props
}: ComponentProps<'a'> & { event: TrophyEvent }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        emitTrophy(event);
        onClick?.(e);
      }}
    />
  );
}
