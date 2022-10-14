import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const inlineForgeHtml = {
  name: 'inlineForgeHtml',
  transform(code: string, id: string) {
    if (/^.*\.html$/g.test(id)) {
      code = `export default \`${code}\``;
    }
    return { code };
  }
};

module.exports = defineConfig({
  server: {
    open: true,
    strictPort: false,
    port: 3450
  },
  plugins: [
    tsconfigPaths(),
    inlineForgeHtml
  ]
});
