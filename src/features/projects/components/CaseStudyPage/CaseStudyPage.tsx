import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { localize, resolve, type CaseStudy } from '@content/index';
import { buttonVariants } from '@shared/components/atoms/Button/Button.variants';
import { Bullet, Bullets } from '@shared/components/atoms/Bullets/Bullets';
import { Chip } from '@shared/components/atoms/Chip/Chip';
import { Container } from '@shared/components/atoms/Container/Container';
import { Display } from '@shared/components/atoms/Display/Display';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { Label } from '@shared/components/atoms/Label/Label';
import { Placeholder } from '@shared/components/atoms/Placeholder/Placeholder';
import { Section } from '@shared/components/atoms/Section/Section';
import { TrophyOnMount } from '@shared/components/atoms/TrophyOnMount/TrophyOnMount';
import { caseAnchor, caseText, caseTransition, nextCase } from '../../model';
import { NextCase } from '../NextCase/NextCase';
import { caseStudyPageVariants as styles } from './CaseStudyPage.variants';

export async function CaseStudyPage({ study, locale }: { study: CaseStudy; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Projects' });
  const name = resolve(study.name, locale);
  const tagline = resolve(study.tagline, locale);
  const summary = resolve(study.summary, locale);
  const next = nextCase(study.slug);

  return (
    <>
      <Section spacing="tight">
        <Container>
          <nav aria-label={t('caseNav')} className={styles.top()}>
            <Link
              href={localizedPath(locale, `/#${caseAnchor(study.slug)}`)}
              transitionTypes={['nav-back']}
              className={styles.back()}
            >
              <Icon name="arrow-left" />
              {t('back')}
            </Link>
            <Link
              href={localizedPath(locale, `/projects/${next.slug}`)}
              transitionTypes={['nav-forward']}
              className={styles.back()}
            >
              {t('nextShort', { name: caseText(next.name, locale) })}
              <Icon name="arrow-right" />
            </Link>
          </nav>
          <div className={styles.head()}>
            {tagline.kind === 'pending' ? (
              <Placeholder note={tagline.note} />
            ) : (
              <Label>{tagline.text}</Label>
            )}
            <ViewTransition name={caseTransition('title', study.slug)} share="morph">
              <Display as="h1">
                {name.kind === 'pending' ? (
                  <Placeholder note={name.note} size="poster" />
                ) : (
                  name.text
                )}
              </Display>
            </ViewTransition>
            {summary.kind === 'pending' ? (
              <Placeholder note={summary.note} />
            ) : (
              <p className={styles.summary()}>{summary.text}</p>
            )}
            {study.stack.length > 0 ? (
              <div translate="no" className={styles.chips()}>
                {study.stack.map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>
            ) : null}
            {study.url ? (
              <a
                href={study.url}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: 'dark' })}
              >
                {t('visit')}
                <Icon name="arrow-up-right" />
                <span className="sr-only"> {t('newTab')}</span>
              </a>
            ) : null}
          </div>
          {study.shots ? (
            <div className={styles.shot()}>
              <Image
                src={study.shots.desktop.src}
                width={study.shots.desktop.width}
                height={study.shots.desktop.height}
                alt={localize(study.shots.desktop.alt, locale)}
                sizes="(min-width: 68.75rem) 56rem, 90vw"
                priority
                className={styles.shotImage()}
              />
            </div>
          ) : null}
        </Container>
      </Section>
      <Section spacing="continued">
        <Container>
          <div className={styles.body()}>
            {study.sections.map((section) => {
              const body = section.body ? resolve(section.body, locale) : null;
              return (
                <section
                  key={section.id}
                  aria-labelledby={`${study.slug}-${section.id}`}
                  className={styles.block()}
                >
                  <h2 id={`${study.slug}-${section.id}`} className={styles.heading()}>
                    {localize(section.heading, locale)}
                  </h2>
                  {body?.kind === 'pending' ? <Placeholder note={body.note} /> : null}
                  {body?.kind === 'text' ? <p className={styles.text()}>{body.text}</p> : null}
                  {section.list ? (
                    <Bullets>
                      {section.list.map((item) => (
                        <Bullet key={item.en}>{localize(item, locale)}</Bullet>
                      ))}
                    </Bullets>
                  ) : null}
                </section>
              );
            })}
          </div>
          {study.gallery?.map((shot) => (
            <div key={shot.src} className={styles.shot()}>
              <Image
                src={shot.src}
                width={shot.width}
                height={shot.height}
                alt={localize(shot.alt, locale)}
                sizes="(min-width: 68.75rem) 56rem, 90vw"
                className={styles.shotImage()}
              />
            </div>
          ))}
          <div className={styles.next()}>
            <NextCase study={next} locale={locale} label={t('nextCase')} />
          </div>
        </Container>
      </Section>
      <TrophyOnMount event="case-study-opened" />
    </>
  );
}
