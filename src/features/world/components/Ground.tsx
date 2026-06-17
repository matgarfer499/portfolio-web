'use client';

import { RigidBody } from '@react-three/rapier';
import { useToonGradient } from '@shared/hooks';

/** Promenade dimensions: long along Z (the walk), with an inland strip for the buildings. */
const WIDTH = 30;
const LENGTH = 104;
const CENTER_X = 9;

/** The warm-sand Paseo Marítimo the avatar walks on (and the walkable collider). */
export function Ground() {
  const gradient = useToonGradient();

  return (
    <RigidBody type="fixed" colliders="cuboid" friction={1} name="ground">
      <mesh receiveShadow position={[CENTER_X, -0.5, 0]}>
        <boxGeometry args={[WIDTH, 1, LENGTH]} />
        <meshToonMaterial color="#e9cfa0" gradientMap={gradient} />
      </mesh>
    </RigidBody>
  );
}
