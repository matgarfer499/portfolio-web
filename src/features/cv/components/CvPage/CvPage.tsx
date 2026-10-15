import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { experience, hero, localize, localizeRich, profile, projects } from '@content/index';
import { buttonVariants } from '@shared/components/atoms/Button/Button.variants';
import { Bullet, Bullets } from '@shared/components/atoms/Bullets/Bullets';
import { Container } from '@shared/components/atoms/Container/Container';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { Section } from '@shared/components/atoms/Section/Section';
import { TrophyOnMount } from '@shared/components/atoms/TrophyOnMount/TrophyOnMount';
import { cvPeriod } from '../../model';
import { cvPageVariants as styles } from './CvPage.variants';

// The CV is the same content as the site, one column, printable as A4.
export async function CvPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Cv' });
  const work = experience.filter((entry) => entry.kind !== 'education');
  const education = experience.filter((entry) => entry.kind === 'education');

  return (
    <Section spacing="tight">
      <Container>
        <article className={styles.sheet()}>
          <div className={styles.tools()}>
            <a
              href={profile.cv}
              download="Matias-Garcia-CV.pdf"
              className={buttonVariants({ variant: 'dark' })}
            >
              <Icon name="download" />
              {t('print')}
            </a>
            <Link
              href={localizedPath(locale, '/')}
              transitionTypes={['nav-back']}
              className={styles.link()}
            >
              <Icon name="arrow-left" />
              {t('back')}
            </Link>
          </div>

          <header className={styles.head()}>
            <h1 className={styles.name()}>{profile.fullName}</h1>
            <p className={styles.role()}>{localize(profile.role, locale)}</p>
            <p translate="no" className={styles.contact()}>
              <span>{localize(profile.location, locale)}</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              {profile.socials.map((social) => (
                <a key={social.id} href={social.href} target="_blank" rel="noreferrer">
                  {social.href.replace(/^https:\/\/(www\.)?/, '')}
                </a>
              ))}
            </p>
          </header>

          <section aria-labelledby="cv-profile" className={styles.section()}>
            <h2 id="cv-profile" className={styles.heading()}>
              {t('profile')}
            </h2>
            <p className={styles.text()}>{localize(hero.lede, locale)}</p>
          </section>

          <section aria-labelledby="cv-experience" className={styles.section()}>
            <h2 id="cv-experience" className={styles.heading()}>
              {t('experience')}
            </h2>
            {work.map((entry) => (
              <div key={entry.id} className={styles.entry()}>
                <p className={styles.period()}>{cvPeriod(entry, locale, t('now'))}</p>
                <div>
                  <h3 className={styles.title()}>
                    {localize(entry.role, locale)} · {entry.team.name}
                  </h3>
                  <p className={styles.meta()}>{localize(entry.place, locale)}</p>
                  <Bullets className={styles.list()}>
                    {entry.bullets.map((bullet, i) => (
                      <Bullet key={i}>{localizeRich(bullet, locale)}</Bullet>
                    ))}
                  </Bullets>
                </div>
              </div>
            ))}
          </section>

          <section aria-labelledby="cv-projects" className={styles.section()}>
            <h2 id="cv-projects" className={styles.heading()}>
              {t('projects')}
            </h2>
            {projects.caseStudies.map((study) => (
              <div key={study.slug} className={styles.project()}>
                <h3 className={styles.title()}>
                  {localize(study.name, locale)}
                  <span className={styles.meta()}>
                    {' · '}
                    {localize(study.tagline, locale)}
                  </span>
                </h3>
                <p className={styles.text()}>{localize(study.summary, locale)}</p>
                <p translate="no" className={styles.stack()}>
                  {study.stack.join(' · ')}
                </p>
              </div>
            ))}
          </section>

          <section aria-labelledby="cv-skills" className={styles.section()}>
            <h2 id="cv-skills" className={styles.heading()}>
              {t('skills')}
            </h2>
            <dl className={styles.pairs()}>
              {projects.stack.map((group) => (
                <div key={group.id} className={styles.entry()}>
                  <dt className={styles.period()}>{localize(group.title, locale)}</dt>
                  <dd translate="no" className={styles.text()}>
                    {group.items.join(', ')}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="cv-education" className={styles.section()}>
            <h2 id="cv-education" className={styles.heading()}>
              {t('education')}
            </h2>
            {education.map((entry) => (
              <div key={entry.id} className={styles.entry()}>
                <p className={styles.period()}>{cvPeriod(entry, locale, t('now'))}</p>
                <div>
                  <h3 className={styles.title()}>{localize(entry.role, locale)}</h3>
                  <p className={styles.meta()}>
                    {entry.team.name} · {localize(entry.place, locale)}
                  </p>
                </div>
              </div>
            ))}
          </section>

          <section aria-labelledby="cv-languages" className={styles.section()}>
            <h2 id="cv-languages" className={styles.heading()}>
              {t('languages')}
            </h2>
            <dl className={styles.pairs()}>
              {profile.languages.map((language) => (
                <div key={language.name.en} className={styles.entry()}>
                  <dt className={styles.period()}>{localize(language.name, locale)}</dt>
                  <dd className={styles.text()}>{localize(language.level, locale)}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </Container>
      <TrophyOnMount event="cv-opened" />
    </Section>
  );
}
