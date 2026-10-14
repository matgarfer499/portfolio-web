import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const resolvePath = (relative: string): string => fileURLToPath(new URL(relative, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@features': resolvePath('./src/features'),
      '@shared': resolvePath('./src/shared'),
      '@content': resolvePath('./src/content'),
      '@app': resolvePath('./src/app'),
      '@': resolvePath('./src'),
    },
  },
  test: {
    environment: 'node',
    // ESLint rule and script tests are .mjs; a .ts-only include would silently skip them.
    include: ['src/**/*.test.{ts,tsx}', 'eslint/**/*.test.mjs', 'scripts/**/*.test.{ts,mjs}'],
  },
});
