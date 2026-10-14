'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n/routing';
import { formatClock, msToNextMinute } from '../../model';

// The server renders the timezone name; the live time replaces it after hydration.
// `template` is the translated line with a literal {time} slot.
export function FooterClock({
  locale,
  template,
  fallback,
}: {
  locale: Locale;
  template: string;
  fallback: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const now = new Date();
      setTime(formatClock(now, locale));
      timer = setTimeout(tick, msToNextMinute(now));
    };
    tick();
    return () => clearTimeout(timer);
  }, [locale]);

  return <span>{time ? template.replace('{time}', time) : fallback}</span>;
}
