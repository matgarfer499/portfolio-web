import { cva } from 'class-variance-authority';

// Capped at 85rem; the rem steps in globals.css scale it on big screens. @container feeds cqi.
export const containerVariants = cva('@container mx-auto w-full max-w-[85rem] px-4 stack:px-8');
