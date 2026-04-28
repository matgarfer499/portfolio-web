export const THEME_STORAGE_KEY = 'theme';

export type ThemeMode = 'light' | 'dark';

export const THEME_INIT_SCRIPT = `(function(){
  var stored = localStorage.getItem('theme');
  var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = stored ? stored === 'dark' : sysDark;
  if (isDark) document.documentElement.classList.add('dark');
})();`;
