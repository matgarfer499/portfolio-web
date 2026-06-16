'use client';

import { RigidBody } from '@react-three/rapier';
import { useToonGradient } from '@shared/hooks';

interface BlockProps {
  readonly position: readonly [number, number, number];
  readonly size: readonly [number, number, number];
  readonly color?: string;
}

/** A static, collidable cel-shaded box — walls and obstacles are built from these. */
export function Block({ position, size, color = '#3b4a78' }: BlockProps) {
  const gradient = useToonGradient();

  return (
    <RigidBody type="fixed" colliders="cuboid" position={[...position]} name="block">
      <mesh castShadow receiveShadow>
        <boxGeometry args={[...size]} />
        <meshToonMaterial color={color} gradientMap={gradient} />
      </mesh>
    </RigidBody>
  );
}
