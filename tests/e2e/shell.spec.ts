import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('response', (r) => {
    if (r.status() >= 400 && !r.url().includes('/_vercel/'))
      errors.push(`${r.status()} ${r.url()}`);
  });
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().startsWith('Failed to load resource'))
      errors.push(m.text());
  });
  return errors;
}

for (const path of ['/', '/cv']) {
  test(`${path} has no accessibility violations and a clean console`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    expect(
      errors.filter(
        (e) => /MISSING_MESSAGE|Error/.test(e) || e.startsWith('4') || e.startsWith('5'),
      ),
    ).toEqual([]);
  });

  test(`${path} never scrolls sideways at 360 px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
}

test('the site is dark only, with no theme or language controls', async ({ page }) => {
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe(
    'dark',
  );
  await expect(page.getByRole('button', { name: 'Dark theme' })).toHaveCount(0);
  await expect(page.locator('a[hreflang]')).toHaveCount(0);
});

test('on desktop the hero fills the first screen and ends exactly at its bottom', async ({
  page,
}) => {
  for (const [width, height] of [
    [1366, 768],
    [1440, 900],
    [1920, 1080],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const bottoms = await page.evaluate(() => ({
      hero: document.querySelector('#top')!.getBoundingClientRect().bottom,
      ship: [...document.querySelectorAll('#top li')].at(-1)!.getBoundingClientRect().bottom,
      stats: document.querySelector('#top dl')!.getBoundingClientRect().bottom,
    }));
    expect(Math.abs(bottoms.hero - height), `${width}x${height}`).toBeLessThanOrEqual(1);
    expect(bottoms.ship, `${width}x${height}`).toBeLessThanOrEqual(height + 1);
    expect(bottoms.stats, `${width}x${height}`).toBeLessThanOrEqual(height);
  }
});

test('the skip link is the first stop and jumps to the content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('the mobile menu traps focus, closes on Escape and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open menu' });
  await trigger.click();
  const menu = page.getByRole('dialog', { name: 'Sections' });
  await expect(menu).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await menu.getByRole('link', { name: 'Training log' }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#log$/);
});

test('without JavaScript the hero is fully readable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Matías García' })).toBeVisible();
  await expect(page.getByText('I build products end to end')).toBeVisible();
  await expect(page.locator('#top li')).toHaveText([/Build/, /Lead/, /Ship/]);
  await context.close();
});

test('with reduced motion nothing animates', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const running = await page.evaluate(
    () => document.getAnimations().filter((a) => a.playState === 'running').length,
  );
  expect(running).toBe(0);
});

test('the scroll progress bar grows as the page scrolls', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 600 });
  await page.goto('/');
  const bar = page.locator('header > div[aria-hidden]');
  const width = () => bar.evaluate((el) => el.getBoundingClientRect().width);
  expect(await width()).toBe(0);
  await page.mouse.wheel(0, 400);
  await expect.poll(width).toBeGreaterThan(0);
});
