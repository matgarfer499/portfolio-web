export interface OutgoingEmail {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}

// One REST call (https://resend.com/docs/api-reference/emails/send-email), so no SDK dependency.
export async function sendWithResend(
  email: OutgoingEmail,
  fetcher: typeof fetch = fetch,
): Promise<boolean> {
  try {
    const response = await fetcher('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${email.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: email.from,
        to: [email.to],
        reply_to: email.replyTo,
        subject: email.subject,
        text: email.text,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
