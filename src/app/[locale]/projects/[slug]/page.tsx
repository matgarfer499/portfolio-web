import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CaseStudyPage, caseMeta, caseSlugs, findCase } from '@features/projects';
import { Footer, Header, SkipLink } from '@features/shell';
import { Trophies } from '@features/trophies';
import { routing } from '@/i18n/routing';
import { alternatesFor } from '@shared/config/seo';
import { site } from '@shared/config/site';
import { PageTransition } from '@shared/motion/PageTransition';
import { RevealController } from '@shared/motion/RevealController';

type Params = Promise<{ locale: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => caseSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = findCase(slug);
  if (!study || !hasLocale(routing.locales, locale)) return {};
  return {
    ...caseMeta(study, locale, site.name),
    alternates: alternatesFor(locale, `/projects/${slug}`),
  };
}

export default async function CasePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const study = findCase(slug);
  if (!hasLocale(routing.locales, locale) || !study) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Shell' });

  return (
    <>
      <SkipLink label={t('skip')} />
      <Header locale={locale} trophies={<Trophies locale={locale} />} />
      <PageTransition>
        <main id="main">
          <CaseStudyPage study={study} locale={locale} />
        </main>
      </PageTransition>
      <Footer locale={locale} />
      <RevealController />
    </>
  );
}
