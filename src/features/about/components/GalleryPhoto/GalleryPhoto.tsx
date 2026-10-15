import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Locale } from '@/i18n/routing';
import { localize, type GalleryPhoto as Photo } from '@content/index';
import { galleryPhotoVariants as styles } from './GalleryPhoto.variants';

// A plain link to the photo: without JS it opens the image; GalleryLightbox turns it into a dialog.
export function GalleryPhoto({
  index,
  photo,
  locale,
}: {
  index: number;
  photo: Photo;
  locale: Locale;
}) {
  const tall = Boolean(photo.tall);
  const style = { objectPosition: photo.focus, '--depth': `${0.125 * ((index % 3) + 1)}rem` };
  return (
    <figure data-reveal className={styles.root({ tall })}>
      <a href={photo.src} data-photo={index} className={styles.link()}>
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={localize(photo.alt, locale)}
          sizes="(min-width: 51.25rem) 22vw, 50vw"
          className={styles.image({ tall, contain: photo.fit === 'contain' })}
          style={style as CSSProperties}
        />
      </a>
      <figcaption className={styles.stamp()}>{localize(photo.caption, locale)}</figcaption>
    </figure>
  );
}
