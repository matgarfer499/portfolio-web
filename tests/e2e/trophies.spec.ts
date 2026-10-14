import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const counter = (page: Page) => page.locator('header button[aria-haspopup="dialog"]');
const stored = (page: Page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem('pr-trophies') ?? '[]'));

test('all eight trophies unlock in one visit and survive a reload', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await expect(counter(page)).toContainText('0/8');

  for (const card of await page.locator('[data-record]').all()) await card.scrollIntoViewIfNeeded();
  await expect(counter(page)).toContainText('1/8');
  await expect(page.getByRole('status').filter({ hasText: 'Trophy unlocked' })).toContainText(
    'Scout',
  );

  await page.getByRole('button', { name: 'Dark theme' }).click();
  await page.locator('#contact').getByRole('button', { name: 'Copy email' }).click();
  for (const key of [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ])
    await page.keyboard.press(key);
  await expect(page.locator('html')).toHaveAttribute('data-beast', '');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(counter(page)).toContainText('5/8');

  await page.getByRole('link', { name: 'Read the case study' }).click();
  await page.waitForURL('**/projects/chefory');
  await page.locator('header a[hreflang="es"]').first().click();
  await page.waitForURL('**/es/projects/chefory');
  await expect(counter(page)).toContainText('7/8');

  await page.goto('/es');
  // Headless Chromium downloads the PDF instead of navigating: keep the page, the click still emits.
  await page.evaluate(() =>
    document.addEventListener('click', (e) => e.preventDefault(), { once: true }),
  );
  await page.getByRole('link', { name: 'Ver CV' }).click();
  await expect(counter(page)).toContainText('8/8');
  await page.reload();
  await expect(counter(page)).toContainText('8/8');
  expect((await stored(page)).length).toBe(8);
});

test('the shelf opens from the counter, closes on Escape and gives focus back', async ({
  page,
}) => {
  await page.goto('/');
  await counter(page).click();
  const shelf = page.getByRole('dialog', { name: /Trophy shelf/ });
  await expect(shelf).toBeVisible();
  await expect(shelf.getByRole('listitem')).toHaveCount(8);
  await expect(shelf.getByRole('button', { name: 'Trophy sound' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  expect((await new AxeBuilder({ page }).include('dialog').analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(shelf).toBeHidden();
  await expect(counter(page)).toBeFocused();
});

test('sound stays off until chosen, and reset empties the shelf', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('pr-trophies', '["konami","cv-opened"]'));
  await page.reload();
  await expect(counter(page)).toContainText('2/8');
  await counter(page).click();
  const shelf = page.getByRole('dialog');
  await shelf.getByRole('button', { name: 'Trophy sound' }).click();
  await expect(shelf.getByRole('button', { name: 'Trophy sound' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await shelf.getByRole('button', { name: 'Reset trophies' }).click();
  await expect(counter(page)).toContainText('0/8');
  expect(await page.evaluate(() => localStorage.getItem('pr-trophy-sound'))).toBe('1');
});

test('typing the code in the contact form does not trigger beast mode', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contact-message').click();
  for (const key of [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ])
    await page.keyboard.press(key);
  await expect(page.locator('html')).not.toHaveAttribute('data-beast');
});
