/**
 * @typedef {object} EntryPoint
 * @property {string} subpath The export subpath, relative to the package name. `''` is the root.
 * @property {string} modulePrefix The manifest module path prefix this entry point exports.
 */

/**
 * Builds a resolver from a manifest module path to the import specifier that actually exports it.
 *
 * Packages do not all expose their elements from one place: `@tylertech/forge-rich-text-editor`
 * exports its core elements from the root and its `forge-rte-*` features from `./features`, while
 * `@tylertech/forge` exports everything from the root. Generators need this mapping either to emit
 * imports directly (React) or to group elements per generation pass (Angular).
 *
 * The longest matching prefix wins, so a nested entry point can be listed in any order.
 *
 * @param {string} packageName The package the elements are imported from.
 * @param {EntryPoint[]} entryPoints The package's entry points.
 * @returns {(modulePath: string) => string} Resolver returning an import specifier.
 */
export function createEntryPointResolver(packageName, entryPoints) {
  if (!entryPoints.length) {
    throw new Error('createEntryPointResolver: at least one entry point is required.');
  }

  const ordered = [...entryPoints].sort((a, b) => b.modulePrefix.length - a.modulePrefix.length);

  return modulePath => {
    const match = ordered.find(entryPoint => modulePath.startsWith(entryPoint.modulePrefix));

    if (!match) {
      throw new Error(
        `No entry point matches the module path "${modulePath}". ` + `Configured prefixes: ${ordered.map(entryPoint => entryPoint.modulePrefix).join(', ')}.`
      );
    }

    return match.subpath ? `${packageName}/${match.subpath}` : packageName;
  };
}

/**
 * Groups elements by the entry point that exports them, dropping entry points that export nothing.
 * Generators that can only target one import specifier per run use this to run once per group.
 *
 * @template {{ modulePath: string }} T
 * @param {T[]} elements The elements to group.
 * @param {(modulePath: string) => string} resolve An entry point resolver.
 * @returns {{ importPath: string, members: T[] }[]} One group per entry point that has members.
 */
export function groupByEntryPoint(elements, resolve) {
  const groups = new Map();

  for (const element of elements) {
    const importPath = resolve(element.modulePath);
    groups.set(importPath, [...(groups.get(importPath) ?? []), element]);
  }

  return [...groups].map(([importPath, members]) => ({ importPath, members }));
}
