import { expect, test } from '@playwright/test';

test('the server HTML carries the final numbers, the ratios and the screen-reader reading', async ({
  request,
}) => {
  const en = await (await request.get('/')).text();
  for (const text of ['5× faster', '2× more', '3× more', '+25 points', '−47% cost', '1,500'])
    expect(en).toContain(text);
  expect(en).toMatch(/Before(<!-- -->)?: <\/span>90\u00a0s/);
  expect(en).toMatch(/data-to="800"[^>]*>800</);

  const es = await (await request.get('/es')).text();
  for (const text of ['5× más rápido', '2× más', '3× más', '+25 puntos', '−47% de coste', '1500'])
    expect(es).toContain(text);
});

test('below the fold the board rewinds, then counts up and draws the strikes in view', async ({
  page,
}) => {
  await page.goto('/');
  const digits = page.locator('#records [data-count]');
  await expect(digits.first()).toHaveText('5');
  await page.locator('#records').scrollIntoViewIfNeeded();
  await expect(digits).toHaveText(['1', '4', '30', '800', '85', '1', '100']);
  for (const card of await page.locator('#records [data-record]').all())
    await expect(card).toHaveAttribute('data-state', 'played');
});

test('with reduced motion the board shows final values and nothing animates', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#log').scrollIntoViewIfNeeded();
  await expect(page.locator('#records [data-count]')).toHaveText([
    '1',
    '4',
    '30',
    '800',
    '85',
    '1',
    '100',
  ]);
  await expect(page.locator('#records [data-state]')).toHaveCount(0);
  // The reduced-motion rule shortens animations to 0.01 ms: nothing may run longer than that.
  const running = await page.evaluate(() =>
    document
      .getAnimations()
      .filter((a) => Number(a.effect?.getComputedTiming().duration) > 1)
      .map((a) => (a as CSSAnimation).animationName),
  );
  expect(running).toEqual([]);
  await expect(page.locator('.rail-fill')).toBeHidden();
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('log details fold behind an accessible toggle', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Show details' }).first();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const details = page.locator(`#${await toggle.getAttribute('aria-controls')}`);
    await expect(details.getByRole('listitem').first()).toBeHidden();
    await toggle.click();
    await expect(page.getByRole('button', { name: 'Hide details' }).first()).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await expect(details.getByRole('listitem').first()).toBeVisible();
  });

  test('a /#log deep link lands below the header with every row open', async ({ page }) => {
    await page.goto('/#log');
    await expect(page.getByRole('button', { name: 'Show details' })).toHaveCount(0);
    await expect(page.locator('#log li').first()).toBeVisible();
    const header = await page.locator('header').first().boundingBox();
    const title = await page.locator('#log-title').boundingBox();
    expect(title!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
  });

  test('folding follows where a deep link lands, in both locales', async ({ page }) => {
    await page.goto('/#top');
    await expect(page.getByRole('button', { name: 'Show details' })).toHaveCount(3);
    await page.goto('/es#log');
    await expect(page.getByRole('button', { name: 'Ver detalles' })).toHaveCount(0);
  });
});
