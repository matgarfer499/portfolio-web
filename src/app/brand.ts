import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Token mirrors for places without CSS variables (theme-color, manifest, next/og images).
// Keep in sync with globals.css; contrast is proven there.
export const BRAND = {
  paper: '#ffffff',
  ink: '#111111',
  volt: '#d4ff1f',
  steel: '#555a50',
  darkPaper: '#0e0f0c',
} as const;

// next/og needs TTF/OTF/WOFF (next/font ships woff2), so the two faces live in assets/fonts (OFL).
export async function ogFonts() {
  const [anton, interTight] = await Promise.all(
    ['Anton-Regular.ttf', 'InterTight-Bold.ttf'].map((file) =>
      readFile(join(process.cwd(), 'assets/fonts', file)),
    ),
  );
  return [
    { name: 'Anton', data: anton!, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter Tight', data: interTight!, weight: 700 as const, style: 'normal' as const },
  ];
}
