import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { localize, profile, projects, zones } from '@content/index';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { LanguageSwitch } from '@shared/ui';

interface FastPageProps {
  params: Promise<{ locale: string }>;
}

const cardClass = 'rounded-2xl border border-white/10 bg-surface/60 p-5';
const sectionHeading = 'font-mono text-sm uppercase tracking-[0.2em] text-flame';
const link = 'text-ink underline-offset-4 hover:text-azure hover:underline';

/**
 * The fast layer: the exact same content as the game, server-rendered as semantic,
 * keyboard-navigable, indexable HTML. This is what mobile visitors and crawlers get.
 */
export default async function FastPage({ params }: FastPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations('Fast');

  return (
    <main data-testid="fast-page" className="mx-auto min-h-dvh w-full max-w-3xl px-5 py-14">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-flame rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs tracking-[0.2em] uppercase">
          {t('badge')}
        </span>
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <Link href="/" className="text-azure font-mono text-xs hover:underline">
            {t('playGame')}
          </Link>
        </div>
      </header>

      <section className="mt-12">
        <p className="text-azure font-mono text-sm tracking-[0.2em] uppercase">
          {localize(profile.role, locale)} · {localize(profile.location, locale)}
        </p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{profile.name}</h1>
        <p className="text-ink/90 mt-4 text-xl">{localize(profile.hook, locale)}</p>
        <p className="text-muted mt-3 text-base">{localize(profile.summary, locale)}</p>
        <p className="text-muted mt-6 text-sm">{t('intro')}</p>
      </section>

      <section className="mt-12" aria-labelledby="zones-heading">
        <h2 id="zones-heading" className={sectionHeading}>
          {t('exploreHeading')}
        </h2>
        <ul className="mt-4 space-y-4">
          {zones.map((zone) => (
            <li key={zone.id} className={cardClass}>
              <h3 className="text-lg font-semibold">{localize(zone.heading, locale)}</h3>
              <p className="text-muted mt-2 text-sm">{localize(zone.body, locale)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className={sectionHeading}>
          {t('projectsHeading')}
        </h2>
        <ul className="mt-4 space-y-4">
          {projects.map((project) => (
            <li key={project.id} className={cardClass}>
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-azure text-sm">{localize(project.tagline, locale)}</p>
              <p className="text-muted mt-2 text-sm">{localize(project.description, locale)}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="text-muted rounded-full border border-white/10 px-2.5 py-1 font-mono text-xs"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className={sectionHeading}>
          {t('contactHeading')}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-4 text-sm">
          <li>
            <a className={link} href={`mailto:${profile.email}`}>
              {t('emailLabel')}
            </a>
          </li>
          <li>
            <a
              className={link}
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('githubLabel')}
            </a>
          </li>
          <li>
            <a
              className={link}
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('linkedinLabel')}
            </a>
          </li>
          <li>
            <a className={link} href={profile.cvUrl} download>
              {t('cvLabel')}
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
