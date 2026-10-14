import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { profile } from '@content/index';
import { Container } from '@shared/components/atoms/Container/Container';
import { FinishLine } from '../FinishLine/FinishLine';
import { FooterClock } from '../FooterClock/FooterClock';
import { footerVariants as styles } from './Footer.variants';

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return (
    <footer className={styles.root()}>
      <Container className={styles.row()}>
        <span>{profile.fullName}</span>
        <FooterClock
          locale={locale}
          template={t('localTime', { city: profile.city, time: '{time}' })}
          fallback={t('clockFallback')}
        />
        <a href="#top" className={styles.top()}>
          {t('backToTop')}
        </a>
        <FinishLine />
      </Container>
    </footer>
  );
}
