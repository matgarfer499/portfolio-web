import { expect, test } from '@playwright/test';

test('PRESS START renders real content and routes to the fast version', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('press-start')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'Matías García' })).toBeVisible();

  await page.getByTestId('fast-link').click();
  await expect(page).toHaveURL(/\/fast$/);
  await expect(page.getByTestId('fast-page')).toBeVisible();
});

test('the fast version is server-rendered, crawlable HTML', async ({ request }) => {
  const response = await request.get('/fast');
  expect(response.ok()).toBeTruthy();

  const html = await response.text();
  expect(html).toContain('Matías García');
  expect(html).toContain('Chefory');
});

test('entering the game mounts the 3D canvas and an achievement fires on contact', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByTestId('enter-game').click();

  const canvas = page.getByTestId('game-canvas').locator('canvas');
  await expect(canvas).toBeVisible({ timeout: 20_000 });

  // Walk forward into the zone trigger; the achievement toast should appear.
  await page.keyboard.down('ArrowUp');
  await expect(page.getByRole('status')).toContainText('First Contact', { timeout: 20_000 });
  await page.keyboard.up('ArrowUp');
});
