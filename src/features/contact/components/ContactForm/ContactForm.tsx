'use client';

import { useActionState, useEffect, useRef } from 'react';
import { sendMessage } from '@/server/contact/action';
import type { ContactResult } from '@/server/contact/handle';
import type { ContactField } from '@/server/contact/schema';
import { Button } from '@shared/components/atoms/Button/Button';
import { cn } from '@shared/lib/cn';
import { mailtoHref } from '../../model';
import { contactFormVariants as styles } from './ContactForm.variants';

export interface ContactFormLabels {
  title: string;
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  sent: string;
  honeypot: string;
  unconfigured: string;
  openMail: string;
  errors: Record<ContactField | 'rateLimited' | 'failed', string>;
}

const FIELDS = ['name', 'email', 'message'] as const;
const AUTOCOMPLETE = { name: 'name', email: 'email', message: 'off' } as const;

// Server Action form: posts without JS too. Errors come back as codes and are shown next to their
// field; on an invalid submit focus moves to the first one.
export function ContactForm({ to, labels }: { to: string; labels: ContactFormLabels }) {
  const [state, action, pending] = useActionState<ContactResult, FormData>(sendMessage, {
    status: 'idle',
  });
  const form = useRef<HTMLFormElement>(null);
  const values = 'values' in state ? state.values : undefined;
  const fieldErrors =
    state.status === 'error' && state.reason === 'invalid' ? state.fieldErrors : {};

  useEffect(() => {
    if (state.status !== 'error' || state.reason !== 'invalid') return;
    form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  return (
    <form
      ref={form}
      action={action}
      noValidate
      aria-labelledby="contact-form-title"
      className={styles.root()}
    >
      <h3 id="contact-form-title" className={styles.label()}>
        {labels.title}
      </h3>
      {FIELDS.map((field) => {
        const error = fieldErrors[field];
        const Control = field === 'message' ? 'textarea' : 'input';
        return (
          <div key={field} className={styles.field()}>
            <label htmlFor={`contact-${field}`} className={styles.label()}>
              {labels[field]}
            </label>
            <Control
              id={`contact-${field}`}
              name={field}
              type={field === 'email' ? 'email' : undefined}
              autoComplete={AUTOCOMPLETE[field]}
              spellCheck={field === 'email' ? false : undefined}
              defaultValue={values?.[field]}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `contact-${field}-error` : undefined}
              className={cn(styles.input(), field === 'message' && styles.textarea())}
            />
            {error ? (
              <p id={`contact-${field}-error`} className={styles.error()}>
                {labels.errors[error]}
              </p>
            ) : null}
          </div>
        );
      })}
      <div aria-hidden className={styles.trap()}>
        <label htmlFor="contact-website">{labels.honeypot}</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={styles.actions()}>
        <Button type="submit" variant="dark" aria-disabled={pending || undefined}>
          {pending ? labels.sending : labels.send}
        </Button>
      </div>
      {state.status === 'sent' ? (
        <p role="status" className={styles.status()}>
          {labels.sent}
        </p>
      ) : null}
      {state.status === 'error' && state.reason !== 'invalid' ? (
        <div role="alert" className={styles.status()}>
          {state.reason === 'unconfigured' ? labels.unconfigured : labels.errors[state.reason]}
          {state.reason !== 'rateLimited' ? (
            <a href={mailtoHref(to, state.values)} className={styles.mail()}>
              {labels.openMail}
            </a>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
