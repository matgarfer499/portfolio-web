'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { getAchievement, type AchievementId } from '../catalog';
import { useAchievementSound } from '../hooks/useAchievementSound';
import { useAchievementsStore } from '../store';

const TOAST_TTL_MS = 4500;

/**
 * Renders the live queue of unlocked achievements as glass toasts (the one allowed
 * glass surface in the design system). Plays a chime when each toast appears.
 */
export function AchievementToast() {
  const queue = useAchievementsStore((state) => state.toastQueue);

  return (
    <div
      className="pointer-events-none fixed top-4 right-4 z-50 flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-3"
      aria-live="polite"
    >
      <AnimatePresence>
        {queue.map((id) => (
          <ToastItem key={id} id={id} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ id }: { id: AchievementId }) {
  const t = useTranslations('Achievements');
  const dismiss = useAchievementsStore((state) => state.dismissToast);
  const play = useAchievementSound();
  const achievement = getAchievement(id);

  useEffect(() => {
    play();
    const timer = setTimeout(() => dismiss(id), TOAST_TTL_MS);
    return () => clearTimeout(timer);
  }, [id, dismiss, play]);

  return (
    <motion.div
      layout
      role="status"
      initial={{ opacity: 0, x: 32, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 32, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white shadow-xl backdrop-blur-md"
    >
      <span
        className="bg-flame/20 grid size-10 shrink-0 place-items-center rounded-xl text-xl"
        aria-hidden
      >
        {achievement.icon}
      </span>
      <div className="min-w-0">
        <p className="text-flame font-mono text-[0.65rem] tracking-[0.18em] uppercase">
          {t('unlocked')}
        </p>
        <p className="truncate font-semibold">{t(`${achievement.messageKey}.title`)}</p>
        <p className="truncate text-sm text-white/70">
          {t(`${achievement.messageKey}.description`)}
        </p>
      </div>
    </motion.div>
  );
}
