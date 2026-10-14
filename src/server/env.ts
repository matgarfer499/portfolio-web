import 'server-only';
import { z } from 'zod';
import { profile } from '@content/index';

export interface ContactEnv {
  apiKey: string | undefined;
  to: string;
  from: string;
}

const schema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO: z.email().default(profile.email),
  // Resend's shared sender works before matiasgarcia.dev is verified (it delivers to the account owner).
  CONTACT_FROM: z.string().min(1).default('Portfolio <onboarding@resend.dev>'),
});

// The only reader of secret env vars; empty strings count as unset.
export function contactEnv(): ContactEnv {
  const raw = Object.fromEntries(
    ['RESEND_API_KEY', 'CONTACT_TO', 'CONTACT_FROM'].map((key) => [
      key,
      process.env[key] || undefined,
    ]),
  );
  const env = schema.parse(raw);
  return { apiKey: env.RESEND_API_KEY, to: env.CONTACT_TO, from: env.CONTACT_FROM };
}
