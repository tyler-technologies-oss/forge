import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Drop the `development` condition so vite resolves `@tylertech/forge` to its built output
  // rather than TypeScript source, which imports `.html` templates vite cannot parse.
  resolve: {
    conditions: ['module', 'browser', 'default']
  },
  plugins: [react()],
  server: {
    open: true,
    strictPort: false,
    port: 3461
  }
});
