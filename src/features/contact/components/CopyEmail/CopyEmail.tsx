'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { emitTrophy } from '@shared/events/trophy-bus';
import { cn } from '@shared/lib/cn';
import { copyEmailVariants as styles } from './CopyEmail.variants';

type Outcome = 'copy' | 'copied' | 'selected';
// Fanned out of the top-right corner, away from the button (0deg points up).
const RAYS = [0, 22.5, 45, 67.5, 90];

// A button beside the other contact links that copies the address; when the clipboard is refused it
// shows the address selected instead. Without JS the noscript mailto link stands in for it.
export function CopyEmail({
  email,
  labels,
  className,
}: {
  email: string;
  labels: Record<Outcome, string>;
  className?: string;
}) {
  const address = useRef<HTMLSpanElement>(null);
  const [outcome, setOutcome] = useState<Outcome>('copy');
  const [bursts, setBursts] = useState(0);

  useEffect(() => {
    if (outcome === 'copy') return;
    const timer = setTimeout(() => setOutcome('copy'), 1800);
    return () => clearTimeout(timer);
  }, [outcome, bursts]);

  // The address only renders once the outcome is "selected"; select it after that render.
  useEffect(() => {
    const el = address.current;
    if (outcome !== 'selected' || !el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, [outcome]);

  const select = () => setOutcome('selected');

  const copy = () => {
    // No clipboard API outside secure contexts (plain http, some webviews): select instead.
    if (!navigator.clipboard) return select();
    navigator.clipboard.writeText(email).then(() => {
      setOutcome('copied');
      setBursts((n) => n + 1);
      emitTrophy('email-copied');
    }, select);
  };

  return (
    <>
      <noscript>
        <a href={`mailto:${email}`} translate="no" className={className}>
          {email}
        </a>
      </noscript>
      <button type="button" onClick={copy} className={cn(className, styles.button())}>
        {outcome === 'selected' ? (
          <span ref={address} translate="no" className={styles.address()}>
            {email}
          </span>
        ) : (
          labels[outcome]
        )}
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
      </button>
      <span role="status" className="sr-only">
        {outcome === 'copy' ? '' : labels[outcome]}
      </span>
    </>
  );
}
