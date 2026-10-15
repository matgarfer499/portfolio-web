import { expect, test } from '@playwright/test';

test('the home page server-renders the name in English', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Matías García' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('the old Spanish home redirects to the English one', async ({ page }) => {
  await page.goto('/es');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText('I build products end to end', { exact: true })).toBeVisible();
});

test('the styleguide is a dev-only page: production answers 404', async ({ request }) => {
  expect((await request.get('/styleguide')).status()).toBe(404);
});
