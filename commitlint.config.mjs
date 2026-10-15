/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'shell',
        'hero',
        'records',
        'log',
        'about',
        'projects',
        'contact',
        'trophies',
        'cv',
        'design',
        'content',
        'i18n',
        'seo',
        'config',
        'ci',
        'deps',
        'docs',
      ],
    ],
  },
};

export default config;
