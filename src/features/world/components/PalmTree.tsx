'use client';

import { useToonGradient } from '@shared/hooks';

interface PalmTreeProps {
  readonly position: readonly [number, number, number];
  /** Small per-instance yaw so a row of palms doesn't look cloned. */
  readonly rotation?: number;
}

const FROND_COUNT = 6;

/** A low-poly palm: tapered trunk + a crown of angled frond cones. */
export function PalmTree({ position, rotation = 0 }: PalmTreeProps) {
  const gradient = useToonGradient();

  return (
    <group position={[...position]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.32, 3, 6]} />
        <meshToonMaterial color="#7a5a34" gradientMap={gradient} />
      </mesh>
      <group position={[0, 3, 0]}>
        {Array.from({ length: FROND_COUNT }, (_, i) => (
          <group key={i} rotation={[0, (i / FROND_COUNT) * Math.PI * 2, 0]}>
            <mesh castShadow position={[0, -0.2, 0.9]} rotation={[Math.PI / 2.4, 0, 0]}>
              <coneGeometry args={[0.4, 2, 4]} />
              <meshToonMaterial color="#37a07f" gradientMap={gradient} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
