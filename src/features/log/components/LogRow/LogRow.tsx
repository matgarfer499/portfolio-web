import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { Locale } from '@/i18n/routing';
import { localize, profile, resolve, resolveRich, type LogEntry } from '@content/index';
import { Bullet, Bullets } from '@shared/components/atoms/Bullets/Bullets';
import { Chip } from '@shared/components/atoms/Chip/Chip';
import { Placeholder } from '@shared/components/atoms/Placeholder/Placeholder';
import { formatWhen } from '../../model';
import { LogDisclosure } from '../LogDisclosure/LogDisclosure';
import { logRowVariants as styles } from './LogRow.variants';

// Column heads are visual only (≥ board); each cell repeats its column name for screen readers.
export async function LogRow({ entry, locale }: { entry: LogEntry; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Log' });
  const when = formatWhen(entry, localize(entry.place, locale), locale, t('now'));
  const since = entry.roleSince ? resolve(entry.roleSince, locale) : null;
  const chips = entry.showLanguages
    ? profile.languages.map(
        ({ name, level }) => `${localize(name, locale)} · ${localize(level, locale)}`,
      )
    : entry.chips;

  return (
    <article data-reveal aria-labelledby={`log-${entry.id}`} className={styles.root()}>
      <p className={styles.when()}>
        <span className="sr-only">{t('columns.when')}: </span>
        {when.big}
        <small className={styles.whenSmall()}>{when.small}</small>
      </p>
      <div translate="no" className={styles.team()}>
        <span className="sr-only">{t('columns.team')}: </span>
        {entry.team.logo ? (
          <span className={styles.logo()}>
            <Image
              src={entry.team.logo.src}
              width={entry.team.logo.width}
              height={entry.team.logo.height}
              alt={entry.team.name}
              sizes="10rem"
              className={styles.logoImage()}
            />
          </span>
        ) : (
          <b className={styles.teamName()}>{entry.team.name}</b>
        )}
      </div>
      <div className={styles.head()}>
        <h3 id={`log-${entry.id}`} className={styles.role()}>
          {localize(entry.role, locale)}
        </h3>
        {since ? (
          <p className={styles.since()}>
            {t('roleSince')}{' '}
            {since.kind === 'pending' ? <Placeholder note={since.note} /> : since.text}
          </p>
        ) : null}
      </div>
      <LogDisclosure
        id={`log-${entry.id}-details`}
        labels={{ show: t('showDetails'), hide: t('hideDetails') }}
      >
        <Bullets className={styles.list()}>
          {entry.bullets.map((bullet, i) => (
            <Bullet key={i}>
              {resolveRich(bullet, locale).map((part, j) =>
                part.kind === 'pending' ? (
                  <Placeholder key={j} note={part.note} />
                ) : (
                  <span key={j}>{part.text} </span>
                ),
              )}
            </Bullet>
          ))}
        </Bullets>
        {chips.length > 0 ? (
          <div translate={entry.showLanguages ? undefined : 'no'} className={styles.chips()}>
            <span className="sr-only">{t('columns.equipment')}: </span>
            {chips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
        ) : null}
      </LogDisclosure>
    </article>
  );
}
