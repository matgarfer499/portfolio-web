import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { profile } from '@content/index';
import { routing } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <main>
      <h1>{profile.name}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
