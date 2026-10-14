import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { buttonVariants } from '@shared/components/atoms/Button/Button.variants';
import { Container } from '@shared/components/atoms/Container/Container';
import { SECTIONS, type SectionId } from '../../model';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { ScrollProgress } from '../ScrollProgress/ScrollProgress';
import { SectionNav } from '../SectionNav/SectionNav';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { headerVariants as styles } from './Header.variants';

// `trophies` is a slot the app layer fills (P7): shell never imports the trophies feature.
export async function Header({ locale, trophies }: { locale: Locale; trophies?: ReactNode }) {
  const t = await getTranslations({ locale, namespace: 'Shell' });
  const labels = Object.fromEntries(SECTIONS.map((id) => [id, t(`nav.${id}`)])) as Record<
    SectionId,
    string
  >;
  const tools = (
    <>
      <ThemeToggle label={t('darkTheme')} />
      <LanguageSwitch to={locale === 'en' ? 'es' : 'en'} label={t('switchLanguage')} />
    </>
  );

  return (
    <header className={styles.root()}>
      <Container className={styles.bar()}>
        <Link
          href={localizedPath(locale, '/#top')}
          className={styles.mark()}
          aria-label={t('home')}
        >
          MG
        </Link>
        <SectionNav locale={locale} labels={labels} label={t('navLabel')} />
        <div className={styles.actions()}>
          {trophies}
          <div className={styles.wide()}>{tools}</div>
          <Link
            href={localizedPath(locale, '/#contact')}
            className={buttonVariants({ variant: 'volt', size: 'sm' })}
          >
            {t('hire')}
          </Link>
          <MobileMenu
            locale={locale}
            labels={labels}
            text={{ open: t('menuOpen'), close: t('menuClose'), nav: t('navLabel') }}
            tools={tools}
          />
        </div>
      </Container>
      <ScrollProgress />
    </header>
  );
}
