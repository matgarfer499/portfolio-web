import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { localize, type CaseStudy } from '@content/index';
import { buttonVariants } from '@shared/components/atoms/Button/Button.variants';
import { Chip } from '@shared/components/atoms/Chip/Chip';
import { Display } from '@shared/components/atoms/Display/Display';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { Label } from '@shared/components/atoms/Label/Label';
import { caseText, caseTransition } from '../../model';
import { featuredCaseVariants as styles } from './FeaturedCase.variants';

// The title and the laptop shot share view-transition names with /projects/[slug].
export async function FeaturedCase({ study, locale }: { study: CaseStudy; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Projects' });
  const name = caseText(study.name, locale);
  return (
    <article data-reveal aria-labelledby={`case-${study.slug}`} className={styles.root()}>
      {study.shots ? (
        <div className={styles.visual()}>
          <ViewTransition name={caseTransition('shot', study.slug)} share="morph">
            <Image
              src={study.shots.desktop.src}
              width={study.shots.desktop.width}
              height={study.shots.desktop.height}
              alt={localize(study.shots.desktop.alt, locale)}
              sizes="(min-width: 68.75rem) 50vw, 92vw"
              className={styles.desk()}
            />
          </ViewTransition>
          <Image
            src={study.shots.phone.src}
            width={study.shots.phone.width}
            height={study.shots.phone.height}
            alt={localize(study.shots.phone.alt, locale)}
            sizes="(min-width: 68.75rem) 13vw, 24vw"
            className={styles.phone()}
          />
        </div>
      ) : null}
      <div className={styles.copy()}>
        <Label>{caseText(study.tagline, locale)}</Label>
        <ViewTransition name={caseTransition('title', study.slug)} share="morph">
          <Display as="h3" size="card" id={`case-${study.slug}`}>
            {name}
          </Display>
        </ViewTransition>
        <p className={styles.summary()}>{caseText(study.summary, locale)}</p>
        <div translate="no" className={styles.chips()}>
          {study.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
        <div className={styles.ctas()}>
          {study.url ? (
            <a href={study.url} className={buttonVariants({ variant: 'dark' })}>
              {t('try', { name })}
              <Icon name="arrow-up-right" />
            </a>
          ) : null}
          <Link
            href={localizedPath(locale, `/projects/${study.slug}`)}
            transitionTypes={['nav-forward']}
            className={buttonVariants()}
          >
            {t('readCase')}
            <Icon name="arrow-right" />
          </Link>
        </div>
      </div>
    </article>
  );
}
