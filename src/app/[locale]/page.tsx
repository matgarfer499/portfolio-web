import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AboutSection } from '@features/about';
import { ContactSection } from '@features/contact';
import { Hero } from '@features/hero';
import { LogSection } from '@features/log';
import { ProjectsSection } from '@features/projects';
import { RecordsSection } from '@features/records';
import { Footer, Header, SkipLink } from '@features/shell';
import { Trophies } from '@features/trophies';
import { routing } from '@/i18n/routing';
import { alternatesFor } from '@shared/config/seo';
import { PageTransition } from '@shared/motion/PageTransition';
import { RevealController } from '@shared/motion/RevealController';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? { alternates: alternatesFor(locale, '/') } : {};
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Shell' });

  return (
    <>
      <SkipLink label={t('skip')} />
      <Header locale={locale} trophies={<Trophies locale={locale} />} />
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
      <Footer locale={locale} />
      <RevealController />
    </>
  );
}
