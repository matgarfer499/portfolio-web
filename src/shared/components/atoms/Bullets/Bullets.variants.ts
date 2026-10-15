import { cva } from 'class-variance-authority';

// The artifact's list: volt squares with an ink border as markers.
export const bulletsVariants = {
  list: cva('m-0 grid list-none gap-2 p-0'),
  item: cva(
    'relative pl-[1.375rem] text-ink-soft before:absolute before:top-[0.55em] before:left-0 before:size-2.5 before:border-2 before:border-ink before:bg-volt',
  ),
};
