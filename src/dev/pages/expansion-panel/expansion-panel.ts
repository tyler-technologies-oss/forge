import '$src/shared';
import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/card';
import '@tylertech/forge/open-icon';
import './expansion-panel.scss';
import type { IExpansionPanelComponent, ISwitchComponent } from '@tylertech/forge';

const basicExpansionPanel = document.querySelector('#expansion-panel-basic') as IExpansionPanelComponent;
const cardExpansionPanel = document.querySelector('#expansion-panel-card') as IExpansionPanelComponent;
const useAnimationToggle = document.getElementById('opt-use-animations') as ISwitchComponent;

useAnimationToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  basicExpansionPanel.useAnimations = selected;
  cardExpansionPanel.useAnimations = selected;
});
