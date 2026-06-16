import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

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

  // Everywhere: import features only through their public index, never deep paths.
  {
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['@features/*/*'],
              message: 'Import a feature through its public index (e.g. `@features/world`).',
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
          ],
        },
      ],
    },
  },

  // React Three Fiber declares Three.js props on intrinsic elements (args, position, …),
  // which the DOM-oriented rule cannot know about.
  {
    files: [
      'src/features/world/**/*.tsx',
      'src/features/avatar/**/*.tsx',
      'src/app/**/_components/GameExperience.tsx',
    ],
    rules: { 'react/no-unknown-property': 'off' },
  },

  // Tooling, tests and scripts run in Node.
  {
    files: ['*.{config,setup}.{ts,mjs,js}', 'tests/**', 'scripts/**'],
    languageOptions: { globals: { ...globals.node } },
  },
];

export default config;
