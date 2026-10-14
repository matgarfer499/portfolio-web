import type { ImageResponse } from 'next/og';
import { markImage } from './og';

export const contentType = 'image/png';

// /icon/32 for the tab, /icon/192 and /icon/512 for the manifest.
export function generateImageMetadata(): {
  id: number;
  size: { width: number; height: number };
  contentType: string;
}[] {
  return [32, 192, 512].map((size) => ({
    id: size,
    size: { width: size, height: size },
    contentType,
  }));
}

export default async function Icon({ id }: { id: Promise<number> }): Promise<ImageResponse> {
  return markImage(Number(await id));
}
