import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    open: true,
    strictPort: false,
    port: 3451
  },
  resolve: {
    conditions: ['import', 'module', 'browser', 'default'],
    tsconfigPaths: true
  },
  plugins: [react()]
});
