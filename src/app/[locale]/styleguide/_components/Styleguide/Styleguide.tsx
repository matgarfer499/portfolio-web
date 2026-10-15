import { Button } from '@shared/components/atoms/Button/Button';
import { buttonVariants } from '@shared/components/atoms/Button/Button.variants';
import { Chip } from '@shared/components/atoms/Chip/Chip';
import { Container } from '@shared/components/atoms/Container/Container';
import { Display } from '@shared/components/atoms/Display/Display';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { ICONS, type IconName } from '@shared/components/atoms/Icon/icons';
import { Label } from '@shared/components/atoms/Label/Label';
import { Section } from '@shared/components/atoms/Section/Section';
import { cn } from '@shared/lib/cn';
import { SWATCHES, styleguideVariants as styles } from './Styleguide.variants';

const ICON_NAMES = Object.keys(ICONS) as IconName[];

function Buttons() {
  return (
    <div className={styles.row()}>
      <Button>Default</Button>
      <Button variant="volt">
        Get in touch <Icon name="arrow-right" />
      </Button>
      <Button variant="dark">Copy email</Button>
      <Button size="sm" variant="volt">
        Hire me
      </Button>
      <a className={buttonVariants()} href="#buttons">
        Link as button
      </a>
      <Button disabled>Disabled</Button>
    </div>
  );
}

export function Styleguide() {
  return (
    <main className={styles.root()}>
      <Container className={styles.bar()}>
        <Label tone="ink">PR Board · styleguide (dev only)</Label>
      </Container>

      <Section id="type">
        <Container className={styles.block()}>
          <Display as="h1" size="hero">
            Matías García
          </Display>
          <Display size="section">Personal records</Display>
          <Display as="p" size="card">
            Chefory
          </Display>
          <Display as="p" size="lg">
            [Product you led]
          </Display>
          <Display as="p" size="stat">
            2+ yrs
          </Display>
          <div className={styles.row()}>
            <Label>Default label</Label>
            <Label tone="ink">Ink label</Label>
          </div>
          <p className={styles.body()}>
            Lede in steel. Full stack developer building simple, fast and enjoyable web apps.
          </p>
          <p className={styles.longform()}>
            Long-form copy in ink-soft. I like building things that make people&apos;s lives easier:
            clean, intuitive and meaningful.
          </p>
        </Container>
      </Section>

      <Section id="colours" spacing="tight">
        <Container className={styles.grid()}>
          {Object.entries(SWATCHES).map(([name, bg]) => (
            <div key={name} className={styles.swatch()}>
              <div className={cn(styles.chip(), bg)} />
              {name}
            </div>
          ))}
        </Container>
      </Section>

      <Section id="buttons" spacing="tight">
        <Container className={styles.block()}>
          <Buttons />
          <div className={styles.row()}>
            <Chip>Django</Chip>
            <Chip>SvelteKit</Chip>
            <Chip>English · B2 First</Chip>
          </div>
        </Container>
      </Section>

      <Section id="night" tone="night">
        <Container className={styles.block()}>
          <Display size="section">Night board</Display>
          <Label>API response time</Label>
          <Buttons />
        </Container>
      </Section>

      <Section id="volt" tone="volt">
        <Container className={styles.block()}>
          <Display size="section">Volt band</Display>
          <Buttons />
        </Container>
      </Section>

      <Section id="icons" spacing="tight">
        <Container className={styles.grid()}>
          {ICON_NAMES.map((name) => (
            <div key={name} className={styles.icon()}>
              <Icon name={name} size="lg" />
              {name}
            </div>
          ))}
        </Container>
      </Section>
    </main>
  );
}
