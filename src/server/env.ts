import 'server-only';
import { z } from 'zod';
import { profile } from '@content/index';

export interface ContactEnv {
  apiKey: string | undefined;
  to: string;
  from: string;
}

const DEFAULT_FROM = 'Portfolio <onboarding@resend.dev>';

const schema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO: z.email().default(profile.email),
  // Resend's shared sender works before matiasgarcia.dev is verified (it delivers to the account owner).
  CONTACT_FROM: z.string().min(1).default(DEFAULT_FROM),
});

// The only reader of secret env vars; empty strings count as unset. A broken value degrades the
// form to its mailto fallback (and is logged) instead of failing the visitor's submit.
export function contactEnv(): ContactEnv {
  const raw = Object.fromEntries(
    ['RESEND_API_KEY', 'CONTACT_TO', 'CONTACT_FROM'].map((key) => [
      key,
      process.env[key] || undefined,
    ]),
  );
  const env = schema.safeParse(raw);
  if (!env.success) {
    console.error(
      'Contact env is invalid; the form falls back to mailto.',
      z.prettifyError(env.error),
    );
    return { apiKey: undefined, to: profile.email, from: DEFAULT_FROM };
  }
  return { apiKey: env.data.RESEND_API_KEY, to: env.data.CONTACT_TO, from: env.data.CONTACT_FROM };
}
