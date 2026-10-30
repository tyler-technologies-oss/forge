import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { generateReactWrappers } from 'custom-element-react-wrappers';
import { pascalCase } from 'change-case';
import { getCustomElements, loadManifest } from '../core/manifest.mjs';
import { createEntryPointResolver } from '../core/entry-points.mjs';
import { backfillAttributeFieldNames, unwrapEventDetailTypes } from '../core/normalize.mjs';

/**
 * @typedef {object} ReactAdapterOptions
 * @property {string} packageName The web component package to generate wrappers for.
 * @property {import('../core/entry-points.mjs').EntryPoint[]} entryPoints The package's entry points.
 * @property {string} [outDir] Directory to write wrappers to. Defaults to `dist`.
 * @property {(tagName: string) => string} [componentName] Names the React component for a tag.
 *   Defaults to the pascal-cased tag, so `forge-rte-bold` becomes `ForgeRteBold`, matching
 *   `@tylertech/forge-react`.
 * @property {Record<string, string[]>} [propertyProps] Props, keyed by tag name, that React must
 *   assign as PROPERTIES rather than attributes - for attribute-backed props whose value may be an
 *   object. See `forwardAsProperties`.
 */

/**
 * Generates a React wrapper per custom element in a package.
 *
 * @param {ReactAdapterOptions} options
 * @returns {{ generated: number, backfilled: number, unwrapped: number }} What the run changed.
 */
export function generateReactAdapter({ packageName, entryPoints, outDir = 'dist', componentName = pascalCase, propertyProps = {} }) {
  const { manifest } = loadManifest(packageName);
  const elements = getCustomElements(manifest);

  if (!elements.length) {
    throw new Error(`generateReactAdapter: ${packageName} declares no custom elements.`);
  }

  const declarations = elements.map(element => element.declaration);
  const backfilled = backfillAttributeFieldNames(declarations);
  const unwrapped = unwrapEventDetailTypes(declarations);

  for (const { declaration } of elements) {
    forwardAsProperties(declaration, propertyProps[declaration.tagName] ?? []);
  }

  /**
   * The generator derives BOTH the React component name and the element type import from the
   * manifest declaration's `name`, so renaming declarations to get the component name we want also
   * changes what the generated declaration files try to import. Remember the real export name per
   * tag before renaming, then repoint the imports afterwards.
   *
   * Skipping that repoint is a live bug in `@tylertech/forge-extended-react`: every generated
   * declaration file in the published package imports a class the source package exports nowhere.
   */
  const realClassNames = new Map(elements.map(element => [componentName(element.tagName), element.className]));

  for (const element of elements) {
    element.declaration.name = componentName(element.tagName);
  }

  const resolveEntryPoint = createEntryPointResolver(packageName, entryPoints);
  const modulePathsByTag = new Map(elements.map(element => [element.tagName, resolveEntryPoint(element.modulePath)]));

  generateReactWrappers(manifest, {
    outdir: outDir,
    modulePath: (_className, tagName) => modulePathsByTag.get(tagName)
  });

  repointElementImports(outDir, realClassNames);

  return {
    generated: readdirSync(outDir).filter(name => name.endsWith('.d.ts')).length,
    backfilled,
    unwrapped
  };
}

/**
 * Drops the named props from a declaration's attribute list so the generator forwards them as
 * properties instead of attributes.
 *
 * The generator decides this by whether the manifest lists a prop as an attribute: attribute-backed
 * props are spread into `createElement`, and React sets unknown props on a custom element as
 * ATTRIBUTES - which stringifies an object to `"[object Object]"`. Props with no attribute get a
 * `useProperties` hook that assigns `element[prop] = value` through a ref, which works for objects
 * and strings alike.
 *
 * Only the in-memory manifest is changed; the package's published `custom-elements.json` still
 * documents the attribute, which remains real and usable in HTML.
 *
 * @param {object} declaration A custom element declaration to adjust in place.
 * @param {string[]} propNames Field names to forward as properties.
 */
function forwardAsProperties(declaration, propNames) {
  if (!propNames.length) {
    return;
  }

  const attributes = declaration.attributes ?? [];
  const publicFields = new Set(
    (declaration.members ?? [])
      .filter(member => member.kind === 'field' && member.privacy !== 'private' && member.privacy !== 'protected')
      .map(member => member.name)
  );

  for (const propName of propNames) {
    if (!publicFields.has(propName)) {
      throw new Error(`${declaration.tagName}: cannot forward "${propName}" as a property because it is not a public field.`);
    }

    const index = attributes.findIndex(attribute => attribute.fieldName === propName);
    if (index === -1) {
      throw new Error(
        `${declaration.tagName}: "${propName}" is configured to forward as a property but is not attribute-backed, so it already does. Remove it from propertyProps.`
      );
    }

    attributes.splice(index, 1);
  }
}

/**
 * Rewrites each generated declaration file's element import to the class name the source package
 * actually exports. Throws if any file was left unchanged, since that means the generator's output
 * format moved and the imports can no longer be trusted to resolve.
 */
function repointElementImports(outDir, realClassNames) {
  const unchanged = [];

  for (const [generatedName, realName] of realClassNames) {
    const path = join(outDir, `${generatedName}.d.ts`);
    const source = readFileSync(path, 'utf-8');
    const updated = source.replace(`${generatedName} as ${generatedName}Element`, `${realName} as ${generatedName}Element`);

    if (updated === source) {
      unchanged.push(generatedName);
      continue;
    }

    writeFileSync(path, updated);
  }

  if (unchanged.length) {
    throw new Error(
      `Expected to rewrite the element import in every generated declaration file, but ${unchanged.join(', ')} were unchanged. ` +
        'The generator output format has probably changed - verify the generated .d.ts imports resolve before shipping.'
    );
  }
}
