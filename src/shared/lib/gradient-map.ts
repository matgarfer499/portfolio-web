import { DataTexture, NearestFilter, RedFormat } from 'three';

/**
 * Build a hard-stepped grayscale ramp for `MeshToonMaterial.gradientMap`.
 * Fewer steps == chunkier cel-shading. This is the cheapest way to get a toon look
 * without shipping any texture asset.
 */
export function createToonGradient(steps = 3): DataTexture {
  const data = new Uint8Array(steps);
  for (let i = 0; i < steps; i += 1) {
    data[i] = Math.round((i / (steps - 1)) * 255);
  }

  const texture = new DataTexture(data, steps, 1, RedFormat);
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}
