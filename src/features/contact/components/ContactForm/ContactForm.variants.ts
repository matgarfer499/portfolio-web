import { cva } from 'class-variance-authority';

export const contactFormVariants = {
  root: cva('mt-16 flex max-w-[40rem] flex-col gap-5'),
  field: cva('flex flex-col gap-2'),
  label: cva('text-[0.8125rem] font-extrabold tracking-[0.08em] uppercase'),
  input: cva(
    'w-full rounded-[2px] border-[3px] border-ink bg-paper px-3 py-2.5 text-[1rem] text-ink aria-invalid:border-dashed',
    { variants: { multiline: { true: 'min-h-36 resize-y', false: 'min-h-11' } } },
  ),
  error: cva('m-0 text-[0.9375rem] font-bold'),
  // Off-screen, not display:none: some bots skip hidden inputs.
  trap: cva('absolute -left-[625rem] size-px overflow-hidden'),
  status: cva('m-0 border-[3px] border-ink bg-paper px-4 py-3 font-bold text-ink'),
  mail: cva('mt-2 block w-fit font-extrabold text-ink underline underline-offset-4'),
  actions: cva('flex flex-wrap items-center gap-4'),
};
