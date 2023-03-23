import '$src/shared';
import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/card';
import '@tylertech/forge/open-icon';
import './expansion-panel.scss';
import type { IExpansionPanelComponent, ISwitchComponent } from '@tylertech/forge';

const manualExpansionPanel = document.querySelector('#expansion-panel-manual') as IExpansionPanelComponent;
const buttonExpansionPanel = document.querySelector('#expansion-panel-button') as IExpansionPanelComponent;
const manualToggleButton = document.querySelector('#manual-toggle-button') as HTMLButtonElement;
const useAnimationToggle = document.getElementById('opt-use-animations') as ISwitchComponent;

manualToggleButton.addEventListener('click', () => {
  manualExpansionPanel.toggle();
  manualToggleButton.ariaExpanded = manualExpansionPanel.open.toString();
});

useAnimationToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  manualExpansionPanel.useAnimations = selected;
  buttonExpansionPanel.useAnimations = selected;
});
