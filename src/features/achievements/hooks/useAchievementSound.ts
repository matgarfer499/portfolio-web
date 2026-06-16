'use client';

import { Howl } from 'howler';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Lazily loads the achievement chime and returns a stable `play` callback.
 * The sound only ever plays after the visitor has clicked "Enter", so autoplay
 * policies are already satisfied.
 */
export function useAchievementSound(): () => void {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({ src: ['/sfx/achievement.wav'], volume: 0.45, preload: true });
    return () => {
      soundRef.current?.unload();
      soundRef.current = null;
    };
  }, []);

  return useCallback(() => {
    soundRef.current?.play();
  }, []);
}
