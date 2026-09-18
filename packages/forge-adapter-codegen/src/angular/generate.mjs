import { execFileSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { join } from 'path';
import { getCustomElements, loadManifest } from '../core/manifest.mjs';
import { createEntryPointResolver, groupByEntryPoint } from '../core/entry-points.mjs';

const require = createRequire(import.meta.url);

const SCHEMATIC = '@tylertech/forge-schematics:custom-elements';
const CONFIG_DIR = '.generated-config';

/**
 * @typedef {object} AngularAdapterOptions
 * @property {string} packageName The web component package to generate proxies for.
 * @property {import('../core/entry-points.mjs').EntryPoint[]} entryPoints The package's entry points.
 * @property {string} project The Angular project name, as declared in `angular.json`.
 * @property {string} [libDir] Directory to write proxies to. Defaults to `src/lib`.
 * @property {string} [publicApi] Public API barrel to write. Defaults to `src/public-api.ts`.
 * @property {string} [modulePrefix] Prefix for generated NgModule names. Defaults to `Forge`.
 * @property {string} [tagPrefix] Tag name prefix stripped to form directory names. Defaults to `forge-`.
 * @property {{ className: string, fileName: string }} [aggregateModule] An NgModule importing and
 *   exporting every generated module. Omit to skip it.
 */

/**
 * Generates an Angular proxy component and NgModule per custom element in a package, plus the
 * directory barrels, public API barrel and optional aggregate module that the shared schematic does
 * not emit itself.
 *
 * @param {AngularAdapterOptions} options
 * @returns {{ generated: number, passes: number }} What the run produced.
 */
export function generateAngularAdapter({
  packageName,
  entryPoints,
  project,
  libDir = 'src/lib',
  publicApi = 'src/public-api.ts',
  modulePrefix = 'Forge',
  tagPrefix = 'forge-',
  aggregateModule
}) {
  const { manifest, manifestPath } = loadManifest(packageName);
  const elements = getCustomElements(manifest).map(element => ({
    ...element,
    baseName: element.className.replace(/Component$/, ''),
    dirName: element.tagName.replace(new RegExp(`^${tagPrefix}`), '')
  }));

  if (!elements.length) {
    throw new Error(`generateAngularAdapter: ${packageName} declares no custom elements.`);
  }

  const resolveEntryPoint = createEntryPointResolver(packageName, entryPoints);

  /**
   * The schematic accepts a single `importPath` per run, so a package that exports its elements
   * from more than one entry point needs one run per entry point, each excluding the other groups'
   * tags. Deriving the grouping from the manifest keeps the runs from drifting as elements change.
   *
   * The trade-off is that the schematic's `componentDependencies` cannot express a dependency that
   * crosses entry points, because it resolves module names within a single run. An aggregate module
   * covers that case instead.
   */
  const groups = groupByEntryPoint(elements, resolveEntryPoint);

  runSchematic({ groups, elements, manifestPath, libDir, modulePrefix, tagPrefix });

  writeDirectoryBarrels(elements, libDir);

  if (aggregateModule) {
    writeAggregateModule(elements, libDir, modulePrefix, aggregateModule);
  }

  writePublicApi(elements, publicApi, project, libDir, aggregateModule);

  // The schematic emits unformatted template output, so format what it and we just wrote.
  execFileSync(process.execPath, [require.resolve('prettier/bin/prettier.cjs'), '--write', `${libDir}/**/*.ts`, publicApi], { stdio: 'inherit' });

  const generatedDirs = readdirSync(libDir, { withFileTypes: true }).filter(entry => entry.isDirectory()).length;
  if (generatedDirs !== elements.length) {
    throw new Error(
      `Expected ${elements.length} generated element directories in ${libDir}, found ${generatedDirs}. Remove stale directories for renamed or removed elements.`
    );
  }

  return { generated: elements.length, passes: groups.length };
}

function runSchematic({ groups, elements, manifestPath, libDir, modulePrefix, tagPrefix }) {
  const ng = require.resolve('@angular/cli/bin/ng.js');

  rmSync(CONFIG_DIR, { recursive: true, force: true });
  mkdirSync(CONFIG_DIR, { recursive: true });

  try {
    for (const [index, group] of groups.entries()) {
      const excluded = elements.filter(element => !group.members.includes(element)).map(element => element.tagName);
      const configPath = join(CONFIG_DIR, `generate-proxies.${index}.json`);

      writeFileSync(
        configPath,
        JSON.stringify(
          {
            manifest: manifestPath,
            importPath: group.importPath,
            exclude: excluded.join(','),
            outDir: libDir,
            outDirExcludePrefix: tagPrefix,
            modulePrefix,
            useDefineFunction: true
          },
          null,
          2
        )
      );

      execFileSync(process.execPath, [ng, 'generate', SCHEMATIC, '--config', configPath, '--interactive=false'], { stdio: 'inherit' });
    }
  } finally {
    rmSync(CONFIG_DIR, { recursive: true, force: true });
  }
}

/**
 * The schematic deliberately does not emit directory barrels - its own source notes
 * "TODO: Either generate index.ts and export component/module" - and leaving that to hand
 * maintenance is how the rich text editor proxies in `@tylertech/forge-extended-angular` ended up
 * generated but unreachable: no barrels, and absent from that package's public API.
 */
function writeDirectoryBarrels(elements, libDir) {
  for (const { tagName, baseName, dirName } of elements) {
    const dir = join(libDir, dirName);
    const fileName = dasherize(baseName);

    if (!existsSync(join(dir, `${fileName}.component.ts`))) {
      throw new Error(`Expected the schematic to emit ${dir}/${fileName}.component.ts for ${tagName}, but it is missing.`);
    }

    writeFileSync(join(dir, 'index.ts'), `export * from './${fileName}.component';\nexport * from './${fileName}.module';\n`);
  }
}

/**
 * Consumers nest elements inside one another in their own templates, so every element they might
 * write needs its module in scope. One aggregate module is friendlier than importing a dozen, and
 * unlike `componentDependencies` it can span entry points.
 */
function writeAggregateModule(elements, libDir, modulePrefix, { className, fileName }) {
  const moduleNames = elements.map(({ baseName }) => `${modulePrefix}${baseName}Module`);
  const imports = elements.map(({ baseName, dirName }) => `import { ${modulePrefix}${baseName}Module } from './${dirName}';`).join('\n');

  writeFileSync(
    join(libDir, fileName),
    `${generatedBanner()}
import { NgModule } from '@angular/core';

${imports}

const MODULES = [${moduleNames.join(', ')}];

/** Imports and exports every generated module in this package. */
@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class ${className} {}
`
  );
}

function writePublicApi(elements, publicApi, project, libDir, aggregateModule) {
  const exports = elements.map(({ dirName }) => `export * from './${relativeFrom(publicApi, libDir)}/${dirName}';`);

  if (aggregateModule) {
    exports.push('', `export * from './${relativeFrom(publicApi, libDir)}/${aggregateModule.fileName.replace(/\.ts$/, '')}';`);
  }

  writeFileSync(
    publicApi,
    `${generatedBanner()}

/*
 * Public API Surface of ${project}
 */
${exports.join('\n')}
`
  );
}

function generatedBanner() {
  return '// This file is generated by @tylertech/forge-adapter-codegen. Any changes will be overwritten.';
}

/** Expresses `libDir` relative to the directory holding `publicApi`, e.g. `src/lib` -> `./lib`. */
function relativeFrom(publicApi, libDir) {
  const publicApiDir = publicApi.split('/').slice(0, -1).join('/');
  return libDir.startsWith(`${publicApiDir}/`) ? libDir.slice(publicApiDir.length + 1) : libDir;
}

function dasherize(value) {
  return value.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
}
