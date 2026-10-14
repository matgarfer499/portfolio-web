import { cva } from 'class-variance-authority';

export const scrollProgressVariants = cva(
  'absolute inset-x-0 -bottom-[2px] h-[3px] origin-left [transform:scaleX(0)] bg-volt',
);
