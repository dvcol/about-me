import { fileURLToPath, URL } from 'url';

import { viteI18nPlugin } from '@dvcol/vite-plugin-i18n';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    svelte(),
    viteI18nPlugin({
      path: 'src/i18n',
      out: true,
    }),
  ],
  server: {
    port: 3002,
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
