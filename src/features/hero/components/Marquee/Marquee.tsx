'use client';

import { Fragment, useEffect, useRef } from 'react';
import { marqueeRate } from '../../model';
import { marqueeVariants as styles } from './Marquee.variants';

// The CSS animation runs on its own; this only nudges its playbackRate from scroll velocity
// and pauses it on hover. Reduced motion: no animation, so nothing to drive.
export function Marquee({ items }: { items: readonly string[] }) {
  const band = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = track.current?.getAnimations()[0];
    const el = band.current;
    if (!animation || !el) return;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let direction: 1 | -1 = 1;
    let rate = 1;
    let frame = 0;

    const step = (t: number) => {
      const velocity = (window.scrollY - lastY) / Math.max(t - lastT, 1);
      lastY = window.scrollY;
      lastT = t;
      if (velocity !== 0) direction = velocity > 0 ? 1 : -1;
      const target = marqueeRate(velocity, direction);
      rate += (target - rate) * 0.12;
      animation.playbackRate = rate;
      frame = Math.abs(target - rate) > 0.01 || velocity !== 0 ? requestAnimationFrame(step) : 0;
    };
    const onScroll = () => {
      if (!frame) {
        lastT = performance.now();
        frame = requestAnimationFrame(step);
      }
    };
    const pause = () => animation.pause();
    const play = () => animation.play();

    window.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerenter', pause);
    el.addEventListener('pointerleave', play);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerenter', pause);
      el.removeEventListener('pointerleave', play);
    };
  }, []);

  const run = items.map((item) => (
    <Fragment key={item}>
      {item}
      <i className={styles.dot()} />
    </Fragment>
  ));

  return (
    <div ref={band} aria-hidden className={styles.band()}>
      <div ref={track} className={styles.track()}>
        <span className={styles.item()}>{run}</span>
        <span className={styles.item()}>{run}</span>
      </div>
    </div>
  );
}
