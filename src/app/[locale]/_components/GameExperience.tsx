'use client';

import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense, useEffect } from 'react';
import {
  ACHIEVEMENT_TOTAL,
  AchievementToast,
  selectUnlockedCount,
  useAchievementsStore,
} from '@features/achievements';
import { Avatar, controlsMap } from '@features/avatar';
import { Hud } from '@features/hud';
import { Scene, useWorldStore } from '@features/world';
import type { LocalizedZone } from './HomeExperience';

interface GameExperienceProps {
  readonly zones: LocalizedZone[];
  readonly onExit: () => void;
}

/**
 * The composition root for the game. Features are wired together *here* (in the app layer)
 * so none of them has to import another: the world reports the active zone, and this layer
 * turns that into an unlocked achievement.
 */
export function GameExperience({ zones, onExit }: GameExperienceProps) {
  const activeZoneId = useWorldStore((state) => state.activeZoneId);
  const resetWorld = useWorldStore((state) => state.reset);
  const unlock = useAchievementsStore((state) => state.unlock);
  const unlockedCount = useAchievementsStore(selectUnlockedCount);

  useEffect(() => {
    resetWorld();
    return () => resetWorld();
  }, [resetWorld]);

  useEffect(() => {
    if (activeZoneId) {
      unlock('first-contact');
    }
  }, [activeZoneId, unlock]);

  const activeZone = zones.find((zone) => zone.id === activeZoneId) ?? null;

  return (
    <div data-testid="game-canvas" className="bg-bg fixed inset-0">
      <KeyboardControls map={controlsMap}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 9, 18], fov: 50 }}>
          <color attach="background" args={['#0e3a63']} />
          <fog attach="fog" args={['#123049', 40, 95]} />
          <Suspense fallback={null}>
            <Physics>
              <Scene />
              <Avatar />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>

      <Hud
        achievementCount={unlockedCount}
        achievementTotal={ACHIEVEMENT_TOTAL}
        zone={activeZone}
        onExit={onExit}
      />
      <AchievementToast />
    </div>
  );
}
