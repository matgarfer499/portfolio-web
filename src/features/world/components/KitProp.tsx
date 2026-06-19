'use client';

import { Clone, useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { useToonGradient } from '@shared/hooks';
import { toonifyScene } from '@shared/lib';

interface KitPropProps {
  /** Path under /public to a CC0 kit GLB. */
  readonly model: string;
  readonly position: readonly [number, number, number];
  /** Yaw (radians) so repeated props don't look cloned. */
  readonly rotation?: number;
  readonly scale?: number;
}

/**
 * Loads a CC0 low-poly kit GLB, cel-shades it once to the Costa Azul look (shared across every
 * clone of that model), and drops a clone into the world. `<Clone>` reuses the source's geometry
 * and (toon) materials, so repeated props stay cheap.
 */
export function KitProp({ model, position, rotation = 0, scale = 1 }: KitPropProps) {
  const { scene } = useGLTF(model);
  const gradient = useToonGradient();
  const toon = useMemo(() => {
    toonifyScene(scene, { gradient });
    return scene;
  }, [scene, gradient]);

  return <Clone object={toon} position={[...position]} rotation={[0, rotation, 0]} scale={scale} />;
}
