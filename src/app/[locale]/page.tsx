import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Hero } from '@features/hero';
import { LogSection } from '@features/log';
import { RecordsSection } from '@features/records';
import { Footer, Header, SkipLink } from '@features/shell';
import { routing } from '@/i18n/routing';
import { RevealController } from '@shared/motion/RevealController';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Shell' });

  return (
    <>
      <SkipLink label={t('skip')} />
      <Header locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <RecordsSection locale={locale} />
        <LogSection locale={locale} />
      </main>
      <Footer locale={locale} />
      <RevealController />
    </>
  );
}
