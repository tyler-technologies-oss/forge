import { addons } from '@storybook/manager-api';

addons.setConfig({
  sidebar: {
    showRoots: true,
    collapsedRoots: ['Getting Started', 'Frameworks', 'Components', 'Tokens', 'About'],
    filters: {
      hidden: item => !item.tags?.includes('hidden')
    }
  },
});
