'use client';

import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import type { AnimationClip, Group } from 'three';
import { useToonGradient } from '@shared/hooks';
import { toonifyScene } from '@shared/lib';
import { avatarMotion } from '../state';

const MODEL = '/models/character/robot-expressive.glb';

/**
 * Visual scale + vertical offset so the model's feet sit at the capsule's base (the RigidBody
 * origin is the capsule centre, ~1 unit above the feet). Tuned against screenshots — no levitating.
 */
const SCALE = 0.85;
const FEET_OFFSET = -1;

/** Speed (units/s) thresholds for blending. Below IDLE = idle; above RUN = run; between = walk. */
const IDLE_BELOW = 0.3;
const RUN_ABOVE = 2.5;
/** Cross-fade duration (s) between clips. */
const FADE = 0.25;

/** First clip whose name contains `token` (case-insensitive) — keeps the swap seam model-agnostic. */
function pickClip(clips: readonly AnimationClip[], token: string): string | undefined {
  return clips.find((c) => c.name.toLowerCase().includes(token))?.name;
}

/**
 * The swappable hero. A generic CC0 placeholder (Quaternius "RobotExpressive") rigged with baked
 * idle/walk/run, cross-faded by the avatar's horizontal speed. This is the seam: a real-likeness
 * model (TRELLIS / Ready Player Me) drops in by changing `MODEL` + the scale/offset, as long as it
 * carries idle/walk/run clips and faces +Z at rest. Materials are cel-shaded to match Costa Azul.
 */
export function Character() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL);
  const { actions } = useAnimations(animations, group);
  const gradient = useToonGradient();

  const clips = useMemo(
    () => ({
      idle: pickClip(animations, 'idle'),
      walk: pickClip(animations, 'walk'),
      run: pickClip(animations, 'run'),
    }),
    [animations],
  );

  useEffect(() => {
    toonifyScene(scene, { gradient, overrides: { Main: '#ff8a3d' } });
  }, [scene, gradient]);

  const currentName = useRef<string | undefined>(undefined);

  useEffect(() => {
    const idle = clips.idle ? actions[clips.idle] : undefined;
    idle?.reset().fadeIn(FADE).play();
    currentName.current = clips.idle;
    return () => {
      Object.values(actions).forEach((a) => a?.stop());
    };
  }, [actions, clips]);

  useFrame(() => {
    const speed = avatarMotion.speed;
    const next = speed < IDLE_BELOW ? clips.idle : speed < RUN_ABOVE ? clips.walk : clips.run;
    if (!next || next === currentName.current) return;

    const nextAction = actions[next];
    if (!nextAction) return;
    const prev = currentName.current ? actions[currentName.current] : undefined;
    nextAction.reset().fadeIn(FADE).play();
    prev?.fadeOut(FADE);
    currentName.current = next;
  });

  return (
    <group ref={group} scale={SCALE} position={[0, FEET_OFFSET, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL);
