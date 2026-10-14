import { expect, test } from '@playwright/test';

test('the home page server-renders the name in English', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Matías García' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('the Spanish home page lives under /es', async ({ page }) => {
  await page.goto('/es');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByText('Llevo productos de principio a fin', { exact: true })).toBeVisible();
});

test('the styleguide is a dev-only page: production answers 404', async ({ request }) => {
  expect((await request.get('/styleguide')).status()).toBe(404);
  expect((await request.get('/es/styleguide')).status()).toBe(404);
});
