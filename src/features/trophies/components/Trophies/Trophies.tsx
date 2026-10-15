'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useStore } from 'zustand';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { emitTrophy, onTrophy } from '@shared/events/trophy-bus';
import { konamiStep, KONAMI, TROPHIES, trophyKey } from '../../model';
import { trophyStore } from '../../store';
import type { ShelfLabels } from '../TrophyShelf/TrophyShelf';
import { trophiesVariants as styles } from './Trophies.variants';

// The shelf is only fetched the first time it opens.
const TrophyShelf = dynamic(() => import('../TrophyShelf/TrophyShelf').then((m) => m.TrophyShelf), {
  ssr: false,
});

export interface TrophiesLabels extends ShelfLabels {
  openShelf: string;
  counter: string;
  unlocked: string;
}

const TOAST_MS = 4200;
const TOTAL = TROPHIES.length;

function isTyping(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  );
}

// Header island: the X/N counter, the toast and the only subscription to the trophy bus.
export function Trophies({ labels }: { labels: TrophiesLabels }) {
  const { items } = labels;
  const { unlocked, latest, dismiss } = useStore(trophyStore);
  const [shelf, setShelf] = useState<'closed' | 'open' | 'loaded'>('closed');
  const counter = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    trophyStore.getState().hydrate();
    const off = onTrophy(trophyStore.getState().unlock);
    let progress = 0;
    const key = (event: KeyboardEvent) => {
      if (event.repeat || isTyping(event.target) || document.querySelector('dialog[open]')) return;
      progress = konamiStep(progress, event.key);
      if (progress < KONAMI.length) return;
      progress = 0;
      emitTrophy('konami');
    };
    window.addEventListener('keydown', key);
    return () => {
      off();
      window.removeEventListener('keydown', key);
    };
  }, []);

  useEffect(() => {
    if (!latest) return;
    // Read, not subscribed: turning sound on mid-toast must not replay it or restart the timer.
    if (trophyStore.getState().sound) {
      const audio = new Audio('/trophy-sound.mp3');
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
    const timer = setTimeout(dismiss, TOAST_MS);
    return () => clearTimeout(timer);
  }, [latest, dismiss]);

  // The toast keeps showing the last trophy while it slides away.
  const [shown, setShown] = useState(latest);
  if (latest && latest !== shown) setShown(latest);
  const item = shown ? items[trophyKey(shown)] : null;
  const count = labels.counter
    .replace('{count}', String(unlocked.length))
    .replace('{total}', String(TOTAL));

  return (
    <>
      <button
        ref={counter}
        type="button"
        aria-label={`${labels.openShelf} (${count})`}
        aria-haspopup="dialog"
        onClick={() => setShelf('open')}
        className={styles.counter()}
      >
        <Icon name="trophy" />
        <span key={unlocked.length} className={styles.count({ pop: latest !== null })}>
          {unlocked.length}/{TOTAL}
        </span>
      </button>
      {shelf !== 'closed' ? (
        <TrophyShelf
          open={shelf === 'open'}
          labels={labels}
          onClose={() => {
            setShelf('loaded');
            counter.current?.focus();
          }}
        />
      ) : null}
      <div role="status" data-open={latest ? '' : undefined} className={styles.toast()}>
        {item ? (
          <>
            <Icon name="trophy" size="xl" />
            <span>
              <span className={styles.toastLabel()}>{labels.unlocked}</span>
              <span className={styles.toastTitle()}>{item.title}</span>
              <span>{item.description}</span>
            </span>
          </>
        ) : null}
      </div>
    </>
  );
}
