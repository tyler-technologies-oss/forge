import type { Plugin } from 'vite';

/**
 * A custom plugin that converts imports for HTML files to stringified JavaScript modules.
 *
 * This allows us to use the HTML file contents in the JavaScript via an import by creating a module
 * on the fly with the file contents getting stringified.
 */
const ViteInlineForgeHtmlPlugin: Plugin = {
  name: 'forge:inline-html',
  transform(code: string, id: string) {
    const isProd = process.env.NODE_ENV === 'production';

    // In production, we want to append a "?raw" query parameter to the HTML file imports and let rollup inline the HTML
    if (isProd) {
      const htmlImportRE = /(import\s+\S+\s+from\s+['"]\.\.?\/[^.]+\.(?:html)(?!\?))(\S+)/g;
      const containsRelativeHtmlImport = htmlImportRE.test(code);
      if (containsRelativeHtmlImport) {
        code = code.replace(htmlImportRE, '$1?raw$2');
      }
      return { code };
    }

    // In development, we want to inline the HTML file contents into the JavaScript via esbuild
    if (/^.*\.html$/g.test(id)) {
      code = `export default \`${code}\``;
    }
    return { code };
  }
};

export default ViteInlineForgeHtmlPlugin;
