import { MoonIcon, SunIcon, IconProvider } from '@shared/icons';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <IconProvider>
      <button
        onClick={toggle}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="text-fg-muted hover:bg-surface hover:text-fg focus-visible:outline-accent relative flex h-9 w-9 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-colors motion-safe:duration-[120ms]"
      >
        <span
          aria-hidden="true"
          className={`absolute motion-safe:transition-opacity motion-safe:duration-[120ms] ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
        >
          <SunIcon />
        </span>
        <span
          aria-hidden="true"
          className={`absolute motion-safe:transition-opacity motion-safe:duration-[120ms] ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
        >
          <MoonIcon />
        </span>
      </button>
    </IconProvider>
  );
}
