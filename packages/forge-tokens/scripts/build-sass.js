import StyleDictionary from 'style-dictionary';
import { sassFormat } from './sass-format.js';

const FORMAT_NAME = 'forge/sass';
const BUILD_PATH = 'sass/tokens/';

const SHARED_SOURCES = ['tokens/color/*.json', 'tokens/elevation.json'];

StyleDictionary.registerFormat({ name: FORMAT_NAME, format: sassFormat });

const GLOBAL_FILES = [
  { destination: '_color-palette.scss', variables: [{ type: 'variables', root: ['color', 'palette'] }] },
  { destination: '_color-emphasis.scss', variables: [{ name: 'emphasis', root: ['color', 'emphasis'] }] },
  { destination: '_animation.scss', variables: [{ name: 'tokens', root: ['animation'], defaultable: true }] },
  { destination: '_border.scss', variables: [{ name: 'tokens', root: ['border'], defaultable: true }] },
  { destination: '_shape.scss', variables: [{ name: 'tokens', root: ['shape'], defaultable: true }] },
  { destination: '_spacing.scss', variables: [{ name: 'tokens', root: ['spacing'], defaultable: true }] },
  { destination: '_elevation.scss', variables: [{ name: 'tokens', root: ['elevation', 'level'], defaultable: true }] },
  { destination: '_z-index.scss', variables: [{ name: 'tokens', root: ['z-index'], defaultable: true }] },
  {
    destination: '_typography.scss',
    variables: [
      { name: 'font-family', root: ['typography', 'font-family'], type: 'value', defaultable: true },
      { name: 'font-size', root: ['typography', 'font-size'], type: 'value', defaultable: true },
      { name: 'scale', root: ['typography', 'scale'], quoteKeys: true },
      { name: 'styles', root: ['typography', 'style'], depth: 1, defaultable: true }
    ]
  }
];

const THEME_FILES = [
  { mode: 'light', source: 'tokens/theme/light.json', destination: '_theme-light.scss' },
  { mode: 'dark', source: 'tokens/theme/dark.json', destination: '_theme-dark.scss' }
];

const createConfig = ({ source, files }) => ({
  source,
  log: { verbosity: 'silent' },
  platforms: {
    sass: {
      transforms: ['cubicBezier/css', 'shadow/css/shorthand'],
      buildPath: BUILD_PATH,
      files: files.map(({ destination, variables }) => ({
        destination,
        format: FORMAT_NAME,
        options: { variables },
        filter: token => variables.some(({ root }) => root.every((segment, i) => token.path[i] === segment))
      }))
    }
  }
});

/**
 * Generates the Sass token files in `sass/tokens/` from the design token JSON in `tokens/`.
 */
export async function buildSass() {
  const base = new StyleDictionary(
    createConfig({
      source: ['tokens/*.json', 'tokens/color/*.json'],
      files: GLOBAL_FILES
    })
  );
  await base.buildPlatform('sass');

  // Light and dark themes define the same token names, so each is built separately with the shared tokens available for reference resolution
  for (const { source, destination } of THEME_FILES) {
    const theme = new StyleDictionary(
      createConfig({
        source: [...SHARED_SOURCES, source],
        files: [{ destination, variables: [{ name: 'tokens', root: ['theme'], defaultable: true }] }]
      })
    );
    await theme.buildPlatform('sass');
  }
}
