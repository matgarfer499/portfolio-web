'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Button } from '@shared/components/atoms/Button/Button';
import { emitTrophy } from '@shared/events/trophy-bus';
import { copyEmailVariants as styles } from './CopyEmail.variants';

type Outcome = 'copy' | 'copied' | 'selected';
// Fanned out of the top-right corner, away from the button (0deg points up).
const RAYS = [0, 22.5, 45, 67.5, 90];

// The address is a mailto link (works without JS); the button copies it, or selects it when the
// clipboard is refused, and says so in a live region.
export function CopyEmail({ email, labels }: { email: string; labels: Record<Outcome, string> }) {
  const address = useRef<HTMLAnchorElement>(null);
  const [outcome, setOutcome] = useState<Outcome>('copy');
  const [bursts, setBursts] = useState(0);

  useEffect(() => {
    if (outcome === 'copy') return;
    const timer = setTimeout(() => setOutcome('copy'), 1800);
    return () => clearTimeout(timer);
  }, [outcome, bursts]);

  const select = () => {
    const el = address.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    setOutcome('selected');
  };

  const copy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setOutcome('copied');
      setBursts((n) => n + 1);
      emitTrophy('email-copied');
    }, select);
  };

  return (
    <div className={styles.root()}>
      <a ref={address} href={`mailto:${email}`} className={styles.address()}>
        {email}
      </a>
      <Button variant="dark" onClick={copy} className={styles.button()}>
        {labels[outcome]}
        {bursts > 0 ? (
          <span key={bursts} aria-hidden className={styles.burst()}>
            {RAYS.map((angle) => (
              <span
                key={angle}
                className={styles.ray()}
                style={{ '--a': `${angle}deg` } as CSSProperties}
              />
            ))}
          </span>
        ) : null}
      </Button>
      <span role="status" className="sr-only">
        {outcome === 'copy' ? '' : labels[outcome]}
      </span>
    </div>
  );
}
