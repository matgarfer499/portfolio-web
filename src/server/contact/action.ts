'use server';

import 'server-only';
import { headers } from 'next/headers';
import { contactEnv } from '../env';
import { handleContact, type ContactResult } from './handle';
import { createRateLimit } from './rate-limit';
import { sendWithResend } from './resend';

const allow = createRateLimit({ limit: 3, windowMs: 10 * 60_000 });

export async function sendMessage(
  _previous: ContactResult,
  data: FormData,
): Promise<ContactResult> {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  return handleContact(data, {
    env: contactEnv(),
    allow: () => allow(ip, Date.now()),
    send: (email) => sendWithResend(email),
  });
}
