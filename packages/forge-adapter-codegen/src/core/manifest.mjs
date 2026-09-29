import { createRequire } from 'module';
import { join } from 'path';
import { pathToFileURL } from 'url';

/**
 * Manifests are resolved from the CONSUMING package, not from this one. This package deliberately
 * does not depend on the web component packages it generates adapters for - the adapter package
 * does - so resolving from `import.meta.url` here would never find them.
 */
const requireFrom = dir => createRequire(pathToFileURL(join(dir, 'package.json')));

/**
 * @typedef {object} CustomElementEntry
 * @property {string} tagName The element's custom element tag name.
 * @property {string} className The class name the source package actually exports.
 * @property {string} modulePath The manifest module path the element is declared in.
 * @property {object} declaration The manifest declaration itself.
 */

/**
 * Reads a package's custom elements manifest by package name, so callers never hard-code a path
 * into another package's build output.
 *
 * @param {string} packageName The package to read `custom-elements.json` from.
 * @param {string} [resolveFrom] Directory to resolve `packageName` from. Defaults to the current
 *   working directory, which is the consuming package's root when run as an npm script.
 * @returns {{ manifest: object, manifestPath: string }} The parsed manifest and its resolved path.
 */
export function loadManifest(packageName, resolveFrom = process.cwd()) {
  const require = requireFrom(resolveFrom);

  try {
    const manifestPath = require.resolve(`${packageName}/custom-elements.json`);
    return { manifest: require(manifestPath), manifestPath };
  } catch (error) {
    throw new Error(
      `Could not resolve ${packageName}/custom-elements.json from ${resolveFrom}. ` +
        `Add ${packageName} as a dependency of the adapter package, and make sure it has been built.`,
      { cause: error }
    );
  }
}

/**
 * Collects every custom element declaration in a manifest, preserving the class name the source
 * package exports. Generators that rename declarations MUST capture this first - the renamed name
 * is what they emit, but the original is the only name that can actually be imported.
 *
 * @param {object} manifest A custom elements manifest.
 * @returns {CustomElementEntry[]} One entry per custom element, in manifest order.
 */
export function getCustomElements(manifest) {
  return manifest.modules.flatMap(module =>
    (module.declarations ?? [])
      .filter(declaration => declaration.kind === 'class' && declaration.customElement && declaration.tagName)
      .map(declaration => ({
        tagName: declaration.tagName,
        className: declaration.name,
        modulePath: module.path,
        declaration
      }))
  );
}
