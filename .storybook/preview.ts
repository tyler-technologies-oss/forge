import type { Preview } from '@storybook/web-components';
import { addons } from '@storybook/preview-api';
import { setCustomElementsManifest } from '@storybook/web-components';
import { light, dark } from './forge-theme';
import cem from '../dist/cem/custom-elements.json';

import '@tylertech/forge/theme/forge-theme.scss';
import '@tylertech/forge/forge-tokens.scss';
import './preview-global.scss';

setCustomElementsManifest(cem);

const toggleDarkTheme = value => document.body.classList.toggle('forge-storybook-dark', value);
const channel = addons.getChannel();
channel.on('DARK_MODE', isDark => toggleDarkTheme(isDark));
channel.off('DARK_MODE', isDark => toggleDarkTheme(isDark));

const preview: Preview = {
  parameters: {
    docs: {
      source: { format: 'html' },
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h2,h3,h4'
      },
    },
    darkMode: { light, dark },
    options: {
      storySort: {
        order: [
          'Home',
          'Getting Started',
          [
            'Installation',
            'Usage',
            'Typography',
            'Theming',
            'Customization',
          ],
          'Frameworks',
          [
            'Angular',
            'React',
            'Vue',
            'Svelte',
            'Blazor'
          ],
          'Components',
          'Design Tokens',
          'About'
        ],
        method: 'alphabetical'
      },
    },
  },
};

export default preview;
