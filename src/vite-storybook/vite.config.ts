import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const inlineForgeHtml = {
  name: 'inlineForgeHtml',
  transform(code, id) {
    if (/^.*\.html$/g.test(id)) {
      code = `export default \`${code}\``;
    }
    return { code };
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@tylertech/forge': resolve(__dirname, '../lib/index.ts')
  //   }
  // },
  // plugins: [
  //   react(),
  //   tsconfigPaths(),
  //   inlineForgeHtml
  // ],
  // optimizeDeps: {
  //   exclude: [
  //     '@material/ripple',
  //     '@tylertech/tyler-icons',
  //     '@tylertech/forge-core'
  //   ]
  // }
});
