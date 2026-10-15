import { describe, expect, it, vi } from 'vitest';
import { sendWithResend } from './resend';

const email = {
  apiKey: 're_test',
  from: 'Portfolio <onboarding@resend.dev>',
  to: 'me@example.com',
  replyTo: 'ada@example.com',
  subject: 'Portfolio — Ada',
  text: 'Hello',
};

describe('sendWithResend', () => {
  it('posts the email to the Resend API with the key as a bearer token', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('{"id":"1"}', { status: 200 }));
    await expect(sendWithResend(email, fetcher)).resolves.toBe(true);
    const [url, init] = fetcher.mock.calls[0]!;
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.method).toBe('POST');
    expect(init.headers.Authorization).toBe('Bearer re_test');
    expect(JSON.parse(init.body)).toEqual({
      from: email.from,
      to: [email.to],
      reply_to: email.replyTo,
      subject: email.subject,
      text: email.text,
    });
  });

  it('fails on a non-2xx answer or a network error, without throwing', async () => {
    const refused = vi.fn().mockResolvedValue(new Response('{}', { status: 422 }));
    await expect(sendWithResend(email, refused)).resolves.toBe(false);
    const offline = vi.fn().mockRejectedValue(new TypeError('fetch failed'));
    await expect(sendWithResend(email, offline)).resolves.toBe(false);
  });
});
