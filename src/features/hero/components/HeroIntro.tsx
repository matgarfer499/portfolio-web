import { Eyebrow, Heading, Text } from '@shared/ui';

const STAGGER_DELAYS = ['0ms', '80ms', '160ms', '240ms'] as const;

export function HeroIntro() {
  return (
    <div className="flex flex-col gap-4">
      <div className="motion-safe:animate-fade-up" style={{ animationDelay: STAGGER_DELAYS[0] }}>
        <Eyebrow>Matías García · Málaga, ES</Eyebrow>
      </div>

      <div className="motion-safe:animate-fade-up" style={{ animationDelay: STAGGER_DELAYS[1] }}>
        <Heading level={1} className="max-w-xl">
          Full-stack engineer integrating AI into how teams ship.
        </Heading>
      </div>

      <div className="motion-safe:animate-fade-up" style={{ animationDelay: STAGGER_DELAYS[2] }}>
        <Text variant="lead" className="max-w-lg">
          I build end-to-end products and lead the people who ship them — with a focus on wiring AI
          into real workflows so teams spend their time building, not toiling.
        </Text>
      </div>

      <div className="motion-safe:animate-fade-up" style={{ animationDelay: STAGGER_DELAYS[3] }}>
        <Text variant="body" className="text-fg-muted max-w-prose">
          I help teams adopt AI in their day-to-day shipping — from automating boring loops to
          wiring intelligent steps into existing pipelines.
        </Text>
      </div>
    </div>
  );
}
