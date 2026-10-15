'use client';

import { useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { Container } from '@shared/components/atoms/Container/Container';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { SECTIONS, type SectionId } from '../../model';
import { mobileMenuVariants as styles } from './MobileMenu.variants';

// A modal <dialog> gives the focus trap, Esc, an inert page and focus return for free.
interface MobileMenuProps {
  locale: Locale;
  labels: Record<SectionId, string>;
  text: { open: string; close: string; nav: string };
}

export function MobileMenu({ locale, labels, text }: MobileMenuProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        className={styles.trigger()}
        aria-label={text.open}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        <Icon name="menu" size="lg" strokeWidth={2.2} />
      </button>
      <dialog
        id="mobile-menu"
        ref={dialog}
        aria-label={text.nav}
        className={styles.dialog()}
        onClose={() => setOpen(false)}
      >
        <Container className={styles.top()}>
          <span aria-hidden>MG</span>
          <button type="button" className={styles.close()} aria-label={text.close} onClick={close}>
            <Icon name="close" size="lg" strokeWidth={2.2} />
          </button>
        </Container>
        <Container className={styles.links()}>
          <nav aria-label={text.nav} className={styles.nav()}>
            {SECTIONS.map((id, i) => (
              <Link
                key={id}
                href={localizedPath(locale, `/#${id}`)}
                className={styles.link()}
                style={{ '--i': i } as CSSProperties}
                onClick={close}
              >
                {labels[id]}
              </Link>
            ))}
          </nav>
        </Container>
      </dialog>
    </>
  );
}
