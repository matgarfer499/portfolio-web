import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { about, localize } from '@content/index';
import { Container } from '@shared/components/atoms/Container/Container';
import { Display } from '@shared/components/atoms/Display/Display';
import { Section } from '@shared/components/atoms/Section/Section';
import { GalleryLightbox } from '../GalleryLightbox/GalleryLightbox';
import { GalleryPhoto } from '../GalleryPhoto/GalleryPhoto';
import { aboutSectionVariants as styles } from './AboutSection.variants';

export async function AboutSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'About' });
  const total = about.photos.length;
  const photos = about.photos.map((photo, i) => ({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: localize(photo.alt, locale),
    caption: localize(photo.caption, locale),
    counter: t('counter', { current: i + 1, total }),
  }));

  return (
    <Section id="about" spacing="continued" aria-labelledby="about-title">
      <Container className={styles.grid()}>
        <div className={styles.copy()}>
          <Display id="about-title">{t('title')}</Display>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.en} className={styles.paragraph()}>
              {localize(paragraph, locale)}
            </p>
          ))}
        </div>
        <GalleryLightbox
          photos={photos}
          labels={{ close: t('close'), previous: t('previous'), next: t('next') }}
        >
          {about.photos.map((photo, i) => (
            <GalleryPhoto key={photo.id} index={i} photo={photo} locale={locale} />
          ))}
        </GalleryLightbox>
      </Container>
    </Section>
  );
}
