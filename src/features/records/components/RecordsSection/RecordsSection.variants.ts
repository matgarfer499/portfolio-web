import { cva } from 'class-variance-authority';

// The artifact's hairline grid: 2px night-line gaps over a night-line background.
export const recordsSectionVariants = {
  board: cva(
    'grid grid-cols-1 gap-0.5 border-2 border-night-line bg-night-line stack:grid-cols-2 board:grid-cols-4',
  ),
};
