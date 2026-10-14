import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { TROPHIES } from '../../model';
import type { ShelfLabels } from '../TrophyShelf/TrophyShelf';
import { Trophies } from '../Trophies/Trophies';

// Server half: resolves the strings, so the island ships no translation runtime.
export async function TrophiesSlot({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Trophies' });
  const items = Object.fromEntries(
    TROPHIES.map(({ key }) => [
      key,
      { title: t(`items.${key}.title`), description: t(`items.${key}.description`) },
    ]),
  ) as ShelfLabels['items'];
  return (
    <Trophies
      labels={{
        openShelf: t('openShelf'),
        counter: t.raw('counter') as string,
        unlocked: t('unlocked'),
        shelf: t('shelf'),
        close: t('close'),
        locked: t('locked'),
        sound: t('sound'),
        reset: t('reset'),
        items,
      }}
    />
  );
}
