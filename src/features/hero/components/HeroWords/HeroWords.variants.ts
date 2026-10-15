import { cva } from 'class-variance-authority';

// Three equal rows that stretch to the intro's height; the type scales with the block (cqi), so
// the longest word in either language ("Construyo") still fits beside its proof.
export const heroWordsVariants = {
  root: cva(
    '@container m-0 -mx-4 grid list-none grid-rows-3 border-y-2 border-ink p-0 stack:mx-0 stack:min-h-0 stack:border-y-0 stack:border-l-2',
  ),
  row: cva(
    'group flex min-h-[7.5rem] items-center justify-between gap-4 overflow-hidden px-4 stack:min-h-0 stack:px-8',
    {
      variants: {
        tone: {
          outline: 'border-b-2 border-ink',
          solid: 'border-b-2 border-ink',
          volt: 'bg-volt text-on-volt surface-volt',
        },
      },
    },
  ),
  word: cva(
    'font-display text-[15cqi] leading-[0.8] uppercase transition-transform duration-(--dur-base) ease-pr-out motion-safe:group-hover:translate-x-3 stack:text-[min(15cqi,13svh)]',
    {
      variants: {
        tone: {
          outline: 'text-transparent [-webkit-text-stroke:0.35cqi_var(--ink)]',
          solid: '',
          volt: '',
        },
      },
    },
  ),
  proof: cva(
    'max-w-[11rem] text-right text-[0.75rem] leading-[1.35] font-extrabold tracking-[0.12em] uppercase stack:text-[0.8125rem]',
  ),
};
