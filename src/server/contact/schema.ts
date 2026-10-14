import { z } from 'zod';

export type ContactField = 'name' | 'email' | 'message';
export type ContactValues = Record<ContactField, string>;
export type FieldErrors = Partial<Record<ContactField, ContactField>>;

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.email().max(200),
  message: z.string().min(10).max(5000),
});

const read = (data: FormData, key: string): string => {
  const value = data.get(key);
  return typeof value === 'string' ? value : '';
};

// Errors are field codes; the form island turns them into localized messages.
export function parseContact(
  data: FormData,
):
  | { ok: true; data: ContactValues; bot: boolean }
  | { ok: false; fieldErrors: FieldErrors; values: ContactValues } {
  const values = {
    name: read(data, 'name').trim(),
    email: read(data, 'email').trim(),
    message: read(data, 'message').trim(),
  };
  const result = schema.safeParse(values);
  if (result.success) return { ok: true, data: result.data, bot: read(data, 'website') !== '' };
  const fieldErrors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField;
    fieldErrors[field] = field;
  }
  return { ok: false, fieldErrors, values };
}
