# QA procedure

Goal: see every touched screen in every cell of the matrix, on the production build, with evidence.

## 1. Chromium in WSL2 (no root)

The bundled Chromium needs `libnspr4`, `libnss3`, `libasound2`. They are extracted (no root) into
`.pw-libs/` (gitignored). If missing:

```bash
mkdir -p .pw-libs/debs && cd .pw-libs/debs
apt-get download libnspr4 libnss3 libasound2t64
for d in *.deb; do dpkg-deb -x "$d" ..; done; cd ../..
export LD_LIBRARY_PATH="$PWD/.pw-libs/usr/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH"
pnpm exec playwright install chromium
```

Every Playwright command (e2e, the shots script, playwright-cli) runs with that `LD_LIBRARY_PATH`.
CI uses `playwright install --with-deps` and needs none of this.

## 2. Server

```bash
pnpm build > "$SCRATCH/build.log" 2>&1 && (pnpm start --port 3000 > "$SCRATCH/start.log" 2>&1 &)
```

Production build only (dev overlays and unminified code hide real problems). Stop it afterwards by
PID (`ss -ltnp | grep :3000`), never `pkill -f next` (it can kill the calling shell).

## 3. The QA matrix

Widths: **360, 390, 768, 1024, 1280, 1440, 1920, 2560, 3840** × **light / dark** × **en / es** =
36 cells per screen. `node scripts/qa-shots.mjs <route> [--widths=…] [--themes=…] [--locales=…]`
walks the page a screen at a time (so below-the-fold motion plays and settles), then writes
full-page PNGs to `shots/<phase>/<route>-<locale>-<theme>-<width>.png` (gitignored) and
prints, per cell, `scrollWidth > clientWidth` (horizontal scroll) and console errors.

Breakpoint edges are not in the matrix: when the header or a grid changes, also check the first
width of each breakpoint (`stack` 820, `board` 1100) in **Spanish** (the longer labels) — P7's trophy
counter overflowed the ES header at 1100–1180 while every matrix cell was clean.

Look at the screenshots: a script that ran is not QA. Per cell check: no horizontal scroll, nothing
clipped or overlapping, giant type within the container, the composition at ≥1920 is the 1440 one
scaled (not a narrow column), dark theme has no light-only leftovers, Spanish strings fit (longer).

## 4. Beyond screenshots

- **Keyboard walk** at 1280 and 3840: Tab from load → skip link → header → sections in visual order;
  every stop has a visible ring; Esc closes the top layer and focus returns.
- **Reduced motion**: `page.emulateMedia({ reducedMotion: 'reduce' })` → nothing moves, all
  content visible.
- **No JS**: `javaScriptEnabled: false` context → every section's content is visible.
- **Touch**: 390 with `hasTouch: true, isMobile: true` → menu, disclosures, lightbox usable,
  targets ≥ 44 px.
- **e2e**: `pnpm test:e2e` (both locales + axe). Zero axe violations.
- **Lighthouse**: `CHROME_PATH=$(node -e "console.log(require('@playwright/test').chromium.executablePath())")`
  plus the `LD_LIBRARY_PATH` above, then `npx lighthouse <url> [--preset=desktop] --chrome-flags="--headless=new
--no-sandbox" --output=json` with `TEMP=$SCRATCH TMP=$SCRATCH` (under WSL Lighthouse otherwise
  creates `C:\Users\…\lighthouse.*` profile folders in the repo root). Run it on the **Vercel preview** too (real compression/CDN). Off the
  production domain `canonical` and (on previews) `is-crawlable` fail by design.

## 5. Preview deployment

`vercel ls portfolio-rywv` (the Vercel MCP lacks this team's scope; the CLI works) for the v4
preview URL; `vercel curl <path> --deployment <url>` gets past Vercel Authentication. CI status via
the GitHub MCP (`gh` is not logged in here).

## 6. Evidence

List each cell ✓/✗ in the review report with the screenshot path. A cell not reached is reported
with the reason and goes to `docs/redesign/v4/verify/pN.md` for the owner (real iPhone Safari,
Android Chrome, a 4K TV).

## 7. State catalogue

Extend per phase. Each row is a state to reach across the matrix.

- **Styleguide (P1, dev only)**: every atom variant on paper/night/volt; theme toggle; `/styleguide`
  returns 404 on `pnpm start` (QA it under `pnpm dev`).
- **Focus on surfaces**: focus a button in a paper, night and volt section in both themes and
  screenshot the section — the ring must be visible on each.
