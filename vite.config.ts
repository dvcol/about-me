import { fileURLToPath, URL } from 'url';

import { viteI18nPlugin } from '@dvcol/vite-plugin-i18n';
import svgPlugin from '@poppanator/sveltekit-svg';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

const withSourceMap = !!process.env.VITE_SOURCEMAP;

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
    sourcemap: withSourceMap ? 'inline' : false,
    rollupOptions: {
      input: {
        index: 'src/index.ts',
        html: 'index.html',
      },
      output: {
        entryFileNames: 'entry/[name].js',
        chunkFileNames: 'chunks/[name].chunk.js',
        assetFileNames: asset => {
          const format = '[name][extname]';
          if (asset.name?.endsWith('.png')) return `assets/png/${format}`;
          if (asset.name?.endsWith('.gif')) return `assets/gif/${format}`;
          if (asset.name?.endsWith('css')) return `styles/${format}`;
          return `assets/[name][extname]`;
        },
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
