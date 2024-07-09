import { addons } from '@storybook/manager-api';

const banner = document.createElement('div');
banner.classList.add('forge-docs-banner');
banner.innerHTML = '<p>You are currently viewing the latest v3.x docs. To view the legacy v2.x docs, click <a href="https://forge.tylerdev.io/version-2" target="_blank" rel="noreferrer noopener">here</a>.</p>';
document.body.prepend(banner);

addons.setConfig({
  sidebar: {
    showRoots: true,
    collapsedRoots: ['Getting Started', 'Frameworks', 'Components', 'Tokens', 'About'],
    filters: {
      hidden: item => !item.tags?.includes('hidden')
    }
  }
});
