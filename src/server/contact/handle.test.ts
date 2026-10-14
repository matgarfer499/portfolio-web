import { describe, expect, it, vi } from 'vitest';
import { handleContact, type ContactDeps } from './handle';

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};
const valid = { name: 'Ada', email: 'ada@example.com', message: 'Hello, let us build it.' };

const deps = (overrides: Partial<ContactDeps> = {}): ContactDeps => ({
  env: { apiKey: 're_test', to: 'me@example.com', from: 'Portfolio <onboarding@resend.dev>' },
  allow: () => true,
  send: vi.fn().mockResolvedValue(true),
  ...overrides,
});

describe('handleContact', () => {
  it('sends a valid message, replying to the visitor', async () => {
    const d = deps();
    await expect(handleContact(form(valid), d)).resolves.toEqual({ status: 'sent' });
    expect(d.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'me@example.com',
        replyTo: 'ada@example.com',
        text: valid.message,
      }),
    );
  });

  it('returns field errors without sending', async () => {
    const d = deps();
    const result = await handleContact(form({ ...valid, email: 'x' }), d);
    expect(result).toMatchObject({
      status: 'error',
      reason: 'invalid',
      fieldErrors: { email: 'email' },
    });
    expect(d.send).not.toHaveBeenCalled();
  });

  it('pretends a bot message was sent and drops it', async () => {
    const d = deps();
    await expect(handleContact(form({ ...valid, website: 'x' }), d)).resolves.toEqual({
      status: 'sent',
    });
    expect(d.send).not.toHaveBeenCalled();
  });

  it('stops a visitor over the rate limit', async () => {
    const result = await handleContact(form(valid), deps({ allow: () => false }));
    expect(result).toMatchObject({ status: 'error', reason: 'rateLimited' });
  });

  it('without an API key hands the values back for the mailto fallback', async () => {
    const d = deps({ env: { apiKey: undefined, to: 'me@example.com', from: 'x' } });
    await expect(handleContact(form(valid), d)).resolves.toEqual({
      status: 'error',
      reason: 'unconfigured',
      values: valid,
    });
    expect(d.send).not.toHaveBeenCalled();
  });

  it('reports a failed send and keeps the values', async () => {
    const result = await handleContact(
      form(valid),
      deps({ send: vi.fn().mockResolvedValue(false) }),
    );
    expect(result).toEqual({ status: 'error', reason: 'failed', values: valid });
  });
});
