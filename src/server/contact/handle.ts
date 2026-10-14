import type { ContactEnv } from '../env';
import { parseContact, type ContactValues, type FieldErrors } from './schema';
import type { OutgoingEmail } from './resend';

export type ContactResult =
  | { status: 'idle' | 'sent' }
  | { status: 'error'; reason: 'invalid'; fieldErrors: FieldErrors; values: ContactValues }
  | { status: 'error'; reason: 'rateLimited' }
  | { status: 'error'; reason: 'unconfigured' | 'failed'; values: ContactValues };

export interface ContactDeps {
  env: ContactEnv;
  allow: () => boolean;
  send: (email: OutgoingEmail) => Promise<boolean>;
}

// The whole contact flow with its I/O injected; action.ts wires the real request, env and sender.
export async function handleContact(data: FormData, deps: ContactDeps): Promise<ContactResult> {
  const parsed = parseContact(data);
  if (!parsed.ok) return { status: 'error', reason: 'invalid', ...parsed };
  if (parsed.bot) return { status: 'sent' };
  if (!deps.allow()) return { status: 'error', reason: 'rateLimited' };
  const values = parsed.data;
  const { apiKey, from, to } = deps.env;
  if (!apiKey) return { status: 'error', reason: 'unconfigured', values };
  const sent = await deps.send({
    apiKey,
    from,
    to,
    replyTo: values.email,
    subject: `Portfolio — ${values.name}`,
    text: values.message,
  });
  return sent ? { status: 'sent' } : { status: 'error', reason: 'failed', values };
}
