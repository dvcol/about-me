module.exports = {
  root: true,
  extends: ['plugin:@dvcol/presets/svelte', 'plugin:@dvcol/presets/jest', 'plugin:@dvcol/presets/vitest'],
  plugins: ['@dvcol/presets'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  // to apply jest linting even-though we use vitest
  settings: { jest: { version: 27 } }
};