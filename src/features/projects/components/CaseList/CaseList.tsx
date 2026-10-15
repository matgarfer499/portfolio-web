import Link from 'next/link';
import { ViewTransition } from 'react';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { resolve, type CaseStudy } from '@content/index';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { Label } from '@shared/components/atoms/Label/Label';
import { RichText } from '@shared/components/atoms/RichText/RichText';
import { caseAnchor, caseTransition } from '../../model';
import { caseListVariants as styles } from './CaseList.variants';

// The cases after the featured one, as numbered rows that open each case page. Numbering
// continues from the featured case (01); each name morphs into its case page title.
export function CaseList({
  studies,
  locale,
  title,
}: {
  studies: readonly CaseStudy[];
  locale: Locale;
  title: string;
}) {
  return (
    <section data-reveal aria-labelledby="case-list-title" className={styles.root()}>
      <h3 id="case-list-title" className={styles.heading()}>
        <Label>{title}</Label>
      </h3>
      <ol className={styles.list()}>
        {studies.map((study, i) => (
          <li key={study.slug} id={caseAnchor(study.slug)} className={styles.item()}>
            <Link
              href={localizedPath(locale, `/projects/${study.slug}`)}
              transitionTypes={['nav-forward']}
              className={styles.link()}
            >
              <span aria-hidden className={styles.index()}>
                {String(i + 2).padStart(2, '0')}
              </span>
              <span className={styles.text()}>
                <Label>
                  <RichText parts={[resolve(study.tagline, locale)]} />
                </Label>
                <ViewTransition name={caseTransition('title', study.slug)} share="morph">
                  <span className={styles.name()}>
                    <RichText parts={[resolve(study.name, locale)]} />
                  </span>
                </ViewTransition>
                <span className={styles.summary()}>
                  <RichText parts={[resolve(study.summary, locale)]} />
                </span>
              </span>
              <span aria-hidden className={styles.cue()}>
                <Icon name="arrow-right" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
