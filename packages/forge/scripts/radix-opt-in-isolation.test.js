import { readFileSync } from 'node:fs';
import { compile, compileString } from 'sass';
import { glob } from 'glob';
import { describe, expect, it } from 'vitest';
import { flattenCss, SASS_OPTIONS } from './css-declarations.js';

const ROOT_STYLESHEETS = ['forge', 'forge-dark', 'forge-core', 'forge-tokens', 'forge-ai'].map(name => `src/lib/${name}.scss`);
const RADIX_STYLESHEETS = ['src/lib/forge-radix.scss', 'src/lib/forge-radix-dark.scss'];
const RADIX_SOURCE_ALLOWLIST = [...RADIX_STYLESHEETS, 'src/lib/theme/_theme-radix.scss'];

/** The theme tokens that component styles already declared before the Radix theme was added, by component directory. */
const COMPONENT_THEME_TOKEN_ALLOWLIST = {
  'app-bar': ['primary', 'on-primary', 'text-high', 'text-medium', 'text-low', 'outline-high', 'outline-medium', 'outline-low'],
  dialog: ['surface'],
  popover: ['surface']
};

const isPartial = file => file.split('/').pop().startsWith('_');
const compileStylesheet = file => compile(file, SASS_OPTIONS).css;

const collectRadixColorValues = () => {
  const values = new Set();
  for (const module of ['radix-color-palette', 'radix-color-palette-dark']) {
    const source = `
      @use 'sass:meta';
      @use '@tylertech/forge-tokens/sass/${module}' as palette;
      :root { @each $name, $value in meta.module-variables(palette) { --#{$name}: #{$value}; } }
    `;
    for (const declaration of flattenCss(compileString(source, SASS_OPTIONS).css)) {
      const value = declaration.split(': ').slice(1).join(': ');
      if (value.includes('oklch(')) {
        values.add(value);
      }
    }
  }
  return values;
};

const entryStylesheets = (await glob('src/lib/**/*.scss')).filter(file => !isPartial(file) && !RADIX_STYLESHEETS.includes(file)).sort();
const compiled = new Map(entryStylesheets.map(file => [file, compileStylesheet(file)]));
const radixColorValues = collectRadixColorValues();

const themeTokenNames = (css, scope) =>
  new Set(
    flattenCss(css)
      .filter(declaration => declaration.startsWith(`${scope} | --forge-theme-`))
      .map(declaration => declaration.split(' | ')[1].split(':')[0])
  );

describe('radix opt-in isolation', () => {
  describe('default stylesheets', () => {
    it('should compile every default stylesheet', () => {
      expect(entryStylesheets.length).toBeGreaterThan(100);
      expect(compiled.size).toBe(entryStylesheets.length);
    });

    it('should not contain any radix palette color', () => {
      expect(radixColorValues.size).toBeGreaterThan(100);
      const offenders = [...compiled].filter(([, css]) => [...radixColorValues].some(value => css.includes(value))).map(([file]) => file);
      expect(offenders).toEqual([]);
    });

    it('should not declare theme tokens from component styles except those they already declared', () => {
      const offenders = [];
      for (const [file, css] of compiled) {
        const isComponentStylesheet = !ROOT_STYLESHEETS.includes(file) && !file.startsWith('src/lib/theme/');
        if (!isComponentStylesheet) {
          continue;
        }
        const directory = file.split('/')[2];
        const allowed = (COMPONENT_THEME_TOKEN_ALLOWLIST[directory] ?? []).map(name => `--forge-theme-${name}`);
        const declared = flattenCss(css)
          .map(declaration => declaration.split(' | ')[1])
          .filter(declaration => declaration.startsWith('--forge-theme-'))
          .map(declaration => declaration.split(':')[0]);
        offenders.push(...declared.filter(name => !allowed.includes(name)).map(name => `${file}: ${name}`));
      }
      expect(offenders).toEqual([]);
    });

    it('should not import radix modules from any source file other than the radix theme', () => {
      const offenders = glob
        .sync('src/lib/**/*.scss')
        .filter(file => !RADIX_SOURCE_ALLOWLIST.includes(file))
        .filter(file => /@(?:use|forward)\s+['"][^'"]*radix/.test(readFileSync(file, 'utf8')));
      expect(offenders).toEqual([]);
    });
  });

  describe('radix stylesheets', () => {
    it.each(RADIX_STYLESHEETS)('should only declare custom properties in %s', file => {
      const nonCustomProperties = flattenCss(compileStylesheet(file)).filter(declaration => !declaration.includes(' | --'));
      expect(nonCustomProperties).toEqual([]);
    });

    it.each([
      ['src/lib/forge-radix.scss', 'src/lib/forge.scss'],
      ['src/lib/forge-radix-dark.scss', 'src/lib/forge-dark.scss']
    ])('should define every theme token of the default theme in %s', (radixFile, defaultFile) => {
      const radixTokens = themeTokenNames(compileStylesheet(radixFile), ':root');
      const defaultTokens = themeTokenNames(compiled.get(defaultFile), ':root');
      expect(defaultTokens.size).toBeGreaterThan(100);
      expect([...defaultTokens].filter(name => !radixTokens.has(name))).toEqual([]);
    });
  });
});
