// pnpm content:pending — every fact the owner still has to fill, as file:line + note.
// Text scan (not an import) so the output points at the line to edit. --json for SUMMARY.md.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const CALL = /(?<![\w.])pending\(\s*\{/g;
const EN = /\ben:\s*(['"`])((?:\\.|(?!\1).)*)\1/s;

/** @returns {{ line: number, note: string }[]} */
export function findPending(source) {
  const found = [];
  for (const match of source.matchAll(CALL)) {
    const start = match.index;
    let depth = 0;
    let end = start;
    let quote = null;
    for (let i = source.indexOf('(', start); i < source.length; i++) {
      const ch = source[i];
      if (quote) {
        if (ch === '\\') i++;
        else if (ch === quote) quote = null;
      } else if (ch === "'" || ch === '"' || ch === '`') quote = ch;
      else if (ch === '(') depth++;
      else if (ch === ')' && --depth === 0) {
        end = i;
        break;
      }
    }
    const note = EN.exec(source.slice(start, end))?.[2]?.replace(/\\(.)/g, '$1');
    if (note) found.push({ line: source.slice(0, start).split('\n').length, note });
  }
  return found;
}

function main() {
  const root = fileURLToPath(new URL('../src/content', import.meta.url));
  const rows = readdirSync(root, { recursive: true, encoding: 'utf8' })
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .sort()
    .flatMap((f) =>
      findPending(readFileSync(join(root, f), 'utf8')).map((hit) => ({
        file: relative(process.cwd(), join(root, f)),
        ...hit,
      })),
    );
  if (process.argv.includes('--json')) return console.log(JSON.stringify(rows, null, 2));
  for (const r of rows) console.log(`${r.file}:${r.line}  ${r.note}`);
  console.log(`\n${rows.length} pending item(s) for the owner.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
