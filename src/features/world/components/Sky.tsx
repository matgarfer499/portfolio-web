'use client';

import { useMemo } from 'react';
import { BackSide, DataTexture, NearestFilter, RGBAFormat, SRGBColorSpace } from 'three';

/**
 * Banded "cel" dusk sky on a large back-faced sphere. The band colours live in a tiny
 * vertical `DataTexture` with `NearestFilter` (hard steps, no gradient) — the discrete
 * layers the art direction asks for, shipped without any texture asset. `fog={false}`
 * keeps the backdrop vivid behind the foreground fog.
 */

// Bottom pole → top pole. The lower half sits under the horizon (hidden by sea/ground);
// the visible upper half steps a warm dusk glow at the horizon → sea-blue → deep navy.
const BANDS: readonly string[] = [
  '#11304f',
  '#11304f',
  '#11304f',
  '#1f4a6b',
  '#e8a86a', // warm sunset glow at the horizon
  '#c98a86', // dusty rose
  '#4a6f92', // sea-blue band
  '#173a5a', // deep navy overhead
];

function hexToRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function useSkyTexture(): DataTexture {
  return useMemo(() => {
    const data = new Uint8Array(BANDS.length * 4);
    BANDS.forEach((hex, i) => {
      const [r, g, b] = hexToRgb(hex);
      data.set([r, g, b, 255], i * 4);
    });
    const texture = new DataTexture(data, 1, BANDS.length, RGBAFormat);
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;
    texture.colorSpace = SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    return texture;
  }, []);
}

export function Sky() {
  const map = useSkyTexture();
  return (
    <mesh scale={[1, 1, 1]}>
      <sphereGeometry args={[140, 32, 16]} />
      <meshBasicMaterial map={map} side={BackSide} fog={false} depthWrite={false} />
    </mesh>
  );
}
