import Link from 'next/link';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { resolve, type CaseStudy, type Localized, type Maybe } from '@content/index';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { Label } from '@shared/components/atoms/Label/Label';
import { Placeholder } from '@shared/components/atoms/Placeholder/Placeholder';
import { nextCaseVariants as styles } from './NextCase.variants';

function Text({
  value,
  locale,
  size,
  className,
}: {
  value: Maybe<Localized>;
  locale: Locale;
  size: 'poster' | 'text';
  className: string;
}) {
  const r = resolve(value, locale);
  return r.kind === 'pending' ? (
    <Placeholder note={r.note} size={size} />
  ) : (
    <span className={className}>{r.text}</span>
  );
}

// The "next case study" block; a case still pending reads as dashed placeholders inside it.
export function NextCase({
  study,
  locale,
  label,
}: {
  study: CaseStudy;
  locale: Locale;
  label: string;
}) {
  return (
    <Link
      href={localizedPath(locale, `/projects/${study.slug}`)}
      transitionTypes={['nav-forward']}
      className={styles.root()}
    >
      <span className={styles.text()}>
        <Text value={study.name} locale={locale} size="poster" className={styles.name()} />
        <Text value={study.summary} locale={locale} size="text" className={styles.summary()} />
      </span>
      <span className={styles.cue()}>
        <Label>{label}</Label>
        <Icon name="arrow-right" />
      </span>
    </Link>
  );
}
