'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '@shared/components/atoms/Button/Button';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { isBelowFold } from '@shared/motion/viewport';
import { logDisclosureVariants as styles } from './LogDisclosure.variants';

// The server shows every detail. While the log is still below the fold the details fold behind a
// button so the list reads as a timeline; the fold and the button exist only below `stack` (CSS).
export function LogDisclosure({
  id,
  labels,
  children,
}: {
  id: string;
  labels: { show: string; hide: string };
  children: ReactNode;
}) {
  const details = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const list = details.current?.closest('[data-log]');
    if (!list) return;
    if (isBelowFold(list)) setOpen(false);
  }, []);

  return (
    <>
      {open === null ? null : (
        <div className={styles.toggle()}>
          <Button size="sm" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
            {open ? labels.hide : labels.show}
            <Icon name="chevron-down" className={styles.chevron()} />
          </Button>
        </div>
      )}
      <div
        ref={details}
        id={id}
        data-collapsed={open === false || undefined}
        className={styles.details()}
      >
        {children}
      </div>
    </>
  );
}
