import { cva } from 'class-variance-authority';

export const contactFormVariants = {
  // Name and email share a row from 30rem up; the message and the rest span both columns.
  root: cva('grid grid-cols-1 gap-4 stack:grid-rows-[auto_auto_auto_1fr] @min-[30rem]:grid-cols-2'),
  full: cva('col-span-full'),
  field: cva('flex flex-col gap-2', {
    variants: { wide: { true: 'col-span-full', false: '' } },
  }),
  label: cva('text-[0.8125rem] font-extrabold tracking-[0.08em] uppercase'),
  input: cva(
    'w-full rounded-[2px] border-[3px] border-ink bg-paper px-3 py-2.5 text-[1rem] text-ink aria-invalid:border-dashed',
    { variants: { multiline: { true: 'min-h-28 resize-y', false: 'min-h-11' } } },
  ),
  error: cva('m-0 text-[0.9375rem] font-bold'),
  // Off-screen, not display:none: some bots skip hidden inputs.
  trap: cva('absolute -left-[625rem] size-px overflow-hidden'),
  status: cva('m-0 border-[3px] border-ink bg-paper px-4 py-3 font-bold text-ink'),
  mail: cva('mt-2 block w-fit font-extrabold text-ink underline underline-offset-4'),
  actions: cva('flex flex-wrap items-center gap-4'),
  // Send row + live regions, at the bottom of the form. An empty live region stays mounted (so it
  // announces) but is taken out of the flow, so it adds no gap under the button.
  end: cva('col-span-full flex flex-col gap-4 self-end'),
  live: cva('empty:absolute'),
};
