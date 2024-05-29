import type { Preview } from '@storybook/web-components';
import { addons } from '@storybook/preview-api';
import { light, dark } from './forge-theme';

import '@tylertech/forge/theme/forge-theme.scss';
import '@tylertech/forge/typography/forge-typography.scss';
import '@tylertech/forge/forge-tokens.scss';
import './preview-global.scss';

const toggleDarkTheme = value => document.body.classList.toggle('forge-storybook-dark', value);
const channel = addons.getChannel();
channel.on('DARK_MODE', isDark => toggleDarkTheme(isDark));
channel.off('DARK_MODE', isDark => toggleDarkTheme(isDark));

const preview: Preview = {
  parameters: {
    docs: {
      source: { format: 'html', dark: true },
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
            'Accessibility',
            'Customization',
            'Forms'
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
