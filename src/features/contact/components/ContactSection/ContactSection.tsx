import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { contact, localize, profile } from '@content/index';
import { buttonVariants } from '@shared/components/atoms/Button/Button.variants';
import { Container } from '@shared/components/atoms/Container/Container';
import { Display } from '@shared/components/atoms/Display/Display';
import { Label } from '@shared/components/atoms/Label/Label';
import { Section } from '@shared/components/atoms/Section/Section';
import { cn } from '@shared/lib/cn';
import { Availability } from '../Availability/Availability';
import { ContactForm } from '../ContactForm/ContactForm';
import { CopyEmail } from '../CopyEmail/CopyEmail';
import { Magnetic } from '../Magnetic/Magnetic';
import { contactSectionVariants as styles } from './ContactSection.variants';

export async function ContactSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Contact' });
  const link = cn(buttonVariants(), styles.link());

  return (
    <Section
      id="contact"
      tone="volt"
      spacing="footed"
      aria-labelledby="contact-title"
      className={styles.root()}
    >
      <Container className={styles.layout()}>
        <div className={styles.reach()}>
          <Display id="contact-title" size="section">
            {contact.headline.map((line, i) => (
              <span key={line.en}>
                {i > 0 ? <br /> : null}
                {localize(line, locale)}
              </span>
            ))}
          </Display>
          <div>
            <Label as="p" tone="ink" className={styles.label()}>
              {t('email')}
            </Label>
            <CopyEmail
              email={profile.email}
              labels={{ copy: t('copy'), copied: t('copied'), selected: t('selected') }}
            />
            <Availability
              open={profile.availability.status === 'open'}
              label={localize(profile.availability.label, locale)}
            />
          </div>
          <Magnetic className={styles.social()}>
            {profile.socials.map((social) => (
              <a key={social.id} href={social.href} translate="no" className={link}>
                {social.label}
              </a>
            ))}
            <Link
              href={localizedPath(locale, '/cv')}
              transitionTypes={['nav-forward']}
              className={link}
            >
              {t('cv')}
            </Link>
          </Magnetic>
        </div>
        <ContactForm
          to={profile.email}
          labels={{
            title: t('form.title'),
            name: t('form.name'),
            email: t('form.email'),
            message: t('form.message'),
            send: t('form.send'),
            sending: t('form.sending'),
            sent: t('form.sent'),
            honeypot: t('form.honeypot'),
            unconfigured: t('form.unconfigured'),
            openMail: t('form.openMail'),
            errors: {
              name: t('form.errors.name'),
              email: t('form.errors.email'),
              message: t('form.errors.message'),
              rateLimited: t('form.errors.rateLimited'),
              failed: t('form.errors.failed'),
            },
          }}
        />
      </Container>
    </Section>
  );
}
