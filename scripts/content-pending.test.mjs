import { describe, expect, it } from 'vitest';
import { findPending } from './content-pending.mjs';

describe('findPending', () => {
  it('finds a one-line call with its line and English note', () => {
    const src = "const a = 1;\nconst b = pending({ en: 'Team size', es: 'Tamaño' });\n";
    expect(findPending(src)).toEqual([{ line: 2, note: 'Team size' }]);
  });

  it('finds a call that prettier wrapped over several lines', () => {
    const src =
      "x = pending({\n  en: 'Products you lead and their outcomes',\n  es: 'Productos',\n});";
    expect(findPending(src)).toEqual([{ line: 1, note: 'Products you lead and their outcomes' }]);
  });

  it('finds two calls on one line, and notes containing parentheses or quotes', () => {
    const src = `[pending({ en: 'A (metric)', es: 'A' }), pending({ en: "Don't guess", es: 'B' })]`;
    expect(findPending(src)).toEqual([
      { line: 1, note: 'A (metric)' },
      { line: 1, note: "Don't guess" },
    ]);
  });

  it('still lists a call whose English note it cannot read', () => {
    expect(findPending("pending({ es: 'Solo español' })")).toEqual([
      { line: 1, note: '(unreadable note: open the file)' },
    ]);
  });

  it('ignores the definition and imports of pending itself', () => {
    const src = "import { pending } from './types';\nexport function pending(note) {}\n";
    expect(findPending(src)).toEqual([]);
  });
});
