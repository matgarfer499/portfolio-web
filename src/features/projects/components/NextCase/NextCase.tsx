import Link from 'next/link';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { localize, type CaseStudy } from '@content/index';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { Label } from '@shared/components/atoms/Label/Label';
import { nextCaseVariants as styles } from './NextCase.variants';

// The "next case study" block: the case name and summary, then the cue.
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
        <span className={styles.name()}>{localize(study.name, locale)}</span>
        <span className={styles.summary()}>{localize(study.summary, locale)}</span>
      </span>
      <span className={styles.cue()}>
        <Label>{label}</Label>
        <Icon name="arrow-right" />
      </span>
    </Link>
  );
}
