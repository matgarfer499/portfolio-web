'use client';

/** Warm key light + cool fill — the orange/blue palette expressed as light. */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#ffd9b0', '#1b2547', 0.5]} />
      <directionalLight
        castShadow
        position={[10, 16, 8]}
        intensity={2.4}
        color="#fff1e0"
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
        shadow-camera-left={-24}
        shadow-camera-right={24}
        shadow-camera-top={24}
        shadow-camera-bottom={-24}
        shadow-camera-far={60}
      />
    </>
  );
}
