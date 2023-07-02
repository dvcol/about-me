import {fileURLToPath, URL} from 'url';

import {viteI18nPlugin} from '@dvcol/vite-plugin-i18n';
import svgPlugin from '@poppanator/sveltekit-svg'
import {svelte} from '@sveltejs/vite-plugin-svelte';
import {defineConfig} from 'vite';
import dtsPlugin from 'vite-plugin-dts';


export default defineConfig({
  plugins: [
    dtsPlugin({
      outputDir: 'dist/types',
    }),
    svelte({
      emitCss: false,
    }),
    viteI18nPlugin({
      path: 'src/i18n',
      out: true,
    }),
    svgPlugin()
  ],
  server: {
    port: 3003,
  },

  build: {
    rollupOptions: {
      input: {
        index: 'src/index.ts',
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
