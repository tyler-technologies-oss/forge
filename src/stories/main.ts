module.exports = {
  features: {
    postcss: false,
  },
  stories: ['./src/**/*.stories.*'],
  logLevel: 'debug',
  core: {
    disableTelemetry: true
  },
  addons: [
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
  typescript: {
    check: true,
    reactDocgenTypescriptOptions: {
      propFilter: prop => ['label', 'disabled'].includes(prop.name),
    },
  }
};
