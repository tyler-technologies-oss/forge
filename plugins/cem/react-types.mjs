import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { getCustomElements, getPublicMembers } from './utils.mjs';

/**
 * Types that should be converted to `any` in the generated typings file.
 */
const IGNORED_ANY_TYPES = ['TValue'];

/**
 * This plugin generates a .d.ts file for ambient TypeScript type definitions for all Forge custom elements on `JSX.IntrinsicElements`.
 */
export default function forgeJSXTypesPlugin({ outDir = './', fileName = 'react-types.d.ts' } = {}) {
  return {
    name: 'FORGE - JSX-TYPES',
    async packageLinkPhase({ customElementsManifest }) {
      // Get all custom element declarations from the manifest
      const components = getCustomElements(customElementsManifest);

      // Capture all of the available public types from the manifest that could exist as public component API types
      const allTypes = Object.keys(customElementsManifest.forgeTypes);

      // Create the typings file contents
      const contents = createTypingsFromComponents(components, allTypes);

      // Ensure the output directory exists
      if (outDir !== './' && !fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      // Write the formatted file to the output directory
      const outputPath = path.join(outDir, fileName);
      fs.writeFileSync(outputPath, await prettier.format(contents, { parser: 'typescript', printWidth: 120, singleQuote: true }), 'utf-8');
    }
  };
}

function createTypingsFromComponents(components, allTypes) {
  const REFERENCED_TYPES_PLACEHOLDER = '<!-- FORGE_TYPE_IMPORTS_PLACEHOLDER -->';

  // prettier-ignore
  const declaration = `
    import React from 'react';

    ${REFERENCED_TYPES_PLACEHOLDER}

    type ReactHTMLElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

    ${components.map(component => {
      return `
        type IForge${component.name}Props = {
          ${getComponentPropertiesAndAttributes(component)}
          ${getComponentEvents(component)}
        }
      `;
    }).join('\n')}

    /**
     * To use Forge custom elements in JSX, you need to augment the JSX.IntrinsicElements interface with the custom element tags.
     * 
     * Usage:
     * \`\`\`ts
     * import type { ForgeCustomElements } from '@tylertech/forge/types/react-types';
     * 
     * declare global {
     *   namespace JSX {
     *     interface IntrinsicElements extends ForgeCustomElements {}
     *   }
     * }
     * \`\`\`
     */
    export type ForgeCustomElements = {
      ${components.map(component => {
        return `'${component.tagName}': Partial<IForge${component.name}Props | ReactHTMLElementProps>;`;
      }).join('\n')}
    }
  `;

  // Create an import statement for any of the Forge global types that are referenced in the component declarations
  const referencedTypes = allTypes.filter(type => declaration.match(new RegExp(`\\b${type}\\b`)));
  const typeImport = `
    import type {
      ${referencedTypes.map(type => type).join(',\n')}
    } from '@tylertech/forge';
  `;
  return declaration.replace(REFERENCED_TYPES_PLACEHOLDER, typeImport);
}

function getComponentPropertiesAndAttributes(component) {
  const properties = getPublicMembers(component);
  const attributes = (component.attributes ?? []).filter(attr => !properties.find(prop => prop.name === attr.name));
  const uniquePropsAndAttrs = [...properties, ...attributes];
  return uniquePropsAndAttrs
    .map(attr => {
      const type = attr.type?.text ?? 'string';
      return `'${attr.name}'?: ${IGNORED_ANY_TYPES.includes(type) ? 'any' : type};`;
    })
    .join('\n');
}

function getComponentEvents(component) {
  return (
    component.events
      ?.map(event => {
        return `'on${event.name}'?: (e: ${event.type?.text ?? 'CustomEvent'}) => void;`;
      })
      .join('\n') ?? ''
  );
}
