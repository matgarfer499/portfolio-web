import { cva } from 'class-variance-authority';

// Below `stack` the grid has two columns: the last photo (the wide code shot) spans both.
export const galleryPhotoVariants = {
  root: cva('group/photo relative m-0 border-[3px] border-ink bg-ink max-stack:last:col-span-2', {
    variants: { tall: { true: 'row-span-2', false: '' } },
  }),
  link: cva('block h-full overflow-hidden'),
  // --px/--py come from the gallery island (pointer: fine only); --depth varies per photo.
  image: cva(
    'block w-full [translate:calc(var(--px,0)*var(--depth))_calc(var(--py,0)*var(--depth))] transition-[translate,scale] duration-(--dur-base) ease-pr-out in-data-parallax:scale-[1.04]',
    {
      variants: {
        tall: { true: 'h-full', false: 'aspect-square max-stack:group-last/photo:aspect-[2/1]' },
        contain: { true: 'bg-paper object-contain', false: 'object-cover' },
      },
    },
  ),
  stamp: cva(
    'pointer-events-none absolute -bottom-[3px] -left-[3px] max-w-[92%] origin-bottom-left -rotate-2 border-[3px] border-ink bg-volt px-2.5 py-1.5 text-[0.75rem] leading-[1.2] font-extrabold tracking-[0.06em] text-on-volt uppercase surface-volt',
  ),
};
