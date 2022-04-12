import { listenToThemeChange, addDefaultForgeTheme } from './theme-helper';
import { addForgeDocsCoreStyles } from './forge-react-style-helper';
import { defineComponents } from '../lib';
import { StorybookMdxComponents } from './StorybookMdxProvider';
import forgeTheme from './forge-theme';
import { themes } from "@storybook/theming";

defineComponents();
addDefaultForgeTheme();
addForgeDocsCoreStyles();
listenToThemeChange();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'Forge',
        'Overview',
        [
          'Getting started',
          'Components'
        ],
        'Guides',
        [
          'Component architecture',
          'Theming',
          'Using icons',
          'Development',
          'Component customization',
          'Shadow DOM',
          'Sass library',
          'Component tutorial'
        ],
        'Components'
      ],
      method: 'alphabetical'
    },
  },
  docs: {
    components: {...StorybookMdxComponents},
  },
  darkMode: {
    light: {
      ...themes.normal,
      ...forgeTheme.light
    },
    dark: {
      ...themes.dark,
      ...forgeTheme.dark
    }
  }
};
