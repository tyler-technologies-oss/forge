import minimatch from 'minimatch';

const IGNORED = [
  '**/plugins/**/*',
  '**/stories/**/*',
  '**/dev/**/*',
  '**/dist/**/*',
  '**/test/**/*',
  '**/index.ts',
  '**/*.test.ts',
  '**/*.spec.ts',
  '**/*-foundation.ts',
  '**/*-adapter.ts',
  '**/*-constants.ts',
  '**/*-component-delegate.ts',
  '**/core/**/*.ts',
  '**/*-utils.ts',
  'src/lib/constants.ts'
];

/**
 * This plugin filters out ignored modules from the manifest that we don't care about to slim down the size.
 */
export default function forgeFilterUnusedPlugin() {
  return {
    name: 'FORGE - BRANCH-NAME',
    packageLinkPhase({ customElementsManifest }) {
      customElementsManifest.modules = customElementsManifest.modules.filter(module => {
        return !IGNORED.some(pattern => minimatch(module.path, pattern));
      });
    }
  };
}
