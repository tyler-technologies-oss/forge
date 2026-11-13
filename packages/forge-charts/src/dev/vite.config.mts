import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const FORGE_ESM_DIR = fileURLToPath(new URL('../../../forge/esm', import.meta.url));

export default defineConfig({
  server: {
    open: true,
    strictPort: false,
    port: 3451
  },
  resolve: {
    alias: [
      // Forge's "development" export condition points at raw source that needs forge's own vite plugins, so use its built output.
      { find: /^@tylertech\/forge$/, replacement: `${FORGE_ESM_DIR}/index.js` },
      { find: /^@tylertech\/forge\/(?!dist\/|sass\/)(.+)$/, replacement: `${FORGE_ESM_DIR}/$1/index.js` }
    ]
  }
});
