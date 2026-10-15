'use client';

import Link from 'next/link';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { useActiveSection } from '@shared/hooks/useActiveSection';
import { SECTIONS, type SectionId } from '../../model';
import { sectionNavVariants as styles } from './SectionNav.variants';

export function SectionNav({
  locale,
  labels,
  label,
}: {
  locale: Locale;
  labels: Record<SectionId, string>;
  label: string;
}) {
  const active = useActiveSection(SECTIONS);
  return (
    <nav aria-label={label} className={styles.root()}>
      {SECTIONS.map((id) => (
        <Link
          key={id}
          href={localizedPath(locale, `/#${id}`)}
          className={styles.link()}
          aria-current={active === id ? 'location' : undefined}
        >
          {labels[id]}
        </Link>
      ))}
    </nav>
  );
}
