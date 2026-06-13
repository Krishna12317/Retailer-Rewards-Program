import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import * as esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'treat-js-as-jsx',
        async transform(code, id) {
          // Compile JSX syntax out of our .js files
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
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
