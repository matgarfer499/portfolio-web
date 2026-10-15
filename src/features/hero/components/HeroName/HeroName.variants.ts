import { cva } from 'class-variance-authority';

// Letters rise out of a clip that only cuts below the baseline, so accents (Í) are never cut.
export const heroNameVariants = {
  // The em top margin clears the accent on Í above the meta row.
  root: cva('mt-[0.32em] whitespace-nowrap'),
  word: cva('block stack:inline-block'),
  clip: cva('inline-block [clip-path:inset(-50%_-10%_-6%_-10%)]'),
  letter: cva(
    'inline-block motion-safe:animate-[letter-rise_var(--dur-reveal)_var(--ease-out-soft)_both] motion-safe:[animation-delay:calc(var(--i)*40ms)]',
  ),
};
