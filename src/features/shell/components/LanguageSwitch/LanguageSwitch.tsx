'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { switchLocalePath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { emitTrophy } from '@shared/events/trophy-bus';
import { languageSwitchVariants } from './LanguageSwitch.variants';

export function LanguageSwitch({ to, label }: { to: Locale; label: string }) {
  const pathname = usePathname();
  return (
    <Link
      href={switchLocalePath(pathname, to)}
      hrefLang={to}
      aria-label={label}
      className={languageSwitchVariants()}
      onClick={() => emitTrophy('language-switched')}
    >
      {to.toUpperCase()}
    </Link>
  );
}
