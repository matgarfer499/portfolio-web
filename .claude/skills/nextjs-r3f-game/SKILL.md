---
name: nextjs-r3f-game
description: Use when adding or changing anything in the 3D game layer (Canvas, R3F scenes, Rapier physics, the keyboard avatar, cel-shading, lighting, in-world copy) so WebGL stays client-only, code-split, and frame-cheap.
---

# Next.js + React Three Fiber game layer

The portfolio's interactive layer is a low-poly, cel-shaded R3F world driven by a keyboard
avatar. WebGL is **client-only and code-split**: it must never touch the server, and it must
only download/mount after the user clicks PRESS START.

## Client-only + code-split Canvas

The game is loaded with `next/dynamic` and `ssr: false`, so three.js is excluded from the
server bundle and from the initial route payload. PRESS START is server-rendered HTML and
stays instant; the WebGL chunk is fetched only on enter.

```tsx
// HomeExperience.tsx — 'use client'
const GameExperience = dynamic(() => import('./GameExperience').then((m) => m.GameExperience), {
  ssr: false,
  loading: () => <GameLoading />,
});

// render PRESS START until entered, then mount the game
{entered ? <GameExperience zones={zones} onExit={exit} /> : <PressStart … onEnter={enter} />}
```

Rules:

- `'use client'` goes on the experience components and **every** file that imports R3F / drei /
  rapier (`Avatar`, `Scene`, `Ground`, `Block`, `ZoneMarker`, `Lighting`). Pure helpers
  (`gradient-map.ts`) stay framework-free; the hook wrapping them (`useToonGradient`) is client.
- The dynamic boundary lives in the app layer. Do not `import` `GameExperience` (or anything that
  transitively imports three) into a server component or into `layout.tsx`/`page.tsx`.
- `GameExperience` is the **composition root**: it imports multiple features and wires them
  (`world.activeZoneId` → `achievements.unlock('first-contact')`). Features never import each other.

## Canvas setup

```tsx
<KeyboardControls map={controlsMap}>
  <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 9, 18], fov: 50 }}>
    <color attach="background" args={['#0b1020']} />
    <fog attach="fog" args={['#0b1020', 26, 60]} />
    <Suspense fallback={null}>
      <Physics>
        <Scene />
        <Avatar />
      </Physics>
    </Suspense>
  </Canvas>
</KeyboardControls>
```

- `dpr={[1, 2]}` caps the pixel ratio (no 3x render on dense phones).
- `fog` matches the background colour so the perimeter dissolves instead of popping — also lets
  the far shadow camera stay small.
- `<Suspense fallback={null}>` wraps `<Physics>`; the DOM `loading` from `dynamic` covers the gap.

## Keyboard controls

drei `<KeyboardControls map>` wraps `<Canvas>`. The map binds named controls to **both** WASD and
arrow keys via `event.code` (`KeyW`, `ArrowUp`, …) so layout is keyboard-agnostic.

```ts
export const controlsMap: KeyboardControlsEntry<ControlName>[] = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
];
```

Read input **inside `useFrame`** with the imperative getter — never subscribe a React state to
key state (that would re-render every keypress):

```tsx
const [, getKeys] = useKeyboardControls<ControlName>();
useFrame((state, delta) => {
  const { forward, backward, left, right } = getKeys();
  …
});
```

## Avatar movement + camera follow (Rapier)

The avatar is a `type="dynamic"` `RigidBody` with `lockRotations` and a `CapsuleCollider`
(`colliders={false}` on the body so the collider is explicit). Movement **sets linear velocity**
each frame — it never teleports `position`, which would fight the physics solver.

Velocity is **damped toward a target** each frame (`MathUtils.damp`, framerate-independent) so the
avatar accelerates and eases to a stop instead of snapping. Gravity on `y` is preserved. Reuse a
module-scope `Vector3` for the write — no per-frame object literals:

```tsx
const length = Math.hypot(dx, dz); // normalize so diagonals aren't faster
const tx = length > 0 ? (dx / length) * SPEED : 0;
const tz = length > 0 ? (dz / length) * SPEED : 0;
const { x: vx, y, z: vz } = rb.linvel(); // preserve gravity on Y
nextVel.set(
  MathUtils.damp(vx, tx, MOVE_LAMBDA, delta),
  y,
  MathUtils.damp(vz, tz, MOVE_LAMBDA, delta),
);
rb.setLinvel(nextVel, true); // set linearDamping={0}: we own decel here
```

Facing is a **visual** concern: the body keeps `lockRotations`, and an inner `<group ref={visual}>`
(wrapping only the meshes, collider stays outside) yaws toward the heading via shortest-path slerp.
Hold the last facing when idle:

```tsx
if (vis && length > 0) {
  targetQuat.setFromAxisAngle(UP, Math.atan2(dx, dz));
  vis.quaternion.slerp(targetQuat, 1 - Math.exp(-TURN_LAMBDA * delta));
}
```

Camera trails with **frame-rate-independent exponential smoothing** — the factor depends on `delta`,
so follow speed is identical at 30 or 144 fps. Express the rate as `1 - exp(-λ·dt)` (λ in 1/s,
self-documenting) rather than an opaque `pow(base, dt)`:

```tsx
state.camera.position.lerp(desiredCamera, 1 - Math.exp(-CAMERA_LAMBDA * delta));
state.camera.lookAt(position.x, position.y + 1, position.z);
```

Static colliders: `Ground` and `Block` are `type="fixed" colliders="cuboid"`. Perimeter walls +
obstacles are just `Block`s.

## Zone sensors

A `ZoneMarker` is a `type="fixed"` `RigidBody` with `sensor` and an explicit `CuboidCollider`. It
reports intersection into the world store; the app layer turns that into an achievement.

```tsx
<RigidBody
  type="fixed"
  colliders={false}
  sensor
  onIntersectionEnter={() => enterZone(zone.id)}
  onIntersectionExit={() => leaveZone(zone.id)}
>
  <CuboidCollider args={[2.3, 1.6, 2.3]} position={[0, 1.6, 0]} />
</RigidBody>
```

## Cel-shading

Every material is `meshToonMaterial` + a shared 3-step grayscale `gradientMap` + drei `<Outlines>`
for the ink line. The ramp is a tiny `DataTexture` with `NearestFilter` and no mipmaps — no texture
asset is shipped. Build it once and share it via the memoized hook:

```tsx
const gradient = useToonGradient();           // useMemo(() => createToonGradient(3))
<meshToonMaterial color="#ff7a1a" gradientMap={gradient} />
<Outlines thickness={0.045} color="#0b1020" />
```

Fewer steps = chunkier shading. Reuse `useToonGradient()` per component; don't build a new
`DataTexture` per mesh.

## Lighting & shadows

`ambientLight` + `hemisphereLight` (warm sky / cool ground = the orange/azure palette as light) +
one shadow-casting `directionalLight`. Keep the shadow camera bounds tight
(`shadow-camera-left/right/top/bottom`, `far`) and use `shadow-bias={-0.0005}` to kill acne.
`shadow-mapSize={[2048, 2048]}` is the ceiling for this scene. Meshes opt in with `castShadow` /
`receiveShadow`.

## In-world text → DOM HUD

**Never** render in-canvas text. drei `<Text>` / troika fetch a font at runtime (network +
async), which breaks the instant, offline-friendly feel and the SSG/crawler story. All in-world
copy (zone heading/body, achievement count) is rendered in the **DOM HUD** (`features/hud`)
overlaid on the Canvas, fed from the world store's `activeZoneId`.

## Anti-patterns

- **Importing the game on the server.** Any server-reachable import of three/R3F/rapier defeats
  the `ssr:false` split and can crash the build. Cross the boundary only through `dynamic`.
- **`OrbitControls` (or any camera controller) alongside the follow camera.** They fight each
  other for `state.camera`. This scene drives the camera manually in `useFrame`.
- **Per-frame allocations in `useFrame`.** No `new Vector3()` / object literals created each
  frame. Hoist scratch vectors to module scope (`CAMERA_OFFSET`, `desiredCamera`) and mutate.
- **Driving movement by mutating `position` / re-rendering React.** Set Rapier velocity; read keys
  with `getKeys()`, not React state.
- **`troika` / drei `<Text>` in-canvas.** Use the DOM HUD.
- **One `gradientMap`/material per mesh allocated inline.** Share the memoized toon gradient.
- **`'use client'` missing** on any file touching R3F/drei/rapier, or a feature importing another
  feature / `@app/*` instead of wiring in the app composition root.
