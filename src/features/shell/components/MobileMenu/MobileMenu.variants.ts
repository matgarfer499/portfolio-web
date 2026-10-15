import { cva } from 'class-variance-authority';

export const mobileMenuVariants = {
  trigger: cva(
    'inline-flex size-11 items-center justify-center rounded-[2px] border-2 border-ink bg-paper text-ink board:hidden',
  ),
  close: cva(
    'inline-flex size-11 items-center justify-center rounded-[2px] border-2 border-ink bg-paper text-ink',
  ),
  dialog: cva(
    'fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none flex-col overflow-y-auto bg-paper p-0 text-ink backdrop:bg-transparent open:flex',
  ),
  top: cva('flex h-16 items-center justify-between border-b-2 border-ink'),
  // Same mark as the header's, so opening the menu doesn't change the logo.
  mark: cva(
    'inline-flex size-11 shrink-0 items-center justify-center bg-night font-display text-[1.375rem] leading-none text-volt',
  ),
  links: cva('flex flex-1 flex-col justify-center py-8'),
  nav: cva('flex flex-col gap-2'),
  link: cva(
    'block font-display text-[clamp(2.75rem,13vw,6rem)] leading-[0.95] text-ink uppercase no-underline hover:text-steel focus-visible:text-steel motion-safe:animate-[menu-rise_var(--dur-reveal)_var(--ease-out-soft)_both] motion-safe:[animation-delay:calc(var(--i)*60ms)]',
  ),
};
