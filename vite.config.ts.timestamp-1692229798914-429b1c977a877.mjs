// vite.config.ts
import { fileURLToPath, URL } from "url";
import { viteI18nPlugin } from "file:///Users/dinh-vancolomban/Workspaces/about-me/node_modules/.pnpm/@dvcol+vite-plugin-i18n@1.1.3_@types+node@20.4.2_sass@1.62.1/node_modules/@dvcol/vite-plugin-i18n/dist/index.js";
import svgPlugin from "file:///Users/dinh-vancolomban/Workspaces/about-me/node_modules/.pnpm/@poppanator+sveltekit-svg@4.0.0_svelte@4.0.5_svgo@3.0.2_vite@4.4.2/node_modules/@poppanator/sveltekit-svg/dist/index.js";
import { svelte } from "file:///Users/dinh-vancolomban/Workspaces/about-me/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@2.4.2_svelte@4.0.5_vite@4.4.2/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import preprocess from "file:///Users/dinh-vancolomban/Workspaces/about-me/node_modules/.pnpm/svelte-preprocess@5.0.4_@babel+core@7.21.8_postcss@8.4.23_sass@1.62.1_svelte@4.0.5_typescript@5.1.6/node_modules/svelte-preprocess/dist/index.js";
import { defineConfig } from "file:///Users/dinh-vancolomban/Workspaces/about-me/node_modules/.pnpm/vite@4.4.2_@types+node@20.4.2_sass@1.62.1/node_modules/vite/dist/node/index.js";
import dtsPlugin from "file:///Users/dinh-vancolomban/Workspaces/about-me/node_modules/.pnpm/vite-plugin-dts@2.3.0_@types+node@20.4.2_vite@4.4.2/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/dinh-vancolomban/Workspaces/about-me/vite.config.ts";
var withSourceMap = !!process.env.VITE_SOURCEMAP;
var vite_config_default = defineConfig({
  base: "/about-me/",
  plugins: [
    dtsPlugin({
      outputDir: "dist/types"
    }),
    svelte({
      preprocess: preprocess(),
      emitCss: false
    }),
    viteI18nPlugin({
      path: "src/i18n",
      out: true
    }),
    svgPlugin()
  ],
  server: {
    port: 3003
  },
  build: {
    sourcemap: withSourceMap ? "inline" : false,
    rollupOptions: {
      input: {
        index: "src/index.ts",
        html: "index.html"
      },
      output: {
        entryFileNames: "entry/[name].js",
        chunkFileNames: "chunks/[name].chunk.js",
        assetFileNames: (asset) => {
          var _a, _b, _c;
          const format = "[name][extname]";
          if ((_a = asset.name) == null ? void 0 : _a.endsWith(".png"))
            return `assets/png/${format}`;
          if ((_b = asset.name) == null ? void 0 : _b.endsWith(".gif"))
            return `assets/gif/${format}`;
          if ((_c = asset.name) == null ? void 0 : _c.endsWith("css"))
            return `styles/${format}`;
          return `assets/[name][extname]`;
        }
      }
    },
    lib: {
      entry: "./src/index.ts",
      name: "about-me",
      formats: ["es"]
    }
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGluaC12YW5jb2xvbWJhbi9Xb3Jrc3BhY2VzL2Fib3V0LW1lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZGluaC12YW5jb2xvbWJhbi9Xb3Jrc3BhY2VzL2Fib3V0LW1lL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9kaW5oLXZhbmNvbG9tYmFuL1dvcmtzcGFjZXMvYWJvdXQtbWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICd1cmwnO1xuXG5pbXBvcnQgeyB2aXRlSTE4blBsdWdpbiB9IGZyb20gJ0BkdmNvbC92aXRlLXBsdWdpbi1pMThuJztcbmltcG9ydCBzdmdQbHVnaW4gZnJvbSAnQHBvcHBhbmF0b3Ivc3ZlbHRla2l0LXN2Zyc7XG5pbXBvcnQgeyBzdmVsdGUgfSBmcm9tICdAc3ZlbHRlanMvdml0ZS1wbHVnaW4tc3ZlbHRlJztcbmltcG9ydCBwcmVwcm9jZXNzIGZyb20gJ3N2ZWx0ZS1wcmVwcm9jZXNzJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGR0c1BsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuXG5jb25zdCB3aXRoU291cmNlTWFwID0gISFwcm9jZXNzLmVudi5WSVRFX1NPVVJDRU1BUDtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogJy9hYm91dC1tZS8nLFxuICBwbHVnaW5zOiBbXG4gICAgZHRzUGx1Z2luKHtcbiAgICAgIG91dHB1dERpcjogJ2Rpc3QvdHlwZXMnLFxuICAgIH0pLFxuICAgIHN2ZWx0ZSh7XG4gICAgICBwcmVwcm9jZXNzOiBwcmVwcm9jZXNzKCksXG4gICAgICBlbWl0Q3NzOiBmYWxzZSxcbiAgICB9KSxcbiAgICB2aXRlSTE4blBsdWdpbih7XG4gICAgICBwYXRoOiAnc3JjL2kxOG4nLFxuICAgICAgb3V0OiB0cnVlLFxuICAgIH0pLFxuICAgIHN2Z1BsdWdpbigpLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAzLFxuICB9LFxuXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiB3aXRoU291cmNlTWFwID8gJ2lubGluZScgOiBmYWxzZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBpbmRleDogJ3NyYy9pbmRleC50cycsXG4gICAgICAgIGh0bWw6ICdpbmRleC5odG1sJyxcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdlbnRyeS9bbmFtZV0uanMnLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2NodW5rcy9bbmFtZV0uY2h1bmsuanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogYXNzZXQgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm1hdCA9ICdbbmFtZV1bZXh0bmFtZV0nO1xuICAgICAgICAgIGlmIChhc3NldC5uYW1lPy5lbmRzV2l0aCgnLnBuZycpKSByZXR1cm4gYGFzc2V0cy9wbmcvJHtmb3JtYXR9YDtcbiAgICAgICAgICBpZiAoYXNzZXQubmFtZT8uZW5kc1dpdGgoJy5naWYnKSkgcmV0dXJuIGBhc3NldHMvZ2lmLyR7Zm9ybWF0fWA7XG4gICAgICAgICAgaWYgKGFzc2V0Lm5hbWU/LmVuZHNXaXRoKCdjc3MnKSkgcmV0dXJuIGBzdHlsZXMvJHtmb3JtYXR9YDtcbiAgICAgICAgICByZXR1cm4gYGFzc2V0cy9bbmFtZV1bZXh0bmFtZV1gO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6ICcuL3NyYy9pbmRleC50cycsXG4gICAgICBuYW1lOiAnYWJvdXQtbWUnLFxuICAgICAgZm9ybWF0czogWydlcyddLFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34nOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUFTLGVBQWUsV0FBVztBQUV0VixTQUFTLHNCQUFzQjtBQUMvQixPQUFPLGVBQWU7QUFDdEIsU0FBUyxjQUFjO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sZUFBZTtBQVB3SyxJQUFNLDJDQUEyQztBQVMvTyxJQUFNLGdCQUFnQixDQUFDLENBQUMsUUFBUSxJQUFJO0FBRXBDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLFVBQVU7QUFBQSxNQUNSLFdBQVc7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxNQUNMLFlBQVksV0FBVztBQUFBLE1BQ3ZCLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxJQUNELGVBQWU7QUFBQSxNQUNiLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxJQUNELFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsV0FBVyxnQkFBZ0IsV0FBVztBQUFBLElBQ3RDLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0IsV0FBUztBQXpDakM7QUEwQ1UsZ0JBQU0sU0FBUztBQUNmLGVBQUksV0FBTSxTQUFOLG1CQUFZLFNBQVM7QUFBUyxtQkFBTyxjQUFjLE1BQU07QUFDN0QsZUFBSSxXQUFNLFNBQU4sbUJBQVksU0FBUztBQUFTLG1CQUFPLGNBQWMsTUFBTTtBQUM3RCxlQUFJLFdBQU0sU0FBTixtQkFBWSxTQUFTO0FBQVEsbUJBQU8sVUFBVSxNQUFNO0FBQ3hELGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
