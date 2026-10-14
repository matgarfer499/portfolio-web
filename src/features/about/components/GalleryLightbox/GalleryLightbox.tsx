'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '@shared/components/atoms/Button/Button';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { prefersReducedMotion } from '@shared/motion/viewport';
import { pointerShift, wrapIndex } from '../../model';
import { galleryLightboxVariants as styles } from './GalleryLightbox.variants';

interface LightboxPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  counter: string;
}

// Wraps the server-rendered gallery: photo links open a modal viewer (←/→, Esc, focus returns
// to the photo), and on a fine pointer the photos drift slightly with it.
export function GalleryLightbox({
  photos,
  labels,
  children,
}: {
  photos: LightboxPhoto[];
  labels: { close: string; previous: string; next: string };
  children: ReactNode;
}) {
  const gallery = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = gallery.current;
    if (!el) return;
    const open = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[data-photo]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      opener.current = link;
      setIndex(Number(link.dataset.photo));
      dialog.current?.showModal();
    };
    el.addEventListener('click', open);
    return () => el.removeEventListener('click', open);
  }, []);

  useEffect(() => {
    const el = gallery.current;
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    el.dataset.parallax = '';
    let frame = 0;
    const set = (x: number, y: number) => {
      el.style.setProperty('--px', String(x));
      el.style.setProperty('--py', String(y));
    };
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { x, y } = pointerShift(event.clientX, event.clientY, el.getBoundingClientRect());
        set(x, y);
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      set(0, 0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      delete el.dataset.parallax;
    };
  }, []);

  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : wrapIndex(i + delta, photos.length)));
  const photo = index === null ? undefined : photos[index];

  return (
    <>
      <div ref={gallery} className={styles.gallery()}>
        {children}
      </div>
      <dialog
        ref={dialog}
        aria-label={photo?.caption}
        className={styles.dialog()}
        onClose={() => {
          setIndex(null);
          opener.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') step(1);
          if (event.key === 'ArrowLeft') step(-1);
        }}
      >
        <div className={styles.bar()}>
          <span aria-live="polite">{photo?.counter}</span>
          <Button size="sm" aria-label={labels.close} onClick={() => dialog.current?.close()}>
            <Icon name="close" />
          </Button>
        </div>
        {photo ? (
          <figure className={styles.figure()}>
            <Image
              key={photo.src}
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              sizes="100vw"
              className={styles.image()}
            />
            <figcaption className={styles.caption()}>{photo.caption}</figcaption>
          </figure>
        ) : null}
        <div className={styles.nav()}>
          <Button size="sm" aria-label={labels.previous} onClick={() => step(-1)}>
            <Icon name="arrow-left" />
          </Button>
          <Button size="sm" aria-label={labels.next} onClick={() => step(1)}>
            <Icon name="arrow-right" />
          </Button>
        </div>
      </dialog>
    </>
  );
}
