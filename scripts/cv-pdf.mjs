// pnpm cv:pdf — prints /cv from a running production server into public/ as an A4 PDF.
// Run `pnpm build && pnpm start` first; --base=http://localhost:3000 by default.
import { chromium } from '@playwright/test';

const base =
  process.argv.find((a) => a.startsWith('--base='))?.slice('--base='.length) ??
  'http://localhost:3000';
const files = [['/cv', 'public/matias-garcia-cv.pdf']];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [route, out] of files) {
  await page.goto(base + route, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.pdf({ path: out, format: 'A4', preferCSSPageSize: true, printBackground: true });
  console.log(`${route} → ${out}`);
}
await browser.close();
