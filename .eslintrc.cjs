module.exports = {
  root: true,
  extends: ['plugin:@dvcol/presets/svelte', 'plugin:@dvcol/presets/vitest'],
  plugins: ['@dvcol/presets'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};