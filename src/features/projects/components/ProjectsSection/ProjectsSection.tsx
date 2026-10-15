import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { projects } from '@content/index';
import { Container } from '@shared/components/atoms/Container/Container';
import { Section } from '@shared/components/atoms/Section/Section';
import { SectionHead } from '@shared/components/molecules/SectionHead/SectionHead';
import { CaseList } from '../CaseList/CaseList';
import { FeaturedCase } from '../FeaturedCase/FeaturedCase';
import { StackGrid } from '../StackGrid/StackGrid';

export async function ProjectsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Projects' });
  const [featured, ...rest] = projects.caseStudies;
  return (
    <Section id="projects" spacing="continued" aria-labelledby="projects-title">
      <Container>
        <SectionHead id="projects-title" title={t('title')} lede={t('lede')} />
        <FeaturedCase study={featured} locale={locale} />
        {rest.length > 0 ? (
          <CaseList studies={rest} locale={locale} title={t('otherCases')} />
        ) : null}
        <StackGrid locale={locale} title={t('stackTitle')} />
      </Container>
    </Section>
  );
}
