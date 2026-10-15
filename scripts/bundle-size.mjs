// First-load JS of a page as a modern browser downloads it (noModule polyfills excluded).
// Usage: node scripts/bundle-size.mjs [url=http://localhost:3000/]  (needs `pnpm build && pnpm start`)
import { readFileSync } from 'node:fs';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const url = process.argv[2] ?? 'http://localhost:3000/';
const html = await (await fetch(url)).text();
const scripts = [...html.matchAll(/<script[^>]*src="(\/_next\/[^"]+\.js)"[^>]*>/g)]
  .filter((m) => !/nomodule/i.test(m[0]))
  .map((m) => m[1]);
let gzip = 0;
let brotli = 0;
for (const src of new Set(scripts)) {
  const file = readFileSync(`.next${src.slice('/_next'.length)}`);
  gzip += gzipSync(file, { level: 9 }).length;
  brotli += brotliCompressSync(file).length;
}
console.log(
  `${url}  ${new Set(scripts).size} scripts · gzip ${(gzip / 1024).toFixed(1)} kB · brotli ${(brotli / 1024).toFixed(1)} kB`,
);
