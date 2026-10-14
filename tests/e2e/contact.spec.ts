import { expect, test } from '@playwright/test';

const EMAIL = 'mjgarciadev14@gmail.com';

test('copy email puts the address on the clipboard and says so', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const button = page.locator('#contact').getByRole('button', { name: 'Copy email' });
  await button.scrollIntoViewIfNeeded();
  await button.click();
  await expect(page.locator('#contact').getByRole('button', { name: 'Copied' })).toBeVisible();
  await expect(page.locator('#contact [role="status"]').first()).toHaveText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL);
});

test('an empty message shows every field error and focuses the first', async ({ page }) => {
  await page.goto('/');
  const form = page.locator('#contact form');
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.getByText('Tell me your name.')).toBeVisible();
  await expect(form.getByText("That email doesn't look right.")).toBeVisible();
  await expect(form.getByText('Write at least 10 characters.')).toBeVisible();
  await expect(form.getByLabel('Name')).toBeFocused();
  await expect(form.getByLabel('Name')).toHaveAttribute('aria-invalid', 'true');
});

test('the Spanish form answers in Spanish and keeps what was typed', async ({ page }) => {
  await page.goto('/es');
  const form = page.locator('#contact form');
  await form.getByLabel('Nombre').fill('Ada');
  await form.getByLabel('Email').fill('ada@');
  await form.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(form.getByText('Ese email no parece correcto.')).toBeVisible();
  await expect(form.getByLabel('Nombre')).toHaveValue('Ada');
  await expect(form.getByLabel('Email')).toBeFocused();
});

test('without an email service the form hands the message to the email app', async ({ page }) => {
  await page.goto('/');
  const form = page.locator('#contact form');
  await form.getByLabel('Name').fill('Ada');
  await form.getByLabel('Email').fill('ada@example.com');
  await form.getByLabel('Message').fill('Hello, let us build it end to end.');
  await form.getByRole('button', { name: 'Send message' }).click();
  const alert = form.getByRole('alert');
  await expect(alert).toContainText("The form isn't connected yet");
  await expect(alert.getByRole('link', { name: 'Open my email app' })).toHaveAttribute(
    'href',
    `mailto:${EMAIL}?subject=Portfolio%20%E2%80%94%20Ada&body=Hello%2C%20let%20us%20build%20it%20end%20to%20end.`,
  );
});

test('a filled honeypot gets a quiet fake success', async ({ page }) => {
  await page.goto('/');
  const form = page.locator('#contact form');
  await form.getByLabel('Name').fill('Bot');
  await form.getByLabel('Email').fill('bot@example.com');
  await form.getByLabel('Message').fill('Buy cheap things right now please.');
  await form.locator('input[name="website"]').fill('http://spam.example', { force: true });
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.getByRole('status')).toHaveText("Message sent. I'll get back to you soon.");
});

test('without JS the form posts and the server renders the errors', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  const form = page.locator('#contact form');
  await form.getByLabel('Name').fill('Ada');
  // Enter submits the native form; the response is a full server-rendered page.
  await Promise.all([page.waitForNavigation(), form.getByLabel('Name').press('Enter')]);
  await expect(
    page.locator('#contact form').getByText('Write at least 10 characters.'),
  ).toBeVisible();
  await expect(page.locator('#contact form').getByLabel('Name')).toHaveValue('Ada');
  await context.close();
});

test('the contact links and the CV are there without JS', async ({ request }) => {
  const html = await (await request.get('/es')).text();
  expect(html).toContain(`href="mailto:${EMAIL}"`);
  expect(html).toContain('href="https://www.linkedin.com/in/mgarfer/"');
  expect(html).toContain('href="/matias-garcia-cv.pdf"');
  expect(html).not.toMatch(/RESEND|re_[A-Za-z0-9]{8}/);
});
