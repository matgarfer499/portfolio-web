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
  const invalid = state.status === 'error' && state.reason === 'invalid';
  const fieldErrors = invalid ? state.fieldErrors : {};

  useEffect(() => {
    if (!invalid) return;
    form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state, invalid]);

  return (
    <form
      ref={form}
      action={action}
      onSubmit={(event) => {
        if (pending) event.preventDefault();
      }}
      noValidate
      aria-labelledby="contact-form-title"
      className={styles.root()}
    >
      <h3 id="contact-form-title" className={cn(styles.label(), styles.full())}>
        {labels.title}
      </h3>
      {FIELDS.map((field) => {
        const error = fieldErrors[field];
        const Control = field === 'message' ? 'textarea' : 'input';
        return (
          <div key={field} className={styles.field({ wide: field === 'message' })}>
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
              className={styles.input({ multiline: field === 'message' })}
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
      <div className={cn(styles.actions(), styles.full())}>
        <Button type="submit" variant="dark" aria-disabled={pending || undefined}>
          {pending ? labels.sending : labels.send}
        </Button>
      </div>
      {/* Live regions stay mounted (empty when idle) so their content is announced on arrival. */}
      <div role="status" className={styles.full()}>
        {state.status === 'sent' ? <p className={styles.status()}>{labels.sent}</p> : null}
      </div>
      <div role="alert" className={styles.full()}>
        {state.status === 'error' && state.reason !== 'invalid' ? (
          <div className={styles.status()}>
            {state.reason === 'unconfigured' ? labels.unconfigured : labels.errors[state.reason]}
            {state.reason !== 'rateLimited' ? (
              <a href={mailtoHref(to, state.values)} className={styles.mail()}>
                {labels.openMail}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}
