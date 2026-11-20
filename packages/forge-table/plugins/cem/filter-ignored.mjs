import { minimatch } from 'minimatch';

const IGNORED = [
  '**/plugins/**/*',
  '**/stories/**/*',
  '**/dev/**/*',
  '**/dist/**/*',
  '**/esm/**/*',
  '**/tests/**/*',
  '**/extensions/**/*',
  '**/index.ts',
  '**/*.test.ts',
  '**/*.spec.ts',
  '**/*-constants.ts',
  '**/*-utils.ts'
];

/**
 * This plugin filters out ignored modules from the manifest that we don't care about to slim down the size.
 */
export default function forgeFilterUnusedPlugin() {
  return {
    name: 'FORGE - FILTER-IGNORED',
    packageLinkPhase({ customElementsManifest }) {
      customElementsManifest.modules = customElementsManifest.modules.filter(module => !IGNORED.some(pattern => minimatch(module.path, pattern)));
    }
  };
}
