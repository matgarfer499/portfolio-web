// @ts-check
import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/', '.astro/', 'node_modules/', 'public/'],
  },

  // TypeScript base
  ...tseslint.configs.recommended,

  // React (applied to TS/TSX/JS/JSX only — Astro files use their own parser)
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 17+ JSX transform
      'react/prop-types': 'off', // TypeScript handles this
    },
  },

  // Accessibility
  {
    plugins: { 'jsx-a11y': jsxA11y },
    rules: jsxA11y.configs.recommended.rules,
  },

  // Astro files
  ...eslintPluginAstro.configs.recommended,
);
