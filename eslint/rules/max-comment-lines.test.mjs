import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from './max-comment-lines.mjs';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

new RuleTester().run('max-comment-lines', rule, {
  valid: [
    '// one\nconst a = 1;',
    '// one\n// two\n// three\nconst a = 1;',
    '/* one\n two\n three */\nconst a = 1;',
    // Separated by code: two blocks of 3, not one of 6.
    '// a\n// b\n// c\nconst a = 1;\n// d\n// e\n// f\nconst b = 2;',
    'const a = 1; // trailing\n// own line\n// own line\nconst b = 2;',
  ],
  invalid: [
    {
      code: '// 1\n// 2\n// 3\n// 4\nconst a = 1;',
      errors: [{ messageId: 'tooLong', data: { lines: 4, max: 3 } }],
    },
    {
      code: '/**\n * 1\n * 2\n */\nconst a = 1;',
      errors: [{ messageId: 'tooLong', data: { lines: 4, max: 3 } }],
    },
    {
      code: '// 1\n// 2\nconst a = 1;',
      options: [{ max: 1 }],
      errors: [{ messageId: 'tooLong', data: { lines: 2, max: 1 } }],
    },
  ],
});
