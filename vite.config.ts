import { fileURLToPath, URL } from 'url';

import { viteI18nPlugin } from '@dvcol/vite-plugin-i18n';
import svgPlugin from '@poppanator/sveltekit-svg';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  base: '/about-me/',
  plugins: [
    dtsPlugin({
      outputDir: 'dist/types',
    }),
    svelte({
      preprocess: preprocess(),
      emitCss: false,
    }),
    viteI18nPlugin({
      path: 'src/i18n',
      out: true,
    }),
    svgPlugin(),
  ],
  server: {
    port: 3003,
  },

  build: {
    rollupOptions: {
      input: {
        index: 'src/index.ts',
        html: 'index.html',
      },
      output: {
        assetFileNames: 'assets/[name].[extname]',
        chunkFileNames: 'chunks/[name].chunk.js',
        entryFileNames: 'entry/[name].js',
      },
    },
    lib: {
      entry: './src/index.ts',
      name: 'about-me',
      formats: ['es'],
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
