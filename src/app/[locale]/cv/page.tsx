import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CvPage } from '@features/cv';
import { Footer, Header, SkipLink } from '@features/shell';
import { Trophies } from '@features/trophies';
import { routing } from '@/i18n/routing';
import { alternatesFor } from '@shared/config/seo';
import { site } from '@shared/config/site';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Cv' });
  return {
    title: `${t('title')} — ${site.name}`,
    description: t('description'),
    alternates: alternatesFor(locale, '/cv'),
  };
}

export default async function CvRoute({ params }: { params: Params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Shell' });

  return (
    <>
      <SkipLink label={t('skip')} />
      <Header locale={locale} trophies={<Trophies locale={locale} />} />
      <main id="main">
        <CvPage locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
