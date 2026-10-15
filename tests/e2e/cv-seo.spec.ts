import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = [
  '/',
  '/cv',
  '/projects/miot',
  '/projects/rat',
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

test('the cv is built from the content', async ({ page }) => {
  await page.goto('/cv');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Matías José García Fernández');
  await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();
  await expect(page.getByText('Built MIOT Sentra', { exact: false })).toBeVisible();
});

test('download PDF serves the original PDF, and the cv has no link to the site', async ({
  page,
  request,
}) => {
  await page.goto('/cv');
  const download = page.getByRole('link', { name: 'Download PDF' });
  await expect(download).toHaveAttribute('href', '/matias-garcia-cv.pdf');
  await expect(download).toHaveAttribute('download', 'Matias-Garcia-CV.pdf');
  const pdf = await request.get('/matias-garcia-cv.pdf');
  expect(pdf.headers()['content-type']).toBe('application/pdf');
  await expect(page.locator('article a', { hasText: 'matiasgarcia.dev' })).toHaveCount(0);
});

test('printing the cv hides the site chrome and stays light', async ({ page }) => {
  await page.goto('/cv');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('header').first()).toBeHidden();
  await expect(page.locator('footer')).toBeHidden();
  const paper = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(paper).toBe('rgb(255, 255, 255)');
});

test('every page declares its canonical and no other languages', async ({ request }) => {
  const html = await (await request.get('/projects/chefory')).text();
  expect(html).toContain('<link rel="canonical" href="https://matiasgarcia.dev/projects/chefory"');
  expect(html).not.toContain('hrefLang');
  expect(html).toContain('<meta property="og:title" content="Chefory — Matías García"');
});

test('every page shares its own title and image, not the home page', async ({ request }) => {
  for (const [path, title] of [
    ['/cv', 'Curriculum vitae — Matías García'],
    ['/projects/rat', 'R.A.T. — Matías García'],
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

test('an unknown path is a real 404', async ({ request }) => {
  const en = await request.get('/no-such-page');
  expect(en.status()).toBe(404);
  expect(await en.text()).toContain('Off the track');
});

test('old Spanish links land on the English page', async ({ request }) => {
  const home = await request.get('/es', { maxRedirects: 0 });
  expect(home.status()).toBe(308);
  expect(home.headers()['location']).toBe('/');
  const page = await request.get('/es/projects/rat', { maxRedirects: 0 });
  expect(page.headers()['location']).toBe('/projects/rat');
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
