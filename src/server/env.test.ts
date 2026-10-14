import { afterEach, describe, expect, it, vi } from 'vitest';
import { contactEnv } from './env';

afterEach(() => vi.unstubAllEnvs());

describe('contactEnv', () => {
  it('falls back to the public address and Resend’s shared sender, with no key', () => {
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('CONTACT_TO', '');
    vi.stubEnv('CONTACT_FROM', '');
    expect(contactEnv()).toEqual({
      apiKey: undefined,
      to: 'mjgarciadev14@gmail.com',
      from: 'Portfolio <onboarding@resend.dev>',
    });
  });

  it('reads the key and addresses the owner sets', () => {
    vi.stubEnv('RESEND_API_KEY', 're_123');
    vi.stubEnv('CONTACT_TO', 'inbox@example.com');
    vi.stubEnv('CONTACT_FROM', 'Matías <hi@matiasgarcia.dev>');
    expect(contactEnv()).toEqual({
      apiKey: 're_123',
      to: 'inbox@example.com',
      from: 'Matías <hi@matiasgarcia.dev>',
    });
  });

  it('treats a malformed value as unconfigured, so visitors get the mailto fallback', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('RESEND_API_KEY', 're_123');
    vi.stubEnv('CONTACT_TO', 'not-an-email');
    expect(contactEnv()).toMatchObject({ apiKey: undefined, to: 'mjgarciadev14@gmail.com' });
    expect(console.error).toHaveBeenCalled();
  });
});
