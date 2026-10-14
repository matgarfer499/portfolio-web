import { expect, test } from '@playwright/test';

test('the home page server-renders the name in English', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Matías García' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('the Spanish home page lives under /es', async ({ page }) => {
  await page.goto('/es');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByText('El portfolio v4 se está reconstruyendo')).toBeVisible();
});
