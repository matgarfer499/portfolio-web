'use client';

import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig } from 'motion/react';

const loadFeatures = () => import('./features').then((mod) => mod.domMax);

// strict: a full `motion.*` component anywhere throws, so only the light `m.*` ships.
// reducedMotion="user" drops transform animations for visitors who ask; fades remain.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
