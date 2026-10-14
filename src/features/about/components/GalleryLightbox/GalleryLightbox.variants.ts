import { cva } from 'class-variance-authority';

export const galleryLightboxVariants = {
  gallery: cva('grid grid-cols-2 gap-3 stack:grid-cols-3 stack:gap-4'),
  // A modal <dialog>: focus trap, Esc, inert page; html:has(dialog[open]) locks the scroll.
  dialog: cva(
    'surface-night fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none flex-col gap-4 bg-night p-4 text-night-ink backdrop:bg-transparent open:flex stack:p-8',
  ),
  bar: cva(
    'flex items-center justify-between text-[0.875rem] font-bold tracking-[0.08em] uppercase',
  ),
  figure: cva('m-0 flex min-h-0 flex-1 flex-col items-center justify-center gap-3'),
  image: cva('min-h-0 w-auto max-w-full flex-1 object-contain'),
  caption: cva('text-center font-bold'),
  nav: cva('flex justify-center gap-3'),
};
