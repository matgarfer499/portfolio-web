'use client';

import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { emitTrophy } from '@shared/events/trophy-bus';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { applyTheme, isTheme, type Theme } from '@shared/lib/theme';
import { themeToggleVariants as styles } from './ThemeToggle.variants';

// data-theme on <html> is the source of truth (set before paint, or live by the OS listener).
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => {
  const value = document.documentElement.getAttribute('data-theme');
  return isTheme(value) ? value : 'light';
};

export function ThemeToggle() {
  const t = useTranslations('Shell');
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light' as const);
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      aria-pressed={dark}
      aria-label={t('darkTheme')}
      className={styles.root()}
      onClick={() => {
        applyTheme(dark ? 'light' : 'dark');
        emitTrophy('theme-switched');
      }}
    >
      <Icon name={dark ? 'sun' : 'moon'} size="md" strokeWidth={2.2} />
    </button>
  );
}
