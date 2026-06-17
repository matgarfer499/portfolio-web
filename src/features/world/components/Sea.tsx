'use client';

/**
 * The Mediterranean: a wide azure plane on the sea side (−X) of the promenade, a touch
 * below walkway level, with a brighter foam strip at the waterline. Flat/basic material
 * and `fog={false}` keep it reading as vivid water rather than dissolving into the dusk.
 */
export function Sea() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-78, -0.45, 0]}>
        <planeGeometry args={[140, 140]} />
        <meshBasicMaterial color="#1fb6d6" fog={false} />
      </mesh>
      {/* Foam line where the sea meets the sea wall. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8.6, -0.4, 0]}>
        <planeGeometry args={[1.6, 100]} />
        <meshBasicMaterial color="#74d0e6" fog={false} />
      </mesh>
    </group>
  );
}
