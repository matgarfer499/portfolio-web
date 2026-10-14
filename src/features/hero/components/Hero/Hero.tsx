import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { hero, localize, profile } from '@content/index';
import { buttonVariants } from '@shared/components/atoms/Button/Button.variants';
import { Container } from '@shared/components/atoms/Container/Container';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { yearsSince } from '../../model';
import { HeroName } from '../HeroName/HeroName';
import { HeroPhoto } from '../HeroPhoto/HeroPhoto';
import { heroVariants as styles } from './Hero.variants';

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Hero' });
  const { roleLine } = hero;
  const stats = [
    {
      value: t('yearsPlus', { count: yearsSince(profile.careerSince, new Date()) }),
      label: hero.yearsLabel,
    },
    ...hero.stats,
  ];

  return (
    <section id="top" className={styles.root()}>
      <Container>
        <div className={styles.meta()}>
          <span>{localize(profile.role, locale)}</span>
          <span>{localize(profile.location, locale)}</span>
        </div>
        <HeroName name={profile.name} />
        <div className={styles.grid()}>
          <div className={styles.intro()}>
            <p className={styles.role()}>
              <span className={styles.firstLine()}>{localize(roleLine.before, locale)}</span>
              <mark className={styles.mark()}>{localize(roleLine.mark, locale)}</mark>
              {localize(roleLine.after, locale)}
            </p>
            <p className={styles.lede()}>{localize(hero.lede, locale)}</p>
            <div className={styles.ctas()}>
              <a href="#contact" className={buttonVariants({ variant: 'volt' })}>
                {t('getInTouch')}
                <Icon name="arrow-right" />
              </a>
              <Link
                href={localizedPath(locale, '/cv')}
                transitionTypes={['nav-forward']}
                className={buttonVariants()}
              >
                {t('viewCv')}
              </Link>
            </div>
            <dl className={styles.stats()}>
              {stats.map((stat) => (
                <div key={stat.label.en} className={styles.stat()}>
                  <dt className={styles.statLabel()}>{localize(stat.label, locale)}</dt>
                  <dd className={styles.statValue()}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroPhoto locale={locale} />
        </div>
      </Container>
    </section>
  );
}
