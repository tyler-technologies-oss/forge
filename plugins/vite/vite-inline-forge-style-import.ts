import type { Plugin } from 'vite';

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
const ViteTransformForgeInlineStyleImportsPlugin: Plugin = {
  name: 'forge:transform-inline-style-imports',
  transform(code: string) {
    const containsRelativeSassImport = styleImportRE.test(code);
    if (containsRelativeSassImport) {
      code = code.replace(styleImportRE, '$1?inline$2');
    }
    return { code };
  }
};

export default ViteTransformForgeInlineStyleImportsPlugin;
