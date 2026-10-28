import { dirname, isAbsolute, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { compile, type FileImporter } from 'sass';
import { defineConfig, type FSWatcher, type Plugin } from 'vite';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const FORGE_SASS_PREFIX = '@tylertech/forge/sass/';

/**
 * Resolves `@tylertech/forge/sass/*` against forge's SCSS sources so edits to forge styles are picked up
 * and the page does not depend on forge's gitignored, build-generated `sass/` directory.
 */
const forgeSassImporter: FileImporter = {
  findFileUrl: url => (url.startsWith(FORGE_SASS_PREFIX) ? pathToFileURL(resolve(rootDir, '../forge/src/lib', url.slice(FORGE_SASS_PREFIX.length))) : null)
};

const SCSS_VIRTUAL_PREFIX = '\0virtual-css-string:';

/**
 * Compiles `.scss` imports into a JS module exporting the CSS string, mirroring the rollup build. A virtual
 * `.js` id keeps vite's own CSS plugin from processing the result. Every file Sass loads (including partials
 * and forge's SCSS sources) is tracked so editing any of them invalidates the module and reloads the page.
 */
const inlineScss = (): Plugin => {
  const dependents = new Map<string, Set<string>>();
  let watcher: FSWatcher | undefined;

  return {
    name: 'forge-table:inline-scss',
    enforce: 'pre',
    configureServer(server) {
      watcher = server.watcher;
    },
    resolveId(source, importer) {
      if (!source.endsWith('.scss') || !importer) {
        return null;
      }
      const resolved = isAbsolute(source) ? source : resolve(dirname(importer), source);
      return `${SCSS_VIRTUAL_PREFIX}${resolved.replace(/\.scss$/, '.js')}`;
    },
    load(id) {
      if (!id.startsWith(SCSS_VIRTUAL_PREFIX)) {
        return null;
      }
      const path = id.slice(SCSS_VIRTUAL_PREFIX.length).replace(/\.js$/, '.scss');
      const { css, loadedUrls } = compile(path, { loadPaths: [resolve(rootDir, 'node_modules')], importers: [forgeSassImporter] });
      loadedUrls
        .filter(url => url.protocol === 'file:')
        .map(url => fileURLToPath(url))
        .forEach(file => {
          dependents.set(file, (dependents.get(file) ?? new Set()).add(id));
          watcher?.add(file);
        });
      return `export default ${JSON.stringify(css)};`;
    },
    hotUpdate({ file, server }) {
      const ids = dependents.get(file);
      if (!ids) {
        return;
      }
      ids.forEach(id => {
        const mod = this.environment.moduleGraph.getModuleById(id);
        if (mod) {
          this.environment.moduleGraph.invalidateModule(mod);
        }
      });
      server.ws.send({ type: 'full-reload' });
      return [];
    }
  };
};

export default defineConfig({
  // forge-table is aliased to its TypeScript source so edits hot reload without a rebuild. forge itself
  // still resolves to its built `esm/` (dropping the `development` condition keeps vite from resolving
  // `@tylertech/forge` to its TypeScript sources, which import `.html` templates vite cannot parse).
  resolve: {
    alias: {
      '@tylertech/forge-table': resolve(rootDir, 'src/lib')
    },
    conditions: ['module', 'browser', 'default']
  },
  plugins: [inlineScss()],
  server: {
    open: true,
    strictPort: false,
    port: 3470
  }
});
