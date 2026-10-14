import { ViewTransition, type ReactNode } from 'react';

// Page content slides with the link's direction (nav-forward / nav-back); untyped navigations
// (hash links, the language switch, the first load) do not animate. CSS in globals.css.
export function PageTransition({ children }: { children: ReactNode }) {
  const slide = { 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' };
  return (
    <ViewTransition enter={slide} exit={slide} default="none">
      {children}
    </ViewTransition>
  );
}
