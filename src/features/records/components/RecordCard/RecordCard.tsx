import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { localize, type RecordItem } from '@content/index';
import { Label } from '@shared/components/atoms/Label/Label';
import { formatCount, improvement } from '../../model';
import { recordCardVariants as styles } from './RecordCard.variants';

// The server renders the final numbers and the drawn strike; RecordsMotion may rewind them.
// Screen readers get one reading ("Before: 90 s, Now: 1 s, 90× faster"); the animated digits are hidden.
export async function RecordCard({ record, locale }: { record: RecordItem; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Records' });
  const { before, after } = record;
  const gain = improvement(record);
  const withUnit = (value: number, unit?: string) =>
    unit ? `${formatCount(value, locale)} ${unit}` : formatCount(value, locale);

  return (
    <article data-record className={styles.root()}>
      <Label>{localize(record.label, locale)}</Label>
      <span className={styles.before()}>
        <span className="sr-only">{t('before')}: </span>
        {withUnit(before.value, before.unit)}
        <span aria-hidden className={styles.strike()} />
      </span>
      <div className={styles.after()}>
        <span className="sr-only">
          {t('after')}: {withUnit(after.value, after.unit)}
        </span>
        <span aria-hidden data-count data-from={before.value} data-to={after.value}>
          {formatCount(after.value, locale)}
        </span>
        {after.unit ? (
          <small aria-hidden className={styles.unit()}>
            {after.unit}
          </small>
        ) : null}
      </div>
      <span className={styles.badge()}>{t(gain.kind, { value: gain.value })}</span>
      <p className={styles.note()}>{localize(record.note, locale)}</p>
    </article>
  );
}
