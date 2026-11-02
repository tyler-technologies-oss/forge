import { readFileSync } from 'fs';
import { compileString } from 'sass';
import { beforeAll, describe, expect, it } from 'vitest';
import { build } from '../scripts/build.js';

const compile = source => compileString(source, { loadPaths: ['sass'], style: 'expanded' }).css;
const collapseWhitespace = css => css.replace(/\s+/g, ' ');

describe('sass', () => {
  beforeAll(async () => {
    await build();
  });

  describe('theme', () => {
    it('should create a variable reference with the token value as the fallback', () => {
      const css = compile(`@use 'theme'; .a { color: theme.variable(primary); }`);
      expect(css).toContain('color: var(--forge-theme-primary, #3f51b5);');
    });

    it('should emit custom properties for the light theme', () => {
      const css = compile(`@use 'theme'; :root { @include theme.properties; }`);
      expect(css).toContain('--forge-theme-primary: #3f51b5;');
      expect(css).toContain('--forge-theme-text-high: rgba(0, 0, 0, 0.87);');
    });

    it('should emit custom properties for the dark theme', () => {
      const css = compile(`@use 'theme'; :root { @include theme.properties-dark; }`);
      expect(css).toContain('--forge-theme-surface: #2c2c2c;');
      expect(css).toContain('--forge-theme-text-high: rgba(255, 255, 255, 0.87);');
    });

    it('should resolve token references to the referenced token value', () => {
      const css = compile(`@use 'theme'; :root { @include theme.properties; }`);
      expect(css).toContain(
        '--forge-theme-surface-bright-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);'
      );
    });

    it('should emit color emphasis custom properties', () => {
      const css = compile(`@use 'theme'; :root { @include theme.color-emphasis-properties; }`);
      expect(css).toContain('--forge-color-emphasis-highest: 0.87;');
    });

    it('should get a color emphasis value by name', () => {
      const css = compile(`@use 'theme'; .a { opacity: theme.emphasis(high); }`);
      expect(css).toContain('opacity: 0.65;');
    });

    it('should generate utility classes for each token', () => {
      const css = compile(`@use 'theme'; @include theme.classes;`);
      expect(css).toContain('.forge-color--primary');
      expect(css).toContain('.forge-background--primary');
    });

    it('should throw for an invalid token', () => {
      expect(() => compile(`@use 'theme'; .a { color: theme.variable(not-a-token); }`)).toThrow(/Invalid theme token/);
    });
  });

  describe('color palette', () => {
    it('should expose palette colors as variables', () => {
      const css = compile(`@use 'color-palette'; .a { color: color-palette.$indigo-500; background: color-palette.$white; }`);
      expect(css).toContain('color: #3f51b5;');
      expect(css).toContain('background: #ffffff;');
    });
  });

  describe('color emphasis', () => {
    it('should get an emphasis level as a percentage', () => {
      const css = compile(`@use 'color-emphasis'; .a { width: color-emphasis.value(medium); }`);
      expect(css).toContain('width: 54%;');
    });
  });

  describe('animation', () => {
    it('should emit custom properties', () => {
      const css = compile(`@use 'animation'; :root { @include animation.properties; }`);
      expect(css).toContain('--forge-animation-duration-short1: 50ms;');
      expect(css).toContain('--forge-animation-easing-standard: cubic-bezier(0.2, 0, 0, 1);');
    });
  });

  describe('border', () => {
    it('should create a variable reference', () => {
      const css = compile(`@use 'border'; .a { border-width: border.variable(thin); }`);
      expect(css).toContain('border-width: var(--forge-border-thin, 1px);');
    });
  });

  describe('shape', () => {
    it('should create a radius that scales with the shape factor', () => {
      const css = compile(`@use 'shape'; .a { @include shape.radius(medium); }`);
      expect(css).toContain('border-radius: calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));');
    });
  });

  describe('spacing', () => {
    it('should get a spacing value', () => {
      const css = compile(`@use 'spacing'; .a { margin: spacing.value(large); }`);
      expect(css).toContain('margin: 24px;');
    });

    it('should create a variable reference', () => {
      const css = compile(`@use 'spacing'; .a { margin: spacing.variable(medium); }`);
      expect(css).toContain('margin: var(--forge-spacing-medium, 16px);');
    });
  });

  describe('elevation', () => {
    it('should set a box shadow', () => {
      const css = compile(`@use 'elevation'; .a { @include elevation.box-shadow(1); }`);
      expect(css).toContain('box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);');
    });

    it('should set a z-index', () => {
      const css = compile(`@use 'elevation'; .a { @include elevation.z-index(dialog); }`);
      expect(css).toContain('z-index: var(--forge-z-index-dialog, 8);');
    });
  });

  describe('typography', () => {
    it('should emit the styles for a typography token', () => {
      const css = collapseWhitespace(compile(`@use 'typography'; .a { @include typography.style(body2); }`));
      expect(css).toContain('font-weight: var(--forge-typography-body2-font-weight, 400);');
      expect(css).toContain(
        'font-size: var(--forge-typography-body2-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, 1)));'
      );
    });

    it('should share scale custom properties between styles in the same family', () => {
      const css = collapseWhitespace(compile(`@use 'typography'; .a { @include typography.style(body1); } .b { @include typography.style(kbd); }`));
      expect(css).toContain('var(--forge-typography-body-font-size-scale, 0.875)');
      expect(css).toContain('var(--forge-typography-label-font-size-scale, 0.75)');
    });

    it('should not scale a line height that is not numeric', () => {
      const css = compile(`@use 'typography'; .a { @include typography.style(button); }`);
      expect(css).toContain('line-height: var(--forge-typography-button-line-height, normal);');
    });

    it('should throw for an invalid style', () => {
      expect(() => compile(`@use 'typography'; .a { @include typography.style(not-a-style); }`)).toThrow(/Invalid typography style/);
    });
  });

  describe('token utils', () => {
    it('should compute the dependent colors of a theme color', () => {
      const css = compile(
        `@use 'sass:map'; @use 'theme/token-utils'; $theme: token-utils.get-color-theme(test, #3f51b5, #ffffff); .a { color: map.get($theme, on-test); }`
      );
      expect(css).toContain('color: #ffffff;');
    });
  });

  describe('generated files', () => {
    it('should be marked as generated', () => {
      expect(readFileSync('sass/tokens/_theme-light.scss', 'utf-8')).toContain('generated by Style Dictionary');
    });
  });
});
