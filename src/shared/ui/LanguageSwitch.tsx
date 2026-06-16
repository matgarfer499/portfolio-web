'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '../lib/cn';

const LABELS: Record<string, string> = { en: 'EN', es: 'ES' };

/** A pill toggle that switches locale while preserving the current path. */
export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'inline-flex overflow-hidden rounded-full border border-white/15 bg-white/5 font-mono text-xs',
        className,
      )}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          aria-pressed={loc === locale}
          disabled={pending}
          onClick={() => startTransition(() => router.replace(pathname, { locale: loc }))}
          className={cn(
            'px-3 py-1.5 transition-colors disabled:opacity-60',
            loc === locale ? 'bg-flame text-bg' : 'text-muted hover:text-ink',
          )}
        >
          {LABELS[loc] ?? loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
