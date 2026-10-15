import { clsx, type ClassValue } from 'clsx';

// clsx only: tailwind-merge cost ~10 kB gz on every page. Caller classes must not fight the
// component's own variants; extend a variant instead (docs/architecture.md § Styles).
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
