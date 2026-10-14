import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import maxCommentLines from './eslint/rules/max-comment-lines.mjs';

/** Features must not reach into other features or up into the app layer. */
const featureBoundary = {
  patterns: [
    {
      group: ['@features/*', '@features/*/**'],
      message: 'Features must not import other features — compose them in the app/ layer.',
    },
    {
      group: ['@app/*', '@app/*/**'],
      message: 'Features must not import from the app layer.',
    },
  ],
};

const config = [
  {
    ignores: [
      '.next/**',
      '.worktrees/**',
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      'next-env.d.ts',
    ],
  },

  ...next,
  prettier,

  // Comments explain why in 3 lines at most; longer detail belongs in docs/ (architecture.md).
  {
    plugins: { local: { rules: { 'max-comment-lines': maxCommentLines } } },
    rules: { 'local/max-comment-lines': ['error', { max: 3 }] },
  },

  // Everywhere: import features only through their public index, never deep paths.
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@features/*/*'],
              message: 'Import a feature through its public index (e.g. `@features/records`).',
            },
          ],
        },
      ],
    },
  },

  // Inside a feature: no other feature, no app layer.
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: { 'no-restricted-imports': ['error', featureBoundary] },
  },

  // shared/ is the bottom of the dependency graph: it depends on nothing above it.
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@features/*', '@features/*/**'],
              message: 'shared/ must not depend on features.',
            },
            {
              group: ['@app/*', '@app/*/**'],
              message: 'shared/ must not depend on the app layer.',
            },
            {
              group: ['@content/*', '@content/*/**', '@/server/*'],
              message: 'shared/ is domain-agnostic: no content, no server code.',
            },
          ],
        },
      ],
    },
  },

  // server/ and content/ sit below the features: they never import a feature or the app layer.
  {
    files: ['src/server/**/*.ts', 'src/content/**/*.ts'],
    rules: { 'no-restricted-imports': ['error', featureBoundary] },
  },

  // Tooling, tests and scripts run in Node.
  {
    files: ['*.{config,setup}.{ts,mjs,js}', 'tests/**', 'scripts/**', 'eslint/**'],
    languageOptions: { globals: { ...globals.node } },
  },
];

export default config;
