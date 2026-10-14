import Image from 'next/image';
import type { Locale } from '@/i18n/routing';
import { hero, localize } from '@content/index';
import { Marquee } from '../Marquee/Marquee';
import { heroPhotoVariants as styles } from './HeroPhoto.variants';

export function HeroPhoto({ locale }: { locale: Locale }) {
  const { photo } = hero;
  return (
    <figure className={styles.root()}>
      <Image
        src={photo.src}
        alt={localize(photo.alt, locale)}
        fill
        sizes="(min-width: 51.25rem) 60vw, 100vw"
        loading="eager"
        fetchPriority="high"
        className={styles.image()}
      />
      <Marquee items={hero.marquee.map((item) => localize(item, locale))} />
      <figcaption className={styles.caption()}>{localize(hero.photoCaption, locale)}</figcaption>
    </figure>
  );
}
