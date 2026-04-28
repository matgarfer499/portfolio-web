import { useState, useEffect } from 'react';
import { THEME_STORAGE_KEY, type ThemeMode } from '../lib/themeScript';

function getInitialTheme(): ThemeMode {
  // SSR guard — document is not available on the server
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function useTheme(): { theme: ThemeMode; toggle: () => void } {
  // Lazy initializer reads the DOM once; SSR-safe via getInitialTheme
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    // Listen to OS changes only while no explicit choice is stored
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_STORAGE_KEY) === null) {
        const newTheme: ThemeMode = e.matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', e.matches);
        setTheme(newTheme);
      }
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const toggle = () => {
    const newTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setTheme(newTheme);
  };

  return { theme, toggle };
}
