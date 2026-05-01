import { ArrowRightIcon, DownloadSimpleIcon } from '@phosphor-icons/react';
import { IconProvider } from '@shared/icons';
import { cn } from '@shared/lib';

const ctaBase =
  'inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border px-6 text-base font-mono tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const ctaPrimary = cn(
  ctaBase,
  'border-transparent bg-accent text-accent-fg font-medium',
  'hover:opacity-90 motion-safe:transition-opacity motion-safe:duration-[120ms]',
);

const ctaSecondary = cn(
  ctaBase,
  'border-border bg-surface text-fg',
  'hover:bg-neutral-200 dark:hover:bg-neutral-800 motion-safe:transition-colors motion-safe:duration-[150ms]',
);

export function HeroCTAs() {
  return (
    <IconProvider>
      <div
        className="motion-safe:animate-fade-up mt-8 flex w-full flex-col gap-3 sm:flex-row"
        style={{ animationDelay: '320ms' }}
      >
        <a href="#projects" className={cn(ctaPrimary, 'w-full sm:w-auto')}>
          View work
          <ArrowRightIcon />
        </a>
        <a
          href="/cv.pdf"
          download="Matias-Garcia-CV.pdf"
          className={cn(ctaSecondary, 'w-full sm:w-auto')}
        >
          <DownloadSimpleIcon />
          Download CV
        </a>
      </div>
    </IconProvider>
  );
}
