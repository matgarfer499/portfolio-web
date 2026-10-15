import { cva } from 'class-variance-authority';

export const contactSectionVariants = {
  root: cva('border-t-[3px] border-ink'),
  // Two columns on desktop: how to reach him and the form. Both stretch to the same height, so the
  // links row (pushed down) lines up with the form's send button.
  layout: cva(
    'grid grid-cols-1 gap-12 stack:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] stack:items-stretch stack:gap-16',
  ),
  reach: cva('flex flex-col gap-8'),
  social: cva('grid max-w-[44rem] grid-cols-2 gap-2.5 stack:mt-auto @min-[30rem]:grid-cols-4'),
  // --mx/--my come from Magnetic (pointer: fine only); transform composes with the hover lift.
  link: cva('[transform:translate(var(--mx,0),var(--my,0))]'),
};
