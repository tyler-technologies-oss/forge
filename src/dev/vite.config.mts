import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import ViteFullReload from 'vite-plugin-full-reload';

/**
 * A custom plugin that converts imports for HTML files to stringified JavaScript modules.
 * 
 * This allows us to use the HTML file contents in the JavaScript via an import by creating a module
 * on the fly with the file contents getting stringified.
 */
const ViteInlineForgeHtml: Plugin = {
  name: 'forge:inline-html',
  transform(code: string, id: string) {
    if (/^.*\.html$/g.test(id)) {
      code = `export default \`${code}\``;
    }
    return { code };
  }
};

/**
 * A custom plugin that transforms this:
 * import styles from './name.scss';
 * 
 * Into this:
 * import styles from './name.scss?inline';
 * 
 * We are doing this in a plugin to avoid updating our source code only to support Vite since it requires
 * using the "?inline" suffix on CSS import statements if we want to inline the file contents into the JavaScript
 * and avoid Vite adding a <style> tag to the <head> of the dev page.
 */
const styleImportRE = /(import\s+\S+\s+from\s+['"]\.\.?\/[^.]+\.(?:scss|css)(?!\?))(\S+)/g;
const ViteTransformForgeInlineStyleImports: Plugin = {
  name: 'forge:transform-inline-style-imports',
  transform(code: string) {
    const containsRelativeSassImport = styleImportRE.test(code);
    if (containsRelativeSassImport) {
      code = code.replace(styleImportRE, '$1?inline$2');
    }
    return { code };
  }
};

export default defineConfig({
  server: {
    open: true,
    strictPort: false,
    port: 3450
  },
  plugins: [
    tsconfigPaths(),
    ViteInlineForgeHtml,
    ViteTransformForgeInlineStyleImports,
    ViteEjsPlugin({
      site: {
        title: 'Tyler Forge™ Dev (@next)'
      }
    }),
    ViteFullReload(['./**/*.ejs'])
  ]
});
