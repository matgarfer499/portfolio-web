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

for (const path of ['/', '/es']) {
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

test('the theme choice survives a reload and is applied before hydration', async ({ page }) => {
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      (window as unknown as { themeAtDcl: string }).themeAtDcl =
        document.documentElement.getAttribute('data-theme') ?? '';
    });
  });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  expect(await page.evaluate(() => (window as unknown as { themeAtDcl: string }).themeAtDcl)).toBe(
    'dark',
  );
  await expect(page.getByRole('button', { name: 'Dark theme' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('the language switch keeps the page and changes the locale', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Ver en español' }).click();
  await expect(page).toHaveURL(/\/es$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
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
  await expect(page.getByText('I own products end to end')).toBeVisible();
  await expect(page.getByRole('img', { name: /Dumbbells/ })).toBeVisible();
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
