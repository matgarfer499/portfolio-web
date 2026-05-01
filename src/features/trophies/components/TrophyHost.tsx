import { useState, useEffect, useCallback } from 'react';
import { TROPHIES, type Trophy, type TrophyId } from '../data/trophies';
import { getUnlockedTrophies, persistTrophy } from '../lib/trophyStorage';
import { initWindowUnlock, cleanupWindowUnlock } from '../lib/consoleSignature';
import { useScrollAllSections } from '../triggers/useScrollAllSections';
import { useThemeToggleListener } from '../triggers/useThemeToggleListener';
import { useCvVisitListener } from '../triggers/useCvVisitListener';
import { TrophyToast } from './TrophyToast';

type ToastState = { visible: Trophy | null; queue: Trophy[] };

function advance(prev: ToastState): ToastState {
  const [next = null, ...rest] = prev.queue;
  return { visible: next, queue: rest };
}

export function TrophyHost() {
  const [unlocked] = useState<Set<TrophyId>>(() => getUnlockedTrophies() as Set<TrophyId>);
  const [{ visible }, setState] = useState<ToastState>({ visible: null, queue: [] });

  const unlock = useCallback(
    (id: TrophyId) => {
      if (unlocked.has(id)) return;
      unlocked.add(id);
      persistTrophy(id);
      const trophy = TROPHIES.find((t) => t.id === id);
      if (!trophy) return;
      setState((prev) => ({
        visible: prev.visible ?? trophy,
        queue: prev.visible !== null ? [...prev.queue, trophy] : prev.queue,
      }));
    },
    [unlocked],
  );

  // Wire window.matias for the console-denizen trophy
  useEffect(() => {
    initWindowUnlock(() => unlock('console-denizen'));
    return cleanupWindowUnlock;
  }, [unlock]);

  // Auto-dismiss after 4s, then show next in queue
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setState(advance), 4000);
    return () => clearTimeout(timer);
  }, [visible]);

  // Triggers
  useScrollAllSections(unlock);
  useThemeToggleListener(unlock);
  useCvVisitListener(unlock);

  if (!visible) return null;
  return <TrophyToast trophy={visible} onDismiss={() => setState(advance)} />;
}
