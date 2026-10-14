// QA matrix screenshots (portfolio-review references/qa.md). Run against a running server:
//   node scripts/qa-shots.mjs /styleguide --label=p1 [--base=http://localhost:3000]
//   [--widths=360,1280] [--themes=light,dark] [--locales=en,es] [--viewport] (default full page)
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const route = args.find((a) => !a.startsWith('--')) ?? '/';
const opt = (name, fallback) =>
  args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1] ?? fallback;
const list = (name, fallback) => opt(name, fallback).split(',').filter(Boolean);

const BASE = opt('base', 'http://localhost:3000');
const LABEL = opt('label', 'adhoc');
const WIDTHS = list('widths', '360,390,768,1024,1280,1440,1920,2560,3840').map(Number);
const THEMES = list('themes', 'light,dark');
const LOCALES = list('locales', 'en,es');
const FULL = !args.includes('--viewport');
const OUT = resolve('shots', LABEL);
const slug = route.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home';

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const problems = [];
const sheets = new Map();

for (const locale of LOCALES) {
  const path = locale === 'en' ? route : `/${locale}${route === '/' ? '' : route}`;
  for (const theme of THEMES) {
    for (const width of WIDTHS) {
      const height = Math.max(800, Math.round(width * 0.5625));
      const context = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor: width <= 768 ? 2 : 1,
        colorScheme: theme === 'dark' ? 'dark' : 'light',
      });
      await context.addInitScript((t) => localStorage.setItem('pr-theme', t), theme);
      const page = await context.newPage();
      const errors = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(BASE + path, { waitUntil: 'networkidle' });
      await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' });
      await page.waitForTimeout(900);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      const file = `${slug}-${locale}-${theme}-${width}.png`;
      await page.screenshot({ path: `${OUT}/${file}`, fullPage: FULL });
      const cell = `${locale} ${theme} ${width}`;
      if (overflow > 0) problems.push(`${cell}: horizontal overflow ${overflow}px`);
      for (const e of errors) problems.push(`${cell}: console error ${e}`);
      const key = `${locale}-${theme}`;
      sheets.set(key, [...(sheets.get(key) ?? []), { file, width }]);
      console.log(`${overflow > 0 || errors.length ? '✗' : '✓'} ${cell} → ${file}`);
      await context.close();
    }
  }
}

// One contact sheet per locale × theme: every width side by side, so a few image reads cover 36 cells.
for (const [key, cells] of sheets) {
  const html = `<body style="margin:0;display:flex;gap:12px;align-items:flex-start;background:#777;font:12px sans-serif">${cells
    .map(
      (c) =>
        `<figure style="margin:0;width:240px"><figcaption style="color:#fff">${c.width}px</figcaption><img src="${c.file}" style="width:240px;display:block"></figure>`,
    )
    .join('')}</body>`;
  const sheetHtml = `${OUT}/sheet-${slug}-${key}.html`;
  writeFileSync(sheetHtml, html);
  const page = await browser.newPage({ viewport: { width: cells.length * 252, height: 900 } });
  await page.goto(`file://${sheetHtml}`);
  await page.screenshot({ path: `${OUT}/sheet-${slug}-${key}.png`, fullPage: true });
  await page.close();
  console.log(`sheet → shots/${LABEL}/sheet-${slug}-${key}.png`);
}

await browser.close();
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n${problems.join('\n')}`);
  process.exitCode = 1;
}
