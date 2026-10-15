import type { ImageResponse } from 'next/og';
import { markImage } from './og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon(): Promise<ImageResponse> {
  return markImage(size.width);
}
