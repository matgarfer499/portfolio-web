'use client';

import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitch } from '@shared/ui';

interface PressStartProps {
  readonly name: string;
  readonly role: string;
  readonly hook: string;
  readonly summary: string;
  readonly location: string;
  readonly onEnter: () => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: 'easeOut', delay: i * 0.07 },
  }),
};

/**
 * The entry screen. Real content is rendered server-side (so crawlers index it), with
 * two doors: "Enter game" mounts the 3D layer; "Fast version" routes to the SSG layer.
 */
export function PressStart({ name, role, hook, summary, location, onEnter }: PressStartProps) {
  const t = useTranslations('PressStart');

  return (
    <main
      data-testid="press-start"
      className="bg-bg relative flex min-h-dvh flex-col overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-flame/10 absolute top-0 -left-1/4 size-[60vmax] rounded-full blur-3xl" />
        <div className="bg-azure/10 absolute -right-1/4 bottom-0 size-[55vmax] rounded-full blur-3xl" />
      </div>

      <header className="relative flex items-center justify-between p-5">
        <span className="text-muted font-mono text-xs tracking-[0.25em] uppercase">
          {t('tagline')}
        </span>
        <LanguageSwitch />
      </header>

      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-5 px-5 pb-16">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-azure font-mono text-sm tracking-[0.2em] uppercase"
        >
          {role} · {location}
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-ink text-5xl leading-[1.05] font-bold text-balance sm:text-7xl"
        >
          {name}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-ink/90 max-w-2xl text-xl text-pretty"
        >
          {hook}
        </motion.p>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-muted max-w-2xl text-base text-pretty"
        >
          {summary}
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-2 flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            data-testid="enter-game"
            onClick={onEnter}
            className="group bg-flame text-bg inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform hover:-translate-y-0.5"
          >
            <span className="bg-bg/70 size-2 rounded-full motion-safe:animate-pulse" aria-hidden />
            {t('enter')}
          </button>
          <Link
            href="/fast"
            data-testid="fast-link"
            className="text-ink hover:border-azure hover:text-azure rounded-full border border-white/15 px-6 py-3 font-semibold transition-colors"
          >
            {t('fast')}
          </Link>
        </motion.div>

        <motion.p
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-muted font-mono text-xs"
        >
          {t('hint')}
        </motion.p>
      </div>
    </main>
  );
}
