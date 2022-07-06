const path = require('path');
const { mergeConfig } = require('vite');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "staticDirs": ['../src/stories/assets'],
  "addons": [
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-toolbars',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          parser: 'typescript',
          injectStoryParameters: false,
        },
        configureJsx: true
      },
    },
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    'storybook-dark-mode'
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  // "features": {
  //   "storyStoreV7": true
  // },
  typescript: {
    check: true,
    reactDocgenTypescriptOptions: {
      propFilter: prop => ['label', 'disabled'].includes(prop.name),
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        rollupOptions: {
          plugins: [
            inlineLibraryHtml
          ]
        }
      },
      resolve: {
        alias: {
          '@tylertech/forge': path.resolve(__dirname, '../../lib/index.ts')
        }
      },
      plugins: [
        inlineLibraryHtml
      ],
      optimizeDeps: {
        exclude: [
          '@material/ripple',
          '@tylertech/forge',
          '@tylertech/tyler-icons',
          '@tylertech/forge-core'
        ]
      }
    });
  }
};

const inlineLibraryHtml = {
  name: 'plugin-inline-html',
  transform(code, id) {
    if (/^.*\/lib\/.*\.html$/g.test(id)) {
      code = `export default \`${code}\``;
    }
    return { code, map: null };
  }
};
