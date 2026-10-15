import type { Locale } from '@/i18n/routing';
import { hero, localize } from '@content/index';
import { heroWordsVariants as styles } from './HeroWords.variants';

const TONES = ['outline', 'solid', 'volt'] as const;

// The hero's poster block: build (outlined), lead (solid), ship (on volt), each with its proof.
// A real list, so screen readers hear each verb followed by what backs it up.
export function HeroWords({ locale }: { locale: Locale }) {
  return (
    <ul className={styles.root()}>
      {hero.words.map((item, i) => {
        const tone = TONES[i] ?? 'solid';
        return (
          <li key={item.id} className={styles.row({ tone })}>
            <span className={styles.word({ tone })}>{localize(item.word, locale)}</span>
            <span className={styles.proof()}>{localize(item.proof, locale)}</span>
          </li>
        );
      })}
    </ul>
  );
}
