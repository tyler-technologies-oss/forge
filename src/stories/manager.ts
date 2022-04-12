import { addons } from '@storybook/addons';

addons.setConfig({
  previewTabs: {
    canvas: { title: 'Demo ' }
  },
  sidebar: {
    showRoots: false,
    collapsedRoots: ['Guides', 'Components']
  }
});
