import { compileString } from 'sass';
import { describe, expect, it } from 'vitest';

const STYLES_PATH = 'src/lib/core/styles';
const LIB_PATH = 'src/lib';

const DEPRECATED_MODULES = [
  { module: 'animation', replacement: 'animation' },
  { module: 'border', replacement: 'border' },
  { module: 'elevation', replacement: 'elevation' },
  { module: 'shape', replacement: 'shape' },
  { module: 'spacing', replacement: 'spacing' },
  { module: 'theme', replacement: 'theme' },
  { module: 'typography', replacement: 'typography' },
  { module: 'utils', replacement: 'utils' },
  { module: 'core/config', replacement: 'config' },
  { module: 'theme/utils', replacement: 'theme/utils' },
  { module: 'theme/color-utils', replacement: 'theme/color-utils' },
  { module: 'tokens', replacement: 'theme/tokens' },
  { module: 'tokens/token-utils', replacement: 'token-utils' },
  { module: 'tokens/theme/color-emphasis', replacement: 'color-emphasis' },
  { module: 'tokens/theme/token-utils', replacement: 'theme/token-utils' },
  { module: 'tokens/color-palette', replacement: 'color-palette' },
  { module: 'tokens/color-palette/material-color-palette', replacement: 'color-palette' },
  { module: 'tokens/color-palette/extended-color-palette', replacement: 'color-palette' }
];

function compileWithWarnings(source) {
  const warnings = [];
  const { css } = compileString(source, {
    loadPaths: [STYLES_PATH, LIB_PATH, 'node_modules'],
    logger: { warn: message => warnings.push(message), debug: () => {} }
  });
  return { css, warnings };
}

describe('deprecated core styles modules', () => {
  it.each(DEPRECATED_MODULES)('should warn that "$module" is deprecated and point to its replacement', ({ module, replacement }) => {
    const { warnings } = compileWithWarnings(`@use '${module}' as m;`);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain(`"@tylertech/forge/sass/core/styles/${module}"`);
    expect(warnings[0]).toContain('@tylertech/forge-tokens/sass/');
    expect(warnings[0]).toContain(replacement);
  });

  it('should warn that the core styles index is deprecated', () => {
    const { warnings } = compileWithWarnings(`@use 'core/styles' as m;`);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('"@tylertech/forge/sass/core/styles"');
  });

  it('should continue to provide the module members', () => {
    const { css, warnings } = compileWithWarnings(`@use 'theme'; .a { color: theme.variable(primary); }`);
    expect(css).toContain('color: var(--forge-theme-primary, #3f51b5);');
    expect(warnings).toHaveLength(1);
  });

  it('should not warn when using a non-deprecated forge module that uses the global tokens', () => {
    const { warnings } = compileWithWarnings(`@use 'button/forge-button';`);
    expect(warnings).toEqual([]);
  });
});
