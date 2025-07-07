import { czechitasRenderVitePlugin } from '@czechitas/render/plugin';
import { glob } from 'glob';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/pages',
  publicDir: '../../public',
  server: {
    hmr: true,
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    target: 'es2022',
    rollupOptions: {
      input: glob.sync('src/pages/**/*.html'),
    },
    modulePreload: false,
  },
  plugins: [czechitasRenderVitePlugin()],
});
