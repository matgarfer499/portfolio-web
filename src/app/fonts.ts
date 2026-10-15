import { Anton, Inter_Tight } from 'next/font/google';

// Downloaded at build time and self-hosted: no request to Google at runtime.
export const anton = Anton({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-anton',
});

export const interTight = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter-tight',
});
