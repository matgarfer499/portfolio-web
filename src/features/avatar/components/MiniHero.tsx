'use client';

import { Outlines } from '@react-three/drei';
import { useToonGradient } from '@shared/hooks';

/**
 * The mini-hero (art-direction B, ~2.7 heads): a software-engineer adventurer in an orange
 * hoodie — the avatar's deliberate "rare pop" against the sea-blue world — with the oversized
 * Matadragones strapped across his back as quiet foreshadowing. Built from cel-shaded toon
 * primitives + ink outlines, sized to fill the existing capsule collider (local y −1…+1).
 *
 * The face/eyes sit on local **+z** (the heading the Avatar's visual group yaws toward); the
 * sword rides the **−z** back. Purely visual — no physics here.
 */
const INK = '#0a1420';

export function MiniHero() {
  const gradient = useToonGradient();

  return (
    <group>
      {/* ---- legs + boots ---- */}
      {[
        { x: -0.16, leg: '#1b3450', boot: '#e0701f' },
        { x: 0.16, leg: '#23425f', boot: '#ff8a3d' },
      ].map(({ x, leg, boot }) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh castShadow position={[0, -0.66, 0]}>
            <boxGeometry args={[0.2, 0.6, 0.22]} />
            <meshToonMaterial color={leg} gradientMap={gradient} />
            <Outlines thickness={0.02} color={INK} />
          </mesh>
          <mesh castShadow position={[0, -0.95, 0.06]}>
            <boxGeometry args={[0.26, 0.16, 0.34]} />
            <meshToonMaterial color={boot} gradientMap={gradient} />
            <Outlines thickness={0.02} color={INK} />
          </mesh>
        </group>
      ))}

      {/* ---- hoodie torso ---- */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.62, 0.72, 0.4]} />
        <meshToonMaterial color="#ff8a3d" gradientMap={gradient} />
        <Outlines thickness={0.025} color={INK} />
      </mesh>
      {/* lighter band across the upper torso */}
      <mesh position={[0, 0.22, 0.01]}>
        <boxGeometry args={[0.63, 0.24, 0.42]} />
        <meshToonMaterial color="#ffa55f" gradientMap={gradient} />
      </mesh>
      {/* hood collar framing the neck */}
      <mesh castShadow position={[0, 0.36, -0.02]}>
        <boxGeometry args={[0.34, 0.16, 0.34]} />
        <meshToonMaterial color="#1b3450" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>

      {/* ---- arms ---- */}
      {[-0.39, 0.39].map((x) => (
        <mesh key={x} castShadow position={[x, 0.0, 0]}>
          <boxGeometry args={[0.16, 0.58, 0.22]} />
          <meshToonMaterial color="#e0701f" gradientMap={gradient} />
          <Outlines thickness={0.02} color={INK} />
        </mesh>
      ))}

      {/* ---- head ---- */}
      <mesh castShadow position={[0, 0.66, 0]}>
        <sphereGeometry args={[0.34, 20, 20]} />
        <meshToonMaterial color="#ffe0c2" gradientMap={gradient} />
        <Outlines thickness={0.025} color={INK} />
      </mesh>
      {/* hair — slightly larger, pushed up/back so the face stays skin */}
      <mesh castShadow position={[0, 0.74, -0.05]} scale={[1.06, 0.92, 1.04]}>
        <sphereGeometry args={[0.34, 16, 16]} />
        <meshToonMaterial color="#2a1c14" gradientMap={gradient} />
      </mesh>
      {/* eyes on +z (the facing direction) */}
      {[-0.13, 0.13].map((x) => (
        <mesh key={x} position={[x, 0.66, 0.3]}>
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshToonMaterial color={INK} gradientMap={gradient} />
        </mesh>
      ))}

      {/* ---- Matadragones, strapped diagonally across the back (−z) ---- */}
      <group position={[0.05, 0.1, -0.32]} rotation={[0.12, 0, -0.42]}>
        {/* blade */}
        <mesh castShadow position={[0, 0.45, 0]}>
          <boxGeometry args={[0.18, 1.5, 0.07]} />
          <meshToonMaterial color="#aebcc8" gradientMap={gradient} />
          <Outlines thickness={0.02} color={INK} />
        </mesh>
        {/* light edge of the blade */}
        <mesh position={[-0.05, 0.45, 0.01]}>
          <boxGeometry args={[0.07, 1.5, 0.08]} />
          <meshToonMaterial color="#cdd8e1" gradientMap={gradient} />
        </mesh>
        {/* orange guard wrap */}
        <mesh castShadow position={[0, -0.36, 0]}>
          <boxGeometry args={[0.38, 0.12, 0.14]} />
          <meshToonMaterial color="#ff8a3d" gradientMap={gradient} />
          <Outlines thickness={0.02} color={INK} />
        </mesh>
        {/* grip */}
        <mesh castShadow position={[0, -0.58, 0]}>
          <boxGeometry args={[0.1, 0.32, 0.1]} />
          <meshToonMaterial color="#3a2a1c" gradientMap={gradient} />
          <Outlines thickness={0.02} color={INK} />
        </mesh>
      </group>
    </group>
  );
}
