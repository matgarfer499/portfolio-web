import { describe, expect, it } from 'vitest';
import { parseContact } from './schema';

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};
const valid = { name: '  Ada  ', email: 'ada@example.com', message: 'Hello, let us build it.' };

describe('parseContact', () => {
  it('accepts a complete message and trims it', () => {
    expect(parseContact(form(valid))).toEqual({
      ok: true,
      data: { name: 'Ada', email: 'ada@example.com', message: 'Hello, let us build it.' },
      bot: false,
    });
  });

  it('reports every invalid field as a code', () => {
    const result = parseContact(form({ name: ' ', email: 'nope', message: 'short' }));
    expect(result).toEqual({
      ok: false,
      fieldErrors: { name: 'name', email: 'email', message: 'message' },
      values: { name: '', email: 'nope', message: 'short' },
    });
  });

  it('treats missing fields as empty, not as a crash', () => {
    const result = parseContact(new FormData());
    expect(result.ok).toBe(false);
  });

  it('flags a filled honeypot as a bot', () => {
    const result = parseContact(form({ ...valid, website: 'http://spam.example' }));
    expect(result).toMatchObject({ ok: true, bot: true });
  });
});
