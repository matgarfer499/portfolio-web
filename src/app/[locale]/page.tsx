import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { localize, profile, zones } from '@content/index';
import { routing } from '@/i18n/routing';
import { HomeExperience } from './_components/HomeExperience';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const localizedZones = zones.map((zone) => ({
    id: zone.id,
    name: localize(zone.name, locale),
    heading: localize(zone.heading, locale),
    body: localize(zone.body, locale),
  }));

  return (
    <HomeExperience
      name={profile.name}
      role={localize(profile.role, locale)}
      hook={localize(profile.hook, locale)}
      summary={localize(profile.summary, locale)}
      location={localize(profile.location, locale)}
      zones={localizedZones}
    />
  );
}
