'use client';

import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { Button } from '@shared/components/atoms/Button/Button';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { TROPHIES, type TrophyKey } from '../../model';
import { trophyStore } from '../../store';
import { trophyShelfVariants as styles } from './TrophyShelf.variants';

export interface ShelfLabels {
  shelf: string;
  close: string;
  locked: string;
  sound: string;
  reset: string;
  items: Record<TrophyKey, { title: string; description: string }>;
}

// The native modal dialog traps focus, closes on Esc and makes the page inert.
export function TrophyShelf({
  open,
  labels,
  onClose,
}: {
  open: boolean;
  labels: ShelfLabels;
  onClose: () => void;
}) {
  const { items } = labels;
  const dialog = useRef<HTMLDialogElement>(null);
  const { unlocked, sound, toggleSound, reset } = useStore(trophyStore);

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="trophy-shelf-title"
      onClose={onClose}
      className={styles.dialog()}
    >
      <div className={styles.head()}>
        <h2 id="trophy-shelf-title" className={styles.title()}>
          {labels.shelf} {unlocked.length}/{TROPHIES.length}
        </h2>
        <Button size="sm" aria-label={labels.close} onClick={() => dialog.current?.close()}>
          <Icon name="close" />
        </Button>
      </div>
      <ul className={styles.list()}>
        {TROPHIES.map(({ id, key }) => {
          const owned = unlocked.includes(id);
          return (
            <li key={id} className={styles.item({ owned })}>
              <Icon name="trophy" size="lg" />
              <span>
                <span className={styles.name()}>{items[key].title}</span>
                <span className={styles.meta()}>
                  {owned ? items[key].description : labels.locked}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className={styles.tools()}>
        <Button size="sm" aria-pressed={sound} onClick={toggleSound}>
          <Icon name={sound ? 'volume-on' : 'volume-off'} />
          {labels.sound}
        </Button>
        <Button size="sm" onClick={reset}>
          {labels.reset}
        </Button>
      </div>
    </dialog>
  );
}
