import { cva } from 'class-variance-authority';

export const pendingRecordCardVariants = {
  root: cva(
    'flex flex-col justify-center gap-3.5 border-[3px] border-dashed border-volt bg-night px-6 py-6',
  ),
  note: cva('m-0 text-[0.9375rem] leading-[1.45] text-night-ink'),
};
