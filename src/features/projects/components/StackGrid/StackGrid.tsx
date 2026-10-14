import type { Locale } from '@/i18n/routing';
import { localize, projects } from '@content/index';
import { labelVariants } from '@shared/components/atoms/Label/Label.variants';
import { cn } from '@shared/lib/cn';
import { stackGridVariants as styles } from './StackGrid.variants';

export function StackGrid({ locale, title }: { locale: Locale; title: string }) {
  return (
    <div data-reveal className={styles.root()}>
      <h3 className={cn(labelVariants(), styles.heading())}>{title}</h3>
      <div className={styles.grid()}>
        {projects.stack.map((group) => (
          <div key={group.id} className={styles.cell()}>
            <b className={styles.title()}>{localize(group.title, locale)}</b>
            <span translate="no" className={styles.items()}>
              {group.items.join(', ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
