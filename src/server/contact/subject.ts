// Shared by the email the server sends and the mailto fallback, so both read the same. No imports:
// the client form uses it, and anything pulled in here would ship to the browser.
export function contactSubject(name: string): string {
  return `Portfolio — ${name}`;
}
