import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const counter = (page: Page) => page.locator('header button[aria-haspopup="dialog"]');
const stored = (page: Page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem('pr-trophies') ?? '[]'));

test('all six trophies unlock in one visit and survive a reload', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await expect(counter(page)).toContainText('0/6');

  for (const card of await page.locator('[data-record]').all()) await card.scrollIntoViewIfNeeded();
  await expect(counter(page)).toContainText('1/6');
  await expect(page.getByRole('status').filter({ hasText: 'Trophy unlocked' })).toContainText(
    'Scout',
  );

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
  await expect(page.locator('html')).not.toHaveAttribute('data-beast');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(counter(page)).toContainText('4/6');

  await page.locator('#projects').getByRole('link', { name: 'Read the case study' }).click();
  await page.waitForURL('**/projects/miot');
  await expect(counter(page)).toContainText('5/6');

  // The CV opens in a new tab; the trophy is stored, so that tab shows the full shelf.
  await page.goto('/');
  const [cv] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: /View CV/ }).click(),
  ]);
  await cv.waitForURL('**/cv');
  await expect(counter(cv)).toContainText('6/6');
  await cv.reload();
  await expect(counter(cv)).toContainText('6/6');
  expect((await stored(cv)).length).toBe(6);
});

test('the shelf opens from the counter, closes on Escape and gives focus back', async ({
  page,
}) => {
  await page.goto('/');
  await counter(page).click();
  const shelf = page.getByRole('dialog', { name: /Trophy shelf/ });
  await expect(shelf).toBeVisible();
  await expect(shelf.getByRole('listitem')).toHaveCount(6);
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
  await expect(counter(page)).toContainText('2/6');
  await counter(page).click();
  const shelf = page.getByRole('dialog');
  await shelf.getByRole('button', { name: 'Trophy sound' }).click();
  await expect(shelf.getByRole('button', { name: 'Trophy sound' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await shelf.getByRole('button', { name: 'Reset trophies' }).click();
  await expect(counter(page)).toContainText('0/6');
  expect(await page.evaluate(() => localStorage.getItem('pr-trophy-sound'))).toBe('1');
});

test('typing the code in the contact form does not count as the cheat code', async ({ page }) => {
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
  await page.waitForTimeout(300);
  await expect(counter(page)).toContainText('0/6');
});
