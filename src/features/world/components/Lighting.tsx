'use client';

/**
 * Deep-navy dusk over the seafront: a cool ambient/hemisphere fill (sky → ground) plus a
 * single warm, low key light raking across the promenade from over the sea for long shadows.
 * Shadow-camera bounds are widened to cover the long paseo (a deliberate trade vs. a tight
 * frustum — acceptable for chunky toon shadows at 2048²).
 */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.38} color="#8fb4d0" />
      <hemisphereLight args={['#a9c6dc', '#16242f', 0.5]} />
      <directionalLight
        castShadow
        position={[-22, 10, 12]}
        intensity={1.95}
        color="#ffc78f"
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
        shadow-camera-left={-44}
        shadow-camera-right={44}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={1}
        shadow-camera-far={90}
      />
    </>
  );
}
