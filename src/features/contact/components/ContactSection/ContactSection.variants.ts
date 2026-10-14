import { cva } from 'class-variance-authority';

export const contactSectionVariants = {
  root: cva('border-t-[3px] border-ink'),
  row: cva(
    'mt-10 grid grid-cols-1 items-end gap-10 stack:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]',
  ),
  label: cva('mb-3'),
  social: cva('grid grid-cols-3 gap-2.5'),
  // --mx/--my come from Magnetic (pointer: fine only); transform composes with the hover lift.
  link: cva('[transform:translate(var(--mx,0),var(--my,0))]'),
};
