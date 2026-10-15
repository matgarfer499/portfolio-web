import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = [
  '/',
  '/es',
  '/cv',
  '/es/cv',
  '/projects/miot',
  '/es/projects/rat',
  '/projects/physics-sketchbook',
  '/nope',
];

for (const route of ROUTES) {
  test(`${route} has no accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}

test('the cv is built from the content in each language', async ({ page }) => {
  await page.goto('/es/cv');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Matías José García Fernández');
  await expect(page.getByRole('heading', { name: 'Experiencia' })).toBeVisible();
  await expect(page.getByText('ene 2024 — Actualidad', { exact: false })).toBeVisible();
  await expect(page.getByText('Construí MIOT Sentra', { exact: false })).toBeVisible();
  await expect(page.locator('[data-pending]')).toHaveCount(0);
  await expect(page).toHaveTitle('Currículum — Matías García');
});

test('download PDF opens the print dialog; print hides the site chrome and stays light', async ({
  page,
}) => {
  await page.goto('/cv');
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
    (window as unknown as { printed: boolean }).printed = false;
    window.print = () => {
      (window as unknown as { printed: boolean }).printed = true;
    };
  });
  await page.getByRole('button', { name: 'Download PDF' }).click();
  expect(await page.evaluate(() => (window as unknown as { printed: boolean }).printed)).toBe(true);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('header').first()).toBeHidden();
  await expect(page.locator('footer')).toBeHidden();
  const paper = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(paper).toBe('rgb(255, 255, 255)');
});

test('every page declares its canonical and both languages', async ({ request }) => {
  const html = await (await request.get('/es/projects/chefory')).text();
  expect(html).toContain(
    '<link rel="canonical" href="https://matiasgarcia.dev/es/projects/chefory"',
  );
  expect(html).toContain('hrefLang="en" href="https://matiasgarcia.dev/projects/chefory"');
  expect(html).toContain('hrefLang="x-default" href="https://matiasgarcia.dev/projects/chefory"');
  expect(html).toContain('<meta property="og:title" content="Chefory — Matías García"');
});

test('every page shares its own title and image, not the home page', async ({ request }) => {
  for (const [path, title] of [
    ['/cv', 'Curriculum vitae — Matías García'],
    ['/es/projects/rat', 'R.A.T. — Matías García'],
  ]) {
    const html = await (await request.get(path!)).text();
    expect(html, path).toContain(`<meta property="og:title" content="${title}"`);
    const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    expect(image, path).toContain(`${path}/opengraph-image`);
  }
  expect((await request.get('/projects/bogus/opengraph-image')).status()).toBe(404);
});

test('the home carries Person structured data', async ({ page }) => {
  await page.goto('/');
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  const graph = JSON.parse(raw ?? '{}')['@graph'];
  expect(graph[0]).toMatchObject({ '@type': 'Person', name: 'Matías García' });
});

test('sitemap, robots, manifest, icons and share images answer', async ({ request, page }) => {
  for (const [path, type] of [
    ['/sitemap.xml', 'xml'],
    ['/robots.txt', 'text/plain'],
    ['/manifest.webmanifest', 'manifest+json'],
    ['/icon/192', 'image/png'],
    ['/apple-icon', 'image/png'],
  ]) {
    const response = await request.get(path!);
    expect(response.status(), path).toBe(200);
    expect(response.headers()['content-type']).toContain(type);
  }
  await page.goto('/');
  const og = await page.locator('meta[property="og:image"]').getAttribute('content');
  const response = await request.get(new URL(og!).pathname, { maxRedirects: 0 });
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toBe('image/png');
});

test('an unknown path is a real 404 in its language', async ({ request }) => {
  const en = await request.get('/no-such-page');
  expect(en.status()).toBe(404);
  expect(await en.text()).toContain('Off the track');
  const es = await request.get('/es/no-existe');
  expect(es.status()).toBe(404);
  expect(await es.text()).toContain('Fuera de pista');
});

test('the chosen theme survives a reload and a language switch', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.goto('/es');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('the home does not shift while it loads and is scrolled', async ({ page }) => {
  await page.addInitScript(() => {
    (window as unknown as { cls: number }).cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as unknown as {
        value: number;
        hadRecentInput: boolean;
      }[])
        if (!entry.hadRecentInput) (window as unknown as { cls: number }).cls += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('/');
  for (let y = 0; y < 6; y++) {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(150);
  }
  expect(await page.evaluate(() => (window as unknown as { cls: number }).cls)).toBeLessThan(0.02);
});

test('the old accented CV address redirects to the current PDF', async ({ request }) => {
  const response = await request.get('/Mat%C3%ADas-Jos%C3%A9-Garc%C3%ADa-Fern%C3%A1ndez-CV.pdf', {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(308);
  expect(response.headers()['location']).toBe('/matias-garcia-cv.pdf');
});
