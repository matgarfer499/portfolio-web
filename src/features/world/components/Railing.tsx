'use client';

import { Instance, Instances } from '@react-three/drei';
import { useToonGradient } from '@shared/hooks';

/** Sea-wall railing running the length of the promenade on the −X edge. */
const RAIL_X = -5.5;
const POST_SPACING = 4;
const POST_COUNT = 25; // covers z ≈ −48 … +48

export function Railing() {
  const gradient = useToonGradient();
  const startZ = -((POST_COUNT - 1) * POST_SPACING) / 2;

  return (
    <group position={[RAIL_X, 0, 0]}>
      {/* Top rail — one long bar. */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[0.18, 0.18, POST_COUNT * POST_SPACING]} />
        <meshToonMaterial color="#cbb487" gradientMap={gradient} />
      </mesh>
      {/* Posts — instanced so the whole rail is one draw call. */}
      <Instances castShadow limit={POST_COUNT}>
        <boxGeometry args={[0.18, 1.1, 0.18]} />
        <meshToonMaterial color="#cbb487" gradientMap={gradient} />
        {Array.from({ length: POST_COUNT }, (_, i) => (
          <Instance key={i} position={[0, 0.55, startZ + i * POST_SPACING]} />
        ))}
      </Instances>
    </group>
  );
}
