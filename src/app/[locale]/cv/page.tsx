import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CvPage } from '@features/cv';
import { routing } from '@/i18n/routing';
import { pageMeta } from '@shared/config/seo';
import { site } from '@shared/config/site';
import { PageTransition } from '@shared/motion/PageTransition';
import { PageChrome } from '../_components/PageChrome';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Cv' });
  return pageMeta({
    locale,
    path: '/cv',
    title: `${t('title')} — ${site.name}`,
    description: t('description'),
  });
}

export default async function CvRoute({ params }: { params: Params }): Promise<ReactNode> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <PageChrome locale={locale}>
      <PageTransition>
        <main id="main">
          <CvPage locale={locale} />
        </main>
      </PageTransition>
    </PageChrome>
  );
}
