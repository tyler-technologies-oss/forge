import { addons } from 'storybook/manager-api';
import { SET_CONFIG } from 'storybook/internal/core-events';

type PanelPosition = 'bottom' | 'right';

const PANEL_POSITIONS: readonly PanelPosition[] = ['bottom', 'right'];

const panelParam = new URLSearchParams(window.location.search).get('panel');
const requestedPanelPosition = PANEL_POSITIONS.find(position => position === panelParam);

// Each setConfig call resets the layout to its defaults and drops the `panel`
// URL param, so re-apply it after every config change.
if (requestedPanelPosition) {
  addons.register('forge/panel-position', api => {
    const applyPanelPosition = (): void => api.togglePanelPosition(requestedPanelPosition);
    applyPanelPosition();
    api.on(SET_CONFIG, applyPanelPosition);
  });
}

addons.setConfig({
  sidebar: {
    showRoots: true,
    collapsedRoots: ['Getting Started', 'Frameworks', 'Components', 'Tokens', 'About'],
    filters: {
      hidden: item => !item.tags?.includes('hidden')
    }
  }
});
