import { defineConfig } from 'vite';
import { default as tsConfigPaths } from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsConfigPaths({
      ignoreConfigErrors: false,
    }),
  ],
});
