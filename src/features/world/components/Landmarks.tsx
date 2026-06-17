'use client';

import { Outlines } from '@react-three/drei';
import { useToonGradient } from '@shared/hooks';

/**
 * One cel-shaded landmark per zone, so each section of the paseo reads as a distinct place.
 * Each is rendered by `ZoneMarker` at the zone's world position (the big structure is offset
 * off the walkway so the avatar can still walk the centerline into the sensor). The mechanics
 * stay the current approach-to-open; these are the *look*, not new interactions.
 */
const INK = '#0a1420';

/** La Farola — the lighthouse anchoring the Intro end, out by the water (−X / sea side). */
function Lighthouse() {
  const gradient = useToonGradient();
  return (
    <group position={[-2.6, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.5, 1.7, 0.7, 14]} />
        <meshToonMaterial color="#d9c6a8" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      <mesh castShadow position={[0, 3.6, 0]}>
        <cylinderGeometry args={[0.85, 1.25, 6, 14]} />
        <meshToonMaterial color="#eaf4fb" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      {/* lantern room */}
      <mesh castShadow position={[0, 6.9, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 1, 12]} />
        <meshToonMaterial
          color="#ff8a3d"
          gradientMap={gradient}
          emissive="#ff8a3d"
          emissiveIntensity={0.4}
        />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      {/* roof cap */}
      <mesh castShadow position={[0, 7.7, 0]}>
        <coneGeometry args={[0.85, 0.9, 12]} />
        <meshToonMaterial color="#1b3450" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
    </group>
  );
}

/** Projects — a little shrine/kiosk with a glowing artifact to "activate". */
function Shrine() {
  const gradient = useToonGradient();
  return (
    <group position={[2.8, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[2.4, 0.4, 2.4]} />
        <meshToonMaterial color="#d9c6a8" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      {(
        [
          [-1, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
        ] as const
      ).map(([x, z]) => (
        <mesh key={`${x}${z}`} castShadow position={[x, 1.3, z]}>
          <boxGeometry args={[0.2, 2, 0.2]} />
          <meshToonMaterial color="#7a5a34" gradientMap={gradient} />
          <Outlines thickness={0.02} color={INK} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.1, 0.9, 4]} />
        <meshToonMaterial color="#ff8a3d" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      {/* floating artifact */}
      <mesh position={[0, 1.4, 0]}>
        <icosahedronGeometry args={[0.34, 0]} />
        <meshToonMaterial
          color="#1fb6d6"
          gradientMap={gradient}
          emissive="#1fb6d6"
          emissiveIntensity={0.5}
        />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
    </group>
  );
}

/** Experience — a market stall with a striped awning. */
function MarketStall() {
  const gradient = useToonGradient();
  return (
    <group position={[2.8, 0, 0]}>
      {/* counter */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[2.6, 1.2, 1.1]} />
        <meshToonMaterial color="#caa97c" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      {/* back posts */}
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} castShadow position={[x, 1.4, -0.5]}>
          <boxGeometry args={[0.16, 2.8, 0.16]} />
          <meshToonMaterial color="#7a5a34" gradientMap={gradient} />
        </mesh>
      ))}
      {/* striped awning */}
      <mesh castShadow position={[0, 2.5, 0.25]} rotation={[-0.5, 0, 0]}>
        <boxGeometry args={[2.8, 0.12, 1.6]} />
        <meshToonMaterial color="#eaf4fb" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      <mesh position={[0, 2.56, 0.22]} rotation={[-0.5, 0, 0]}>
        <boxGeometry args={[0.9, 0.13, 1.62]} />
        <meshToonMaterial color="#ff8a3d" gradientMap={gradient} />
      </mesh>
    </group>
  );
}

/** About — a small Andalusian casita with a door and a window. */
function Casita() {
  const gradient = useToonGradient();
  return (
    <group position={[2.9, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 1.6, 0]}>
        <boxGeometry args={[3.4, 3.2, 3]} />
        <meshToonMaterial color="#fbeee9" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      <mesh castShadow position={[0, 3.7, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.7, 1.2, 4]} />
        <meshToonMaterial color="#ff8a3d" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      {/* door (facing the walkway, −X) */}
      <mesh position={[-1.71, 0.95, 0]}>
        <boxGeometry args={[0.08, 1.7, 0.9]} />
        <meshToonMaterial color="#3a2a1c" gradientMap={gradient} />
      </mesh>
      {/* window */}
      <mesh position={[-1.71, 2.2, 0]}>
        <boxGeometry args={[0.08, 0.7, 0.7]} />
        <meshToonMaterial
          color="#1fb6d6"
          gradientMap={gradient}
          emissive="#1fb6d6"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

/** Contact — a mailbox at the quay end, out by the water (−X / sea side). */
function Mailbox() {
  const gradient = useToonGradient();
  return (
    <group position={[-2.6, 0, 0]}>
      <mesh castShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[0.18, 1.4, 0.18]} />
        <meshToonMaterial color="#7a5a34" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      <mesh castShadow position={[0, 1.6, 0]}>
        <boxGeometry args={[0.6, 0.7, 0.9]} />
        <meshToonMaterial color="#1fb6d6" gradientMap={gradient} />
        <Outlines thickness={0.02} color={INK} />
      </mesh>
      {/* little flag */}
      <mesh castShadow position={[0.34, 1.85, -0.2]}>
        <boxGeometry args={[0.06, 0.3, 0.02]} />
        <meshToonMaterial color="#ff8a3d" gradientMap={gradient} />
      </mesh>
      <mesh position={[0.42, 1.95, -0.2]}>
        <boxGeometry args={[0.22, 0.16, 0.02]} />
        <meshToonMaterial
          color="#ff8a3d"
          gradientMap={gradient}
          emissive="#ff8a3d"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

/** Render the themed landmark for a zone id (nothing for unknown ids). */
export function ZoneLandmark({ zoneId }: { readonly zoneId: string }) {
  switch (zoneId) {
    case 'intro':
      return <Lighthouse />;
    case 'projects':
      return <Shrine />;
    case 'experience':
      return <MarketStall />;
    case 'about':
      return <Casita />;
    case 'contact':
      return <Mailbox />;
    default:
      return null;
  }
}
