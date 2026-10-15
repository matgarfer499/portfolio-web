import { cva } from 'class-variance-authority';

export const skipLinkVariants = cva(
  'fixed top-2 left-2 z-50 -translate-y-[200%] bg-volt px-4 py-3 font-bold text-on-volt focus-visible:translate-y-0 print:hidden',
);
