import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CaseStudyPage, caseMeta, caseSlugs, findCase } from '@features/projects';
import { routing } from '@/i18n/routing';
import { pageMeta } from '@shared/config/seo';
import { site } from '@shared/config/site';
import { PageTransition } from '@shared/motion/PageTransition';
import { RevealController } from '@shared/motion/RevealController';
import { PageChrome } from '../../_components/PageChrome';

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams(): { locale: string; slug: string }[] {
  return routing.locales.flatMap((locale) => caseSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = findCase(slug);
  if (!study || !hasLocale(routing.locales, locale)) return {};
  return pageMeta({ locale, path: `/projects/${slug}`, ...caseMeta(study, locale, site.name) });
}

export default async function CasePage({ params }: { params: Params }): Promise<ReactNode> {
  const { locale, slug } = await params;
  const study = findCase(slug);
  if (!hasLocale(routing.locales, locale) || !study) notFound();
  setRequestLocale(locale);

  return (
    <PageChrome locale={locale}>
      <PageTransition>
        <main id="main">
          <CaseStudyPage study={study} locale={locale} />
        </main>
      </PageTransition>
      <RevealController />
    </PageChrome>
  );
}
