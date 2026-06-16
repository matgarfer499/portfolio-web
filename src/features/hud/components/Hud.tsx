'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitch } from '@shared/ui';

interface HudZone {
  readonly name: string;
  readonly heading: string;
  readonly body: string;
}

interface HudProps {
  readonly achievementCount: number;
  readonly achievementTotal: number;
  /** The content panel to surface, or `null` when the avatar is not in a zone. */
  readonly zone: HudZone | null;
  readonly onExit: () => void;
}

const chipClass =
  'rounded-full border border-white/10 bg-bg/60 px-3 py-1.5 font-mono text-xs backdrop-blur-sm';

/** The in-game overlay. Pure presentation — all state arrives via props from the app layer. */
export function Hud({ achievementCount, achievementTotal, zone, onExit }: HudProps) {
  const t = useTranslations('Hud');

  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none">
      <div className="flex items-start justify-between p-4">
        <div className="bg-bg/60 rounded-xl border border-white/10 px-3 py-2 backdrop-blur-sm">
          <p className="text-flame font-mono text-[0.6rem] tracking-[0.2em] uppercase">
            matiasgarcia.dev
          </p>
          <p className="text-muted text-sm">
            {t('zone')}: {zone ? <span className="text-ink">{zone.name}</span> : '—'}
          </p>
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
          <span className={`${chipClass} text-ink`} aria-label={t('achievements')}>
            ★ {achievementCount}/{achievementTotal}
          </span>
          <LanguageSwitch />
          <Link href="/fast" className={`${chipClass} text-muted hover:text-ink transition-colors`}>
            {t('fastVersion')}
          </Link>
          <button
            type="button"
            onClick={onExit}
            className={`${chipClass} text-muted hover:text-ink pointer-events-auto transition-colors`}
          >
            {t('exit')}
          </button>
        </div>
      </div>

      <div className="bg-bg/60 absolute bottom-4 left-4 rounded-xl border border-white/10 px-3 py-2 backdrop-blur-sm">
        <p className="text-muted font-mono text-[0.6rem] tracking-[0.18em] uppercase">
          {t('controlsTitle')}
        </p>
        <p className="text-ink text-sm">{t('controlsKeys')}</p>
      </div>

      <AnimatePresence>
        {zone && (
          <motion.aside
            key={zone.heading}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="bg-surface/80 absolute bottom-4 left-1/2 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 p-5 backdrop-blur-md"
          >
            <p className="text-azure font-mono text-[0.6rem] tracking-[0.2em] uppercase">
              {zone.name}
            </p>
            <h2 className="text-ink mt-1 text-lg font-semibold">{zone.heading}</h2>
            <p className="text-muted mt-2 text-sm leading-relaxed">{zone.body}</p>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
