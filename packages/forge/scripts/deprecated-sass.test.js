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
  { module: 'tokens/color-palette/extended-color-palette', replacement: 'color-palette' },
  { module: 'tokens/animation/tokens', replacement: 'tokens/animation' },
  { module: 'tokens/border/tokens', replacement: 'tokens/border' },
  { module: 'tokens/elevation/tokens', replacement: 'tokens/elevation' },
  { module: 'tokens/shape/tokens', replacement: 'tokens/shape' },
  { module: 'tokens/spacing/tokens', replacement: 'tokens/spacing' },
  { module: 'tokens/theme/tokens', replacement: 'theme/tokens' },
  { module: 'tokens/theme/tokens.brand', replacement: 'theme/tokens' },
  { module: 'tokens/theme/tokens.core', replacement: 'theme/tokens' },
  { module: 'tokens/theme/tokens.status', replacement: 'theme/tokens' },
  { module: 'tokens/theme/tokens.surface', replacement: 'theme/tokens' },
  { module: 'tokens/theme/tokens.text', replacement: 'theme/tokens' },
  { module: 'tokens/theme/tokens.utilities', replacement: 'theme/tokens' },
  { module: 'tokens/typography/scale', replacement: 'tokens/typography' },
  { module: 'tokens/typography/tokens', replacement: 'typography/tokens' },
  { module: 'tokens/typography/tokens.body', replacement: 'typography/tokens' },
  { module: 'tokens/typography/tokens.core', replacement: 'tokens/typography' },
  { module: 'tokens/typography/tokens.display', replacement: 'typography/tokens' },
  { module: 'tokens/typography/tokens.heading', replacement: 'typography/tokens' },
  { module: 'tokens/typography/tokens.label', replacement: 'typography/tokens' },
  { module: 'tokens/typography/tokens.subheading', replacement: 'typography/tokens' },
  { module: 'tokens/typography/type-utils', replacement: 'typography' },
  { module: 'tokens/typography/weight', replacement: 'typography' }
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
    expect(css).toContain('color: var(--forge-theme-primary, oklch(47.82% 0.1589 271.4deg));');
    expect(warnings).toHaveLength(1);
  });

  it('should continue to provide the elevation and z-index token maps', () => {
    const { css } = compileWithWarnings(
      `@use 'sass:map'; @use 'tokens/elevation/tokens' as m; .a { box-shadow: #{map.get(m.$tokens, 4)}; z-index: map.get(m.$z-index-tokens, dialog); }`
    );
    expect(css).toContain('box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);');
    expect(css).toContain('z-index: 8;');
  });

  it('should continue to provide the theme token group maps', () => {
    const { css } = compileWithWarnings(`@use 'sass:map'; @use 'tokens/theme/tokens.core' as m; .a { color: map.get(m.$tokens, primary); }`);
    expect(css).toContain('color: oklch(47.82% 0.1589 271.4deg);');
  });

  it('should apply shape overrides to the token values', () => {
    const { css } = compileWithWarnings(`@use 'tokens/shape/tokens' as m with ($base: 8px); .a { a: m.$medium; b: m.get(medium); }`);
    expect(css).toContain('a: 8px;');
    expect(css).toContain('b: 8px;');
  });

  it('should apply spacing overrides to the token values', () => {
    const { css } = compileWithWarnings(`@use 'tokens/spacing/tokens' as m with ($base: 8px); .a { margin: m.get(medium); }`);
    expect(css).toContain('margin: 8px;');
  });

  it('should apply elevation color overrides to the token values', () => {
    const { css } = compileWithWarnings(`@use 'tokens/elevation/tokens' as m with ($baseline-color: red); .a { box-shadow: #{m.get(1)}; }`);
    expect(css).toContain('box-shadow: 0px 2px 1px -1px rgba(255, 0, 0, 0.2), 0px 1px 1px 0px rgba(255, 0, 0, 0.14), 0px 1px 3px 0px rgba(255, 0, 0, 0.12);');
  });

  it('should apply z-index overrides to the elevation z-index tokens', () => {
    const { css } = compileWithWarnings(
      `@use 'sass:map'; @use 'tokens/elevation/tokens' as m with ($z-index-tokens: (dialog: 99)); .a { z-index: map.get(m.$z-index-tokens, dialog); }`
    );
    expect(css).toContain('z-index: 99;');
  });

  it('should not warn when using a non-deprecated forge module that uses the global tokens', () => {
    const { warnings } = compileWithWarnings(`@use 'button/forge-button';`);
    expect(warnings).toEqual([]);
  });
});
