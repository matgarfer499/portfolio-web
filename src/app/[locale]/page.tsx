import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AboutSection } from '@features/about';
import { ContactSection } from '@features/contact';
import { Hero } from '@features/hero';
import { LogSection } from '@features/log';
import { ProjectsSection } from '@features/projects';
import { RecordsSection } from '@features/records';
import { routing } from '@/i18n/routing';
import { pageMeta } from '@shared/config/seo';
import { PageTransition } from '@shared/motion/PageTransition';
import { RevealController } from '@shared/motion/RevealController';
import { PageChrome } from './_components/PageChrome';
import { jsonLd, personSchema, websiteSchema } from './json-ld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMeta({ locale, path: '/', title: t('title'), description: t('description') });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ReactNode> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <PageChrome locale={locale}>
      <PageTransition>
        <main id="main">
          <Hero locale={locale} />
          <RecordsSection locale={locale} />
          <LogSection locale={locale} />
          <AboutSection locale={locale} />
          <ProjectsSection locale={locale} />
          <ContactSection locale={locale} />
        </main>
      </PageTransition>
      <RevealController />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd([personSchema(locale), websiteSchema(locale)]) }}
      />
    </PageChrome>
  );
}
