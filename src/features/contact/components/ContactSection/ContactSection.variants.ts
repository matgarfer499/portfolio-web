import { cva } from 'class-variance-authority';

export const contactSectionVariants = {
  root: cva('border-t-[3px] border-ink'),
  // Two columns on desktop: how to reach him (headline, email, links) and the form beside it.
  layout: cva(
    'grid grid-cols-1 items-start gap-12 stack:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] stack:gap-16',
  ),
  reach: cva('flex flex-col gap-8'),
  label: cva('mb-3'),
  social: cva('grid max-w-[32rem] grid-cols-3 gap-2.5'),
  // --mx/--my come from Magnetic (pointer: fine only); transform composes with the hover lift.
  link: cva('[transform:translate(var(--mx,0),var(--my,0))]'),
};
