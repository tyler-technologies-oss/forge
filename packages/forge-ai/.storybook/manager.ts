import { addons } from 'storybook/manager-api';

addons.setConfig({
  sidebar: {
    showRoots: true,
    collapsedRoots: ['Components'],
    filters: {
      hidden: item => !item.tags?.includes('hidden')
    }
  }
});
