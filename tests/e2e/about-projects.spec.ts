import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('the gallery never ships the excluded photo and captions the photo with his mother', async ({
  request,
}) => {
  const html = await (await request.get('/')).text();
  expect(html).not.toContain('mylove');
  expect(html).toContain('With my mom on the Camino de Santiago');
});

test('without JS every photo is a plain link to the image', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  const links = page.locator('#about a[data-photo]');
  await expect(links).toHaveCount(8);
  await expect(links.first()).toHaveAttribute('href', '/photos/me.webp');
  await expect(page.locator('#projects').getByText('Chefory').first()).toBeVisible();
  await context.close();
});

test('the lightbox opens, steps with the arrow keys and returns focus on close', async ({
  page,
}) => {
  await page.goto('/');
  const second = page.locator('#about a[data-photo="1"]');
  await second.scrollIntoViewIfNeeded();
  await second.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveAccessibleName('With my mom on the Camino de Santiago');
  await expect(dialog.getByText('2 of 8')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByText('3 of 8')).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.getByText('8 of 8')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(second).toBeFocused();
});

test('below-the-fold content reveals in view; reduced motion arms nothing', async ({ page }) => {
  await page.goto('/');
  const stack = page.locator('#projects [data-reveal]').last();
  await expect(stack).toHaveAttribute('data-reveal', 'armed');
  await stack.scrollIntoViewIfNeeded();
  await expect(stack).toHaveAttribute('data-reveal', 'shown');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('[data-reveal="armed"]')).toHaveCount(0);
});

test('the training-log rail fills completely once the log has been read', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const list = document.querySelector('[data-log]')!;
    const { bottom } = list.getBoundingClientRect();
    window.scrollTo(0, window.scrollY + bottom - window.innerHeight / 2 + 40);
  });
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.querySelector('.rail-fill')!).scale))
    .toBe('1');
});

test('a case study opens from the home card and goes back to that same project', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('#projects').getByRole('link', { name: 'Read the case study' }).click();
  await expect(page).toHaveURL(/\/projects\/miot$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('MIOT Sentra');
  await page.getByRole('link', { name: 'Back to projects' }).click();
  await expect(page).toHaveURL(/\/#project-miot$/);
  await expect(page.locator('#project-miot')).toBeInViewport();
});

test('a case page links to the next one at the top, and visits open in a new tab', async ({
  page,
}) => {
  await page.goto('/projects/rat');
  await expect(
    page.getByRole('link', { name: 'Visit the site (opens in a new tab)' }),
  ).toHaveAttribute('target', '_blank');
  await page.getByRole('link', { name: 'Next: Physics Sketchbook' }).click();
  await expect(page).toHaveURL(/\/projects\/physics-sketchbook$/);
  await page.getByRole('link', { name: 'Back to projects' }).click();
  await expect(page.locator('#project-physics-sketchbook')).toBeInViewport();
});

test('the home lists the other cases and each one opens its page', async ({ page }) => {
  await page.goto('/');
  const list = page.locator('#projects ol');
  await expect(list.getByRole('link')).toHaveCount(4);
  await list.getByRole('link', { name: /Physics Sketchbook/ }).click();
  await expect(page).toHaveURL(/\/projects\/physics-sketchbook$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Physics Sketchbook');
  await expect(page.getByRole('link', { name: 'Next: Chefory' })).toBeVisible();
});

test('an unknown case study is a 404', async ({ request }) => {
  expect((await request.get('/projects/nope')).status()).toBe(404);
});

for (const path of ['/projects/chefory', '/projects/rascame-esta']) {
  test(`${path} has no accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}
