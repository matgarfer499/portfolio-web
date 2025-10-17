export interface Photo {
  src: string;
  alt: string;
  caption: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

export interface PolaroidPhotoProps extends Photo {
  zIndex: number;
  index: number;
}
