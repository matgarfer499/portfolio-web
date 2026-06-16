'use client';

import { useMemo } from 'react';
import type { DataTexture } from 'three';
import { createToonGradient } from '../lib/gradient-map';

/** Memoized toon gradient ramp, shared by every cel-shaded material in the scene. */
export function useToonGradient(steps = 3): DataTexture {
  return useMemo(() => createToonGradient(steps), [steps]);
}
