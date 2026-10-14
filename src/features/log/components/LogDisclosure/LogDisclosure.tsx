'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '@shared/components/atoms/Button/Button';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { shouldCollapse } from '../../model';
import { logDisclosureVariants as styles } from './LogDisclosure.variants';

const NARROW = '(width < 51.25rem)';

// The server shows every detail. On phones, while the log is still below the fold, the details
// fold behind a button so the list reads as a timeline; already in view, nothing changes.
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
    // A deep link (/#log, /#contact) may not have scrolled yet: measure from where it will land.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const landing = hash ? document.getElementById(hash) : null;
    const collapse = shouldCollapse({
      narrow: window.matchMedia(NARROW).matches,
      listTop: list.getBoundingClientRect().top - (landing?.getBoundingClientRect().top ?? 0),
      innerHeight: window.innerHeight,
    });
    if (collapse) setOpen(false);
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
