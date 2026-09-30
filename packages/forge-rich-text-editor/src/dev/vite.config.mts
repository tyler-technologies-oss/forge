import { defineConfig } from 'vite';

export default defineConfig({
  // Import the built `esm/` output rather than source, so the harness exercises the artifact
  // consumers actually get - including the SCSS the rollup build compiled. Dropping the
  // `development` condition keeps vite from resolving `@tylertech/forge` to its TypeScript
  // sources, which import `.html` templates vite cannot parse.
  resolve: {
    conditions: ['module', 'browser', 'default']
  },
  server: {
    open: true,
    strictPort: false,
    port: 3460
  }
});
