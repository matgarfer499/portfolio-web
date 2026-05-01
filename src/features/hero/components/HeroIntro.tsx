import { staggerDelay } from '@shared/lib';
import { Eyebrow, Heading, Text } from '@shared/ui';

export function HeroIntro() {
  return (
    <div className="flex flex-col gap-4">
      <div className="motion-safe:animate-fade-up" style={staggerDelay(0)}>
        <Eyebrow>Full-stack engineer · Málaga, ES</Eyebrow>
      </div>

      <div className="motion-safe:animate-fade-up" style={staggerDelay(1)}>
        <Heading level={1} className="max-w-xl">
          Matías García
        </Heading>
      </div>

      <div className="motion-safe:animate-fade-up" style={staggerDelay(2)}>
        <Text variant="lead" className="max-w-lg">
          Integrating AI into how teams ship — building end-to-end products and leading the people
          who deliver them.
        </Text>
      </div>

      <div className="motion-safe:animate-fade-up" style={staggerDelay(3)}>
        <Text variant="body" className="text-fg-muted max-w-prose">
          I help teams adopt AI in their day-to-day shipping — from automating boring loops to
          wiring intelligent steps into existing pipelines.
        </Text>
      </div>
    </div>
  );
}
