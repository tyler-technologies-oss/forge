import { create } from 'storybook/theming/create';

export const light = create({
  base: 'light',

  // Branding
  brandTitle: 'Tyler Forge Design System Logo',
  brandImage: 'forge-logo-full-color.svg',

  // Theme
  colorPrimary: '#3f51b5',
  colorSecondary: '#3f51b5',

  // UI
  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appBorderColor: '#e0e0e0',
  appBorderRadius: 4,

  // Typography
  fontBase: 'Roboto, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'rgba(0, 0, 0, 0.87)',
  textMutedColor: 'rgba(0, 0, 0, 0.54)',
  textInverseColor: 'rgba(255, 255, 255, 0.87)',

  // Toolbar default and active colors
  barTextColor: 'rgba(0, 0, 0, 0.87)',
  barSelectedColor: '#3f51b5',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: 'rgba(0, 0, 0, 0.54)',
  inputTextColor: 'rgba(0, 0, 0, 0.87)',
  inputBorderRadius: 4
});

export const dark = create({
  base: 'dark',

  // Branding
  brandTitle: 'Tyler Forge Design System Logo',
  brandImage: 'forge-logo-full-white.svg',

  // Theme
  colorPrimary: '#8c9eff',
  colorSecondary: '#8c9eff',

  // UI
  appBg: '#212121',
  appContentBg: '#2c2c2c',
  appBorderColor: 'rgba(255, 255, 255, 0.12)',
  appBorderRadius: 4,

  // Typography
  fontBase: 'Roboto, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'rgba(255, 255, 255, 0.87)',
  textMutedColor: 'rgba(255, 255, 255, 0.54)',
  textInverseColor: 'rgba(0, 0, 0, 0.87)',

  // Toolbar default and active colors
  barTextColor: 'rgba(255, 255, 255, 0.87)',
  barSelectedColor: '#8c9eff',
  barBg: '#2c2c2c',

  // Form colors
  inputBg: '#2c2c2c',
  inputBorder: 'rgba(255, 255, 255, 0.54)',
  inputTextColor: 'rgba(255, 255, 255, 0.87)',
  inputBorderRadius: 4
});
