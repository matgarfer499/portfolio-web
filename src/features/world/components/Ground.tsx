'use client';

import { RigidBody } from '@react-three/rapier';
import { useToonGradient } from '@shared/hooks';

const GROUND_SIZE = 60;

/** The static floor the avatar walks on. */
export function Ground() {
  const gradient = useToonGradient();

  return (
    <RigidBody type="fixed" colliders="cuboid" friction={1} name="ground">
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[GROUND_SIZE, 1, GROUND_SIZE]} />
        <meshToonMaterial color="#16213e" gradientMap={gradient} />
      </mesh>
    </RigidBody>
  );
}
