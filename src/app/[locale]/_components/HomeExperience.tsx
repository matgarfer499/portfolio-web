'use client';

import { MotionConfig } from 'framer-motion';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { PressStart } from '@features/press-start';

export interface LocalizedZone {
  readonly id: string;
  readonly name: string;
  readonly heading: string;
  readonly body: string;
}

interface HomeExperienceProps {
  readonly name: string;
  readonly role: string;
  readonly hook: string;
  readonly summary: string;
  readonly location: string;
  readonly zones: LocalizedZone[];
}

// The whole WebGL layer is client-only and code-split, so PRESS START stays instant.
const GameExperience = dynamic(() => import('./GameExperience').then((m) => m.GameExperience), {
  ssr: false,
  loading: () => <GameLoading />,
});

/** Owns the "are we in the game yet?" toggle and respects the user's reduced-motion setting. */
export function HomeExperience({
  name,
  role,
  hook,
  summary,
  location,
  zones,
}: HomeExperienceProps) {
  const [entered, setEntered] = useState(false);
  const enter = useCallback(() => setEntered(true), []);
  const exit = useCallback(() => setEntered(false), []);

  return (
    <MotionConfig reducedMotion="user">
      {entered ? (
        <GameExperience zones={zones} onExit={exit} />
      ) : (
        <PressStart
          name={name}
          role={role}
          hook={hook}
          summary={summary}
          location={location}
          onEnter={enter}
        />
      )}
    </MotionConfig>
  );
}

function GameLoading() {
  const t = useTranslations('PressStart');
  return (
    <div data-testid="game-loading" className="bg-bg fixed inset-0 grid place-items-center">
      <p className="text-muted animate-pulse font-mono text-sm tracking-[0.3em] uppercase">
        {t('loading')}
      </p>
    </div>
  );
}
