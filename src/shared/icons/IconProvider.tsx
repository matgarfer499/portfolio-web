import { IconContext } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

type Props = {
  readonly children: ReactNode;
};

export function IconProvider({ children }: Props) {
  return (
    <IconContext.Provider value={{ weight: 'light', size: 18 }}>{children}</IconContext.Provider>
  );
}
