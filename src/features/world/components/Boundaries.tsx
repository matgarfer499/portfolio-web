'use client';

import { CuboidCollider, RigidBody } from '@react-three/rapier';

/**
 * Invisible walls that keep the avatar on the walkable promenade: the sea wall (−X), an
 * inland wall behind the building line (+X), and the two ends of the paseo (±Z). No meshes
 * — the sea railing and facades read as the visible barriers; these just stop the physics.
 */
export function Boundaries() {
  return (
    <RigidBody type="fixed" colliders={false} name="boundaries">
      {/* sea side */}
      <CuboidCollider args={[0.5, 3, 52]} position={[-6, 2, 0]} />
      {/* inland side, in front of the buildings */}
      <CuboidCollider args={[0.5, 3, 52]} position={[12, 2, 0]} />
      {/* near + far ends of the promenade */}
      <CuboidCollider args={[20, 3, 0.5]} position={[4, 2, 49]} />
      <CuboidCollider args={[20, 3, 0.5]} position={[4, 2, -49]} />
    </RigidBody>
  );
}
