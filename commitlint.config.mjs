/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      1,
      'always',
      [
        'world',
        'avatar',
        'achievements',
        'hud',
        'shared',
        'content',
        'i18n',
        'fast',
        'press-start',
        'config',
        'ci',
        'deps',
        'docs',
      ],
    ],
  },
};

export default config;
