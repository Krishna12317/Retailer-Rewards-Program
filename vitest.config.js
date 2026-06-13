import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import * as esbuild from 'esbuild';

export default defineConfig({
  plugins: [
    {
      name: 'treat-js-as-jsx',
      async transform(code, id) {
        if (id.endsWith('.js') && id.includes('/src/') && !id.includes('node_modules')) {
          const result = await esbuild.transform(code, {
            loader: 'jsx',
            jsx: 'automatic',
          });
          return {
            code: result.code,
            map: null,
          };
        }
        return null;
      },
    },
    react(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
