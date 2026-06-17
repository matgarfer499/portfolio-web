'use client';

import { Outlines } from '@react-three/drei';
import { useToonGradient } from '@shared/hooks';

interface BuildingProps {
  readonly position: readonly [number, number, number];
  /** [width (x), height (y), depth (z)] of the wall block. */
  readonly size: readonly [number, number, number];
  readonly wall?: string;
  readonly roof?: string;
}

/**
 * A whitewashed Andalusian house: a cream wall block under a terracotta hip roof
 * (a 4-sided pyramid). Lined up inland as the promenade's backdrop.
 */
export function Building({ position, size, wall = '#fbeee9', roof = '#ff8a3d' }: BuildingProps) {
  const gradient = useToonGradient();
  const [w, h, d] = size;
  const roofRadius = Math.hypot(w, d) / 2 + 0.15;

  return (
    <group position={[...position]}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshToonMaterial color={wall} gradientMap={gradient} />
        <Outlines thickness={0.02} color="#0a1420" />
      </mesh>
      <mesh position={[0, h + 0.55, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[roofRadius, 1.1, 4]} />
        <meshToonMaterial color={roof} gradientMap={gradient} />
        <Outlines thickness={0.02} color="#0a1420" />
      </mesh>
    </group>
  );
}
