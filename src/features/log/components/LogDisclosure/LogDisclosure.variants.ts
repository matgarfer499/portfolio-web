import { cva } from 'class-variance-authority';

// `contents` keeps the list and chips as cells of the row grid; collapsing only applies below stack.
export const logDisclosureVariants = {
  toggle: cva('stack:hidden'),
  details: cva('contents max-stack:data-collapsed:hidden'),
  chevron: cva('transition-transform duration-(--dur-fast) in-aria-expanded:rotate-180'),
};
