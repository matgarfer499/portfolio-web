import { startsBelowFold } from './reveal';

// DOM reads shared by the motion islands. Call them inside effects only.

// Where a deep link (/#log) will land, even before the browser has scrolled there.
export function landingOffset(): number {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return (id && document.getElementById(id)?.getBoundingClientRect().top) || 0;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isBelowFold(el: Element, landing: number = landingOffset()): boolean {
  const top = el.getBoundingClientRect().top;
  return startsBelowFold({ top, landing, innerHeight: window.innerHeight });
}
