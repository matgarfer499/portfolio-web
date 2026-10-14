export const THEME_STORAGE_KEY = 'pr-theme';
export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

export function isTheme(value: unknown): value is Theme {
  return (THEMES as readonly unknown[]).includes(value);
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice lasts for this page only.
  }
}

// Runs inline before first paint (no flash). With no stored choice it tracks the OS setting live;
// it re-reads storage on each change so a toggle made meanwhile wins.
export const themeScript = `(function(){var k=${JSON.stringify(THEME_STORAGE_KEY)};function s(){try{var v=localStorage.getItem(k);return v==='light'||v==='dark'?v:null}catch(e){return null}}var q=matchMedia('(prefers-color-scheme: dark)');function a(d){var v=s();document.documentElement.setAttribute('data-theme',v||(d?'dark':'light'))}a(q.matches);q.addEventListener('change',function(e){if(!s())a(e.matches)})})();`;
