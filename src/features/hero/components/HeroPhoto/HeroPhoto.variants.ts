import { cva } from 'class-variance-authority';

export const heroPhotoVariants = {
  root: cva(
    'relative m-0 -mx-4 min-h-[23.75rem] overflow-hidden bg-night stack:mx-0 stack:min-h-[31.25rem]',
  ),
  image: cva('object-cover [filter:grayscale(.35)_contrast(1.1)]'),
  caption: cva(
    'absolute right-0 bottom-0 z-[4] border-t-2 border-l-2 border-ink bg-paper px-3.5 py-2.5 text-[0.8125rem] font-bold tracking-[0.1em] text-ink uppercase',
  ),
};
