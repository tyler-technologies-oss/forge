import '$src/shared';
import '@tylertech/forge/card';
import '@tylertech/forge/expansion-panel';
import { IExpansionPanelComponent } from '@tylertech/forge/expansion-panel';
import '@tylertech/forge/expansion-panel/forge-expansion-panel.scss';
import '@tylertech/forge/open-icon';
import { ISwitchComponent } from '@tylertech/forge/switch';
import './expansion-panel.scss';

const cssOnlyPanel = document.querySelector('.forge-expansion-panel');
const cssOnlyPanelTrigger = document.querySelector('#css-only-panel-trigger') as HTMLButtonElement;
cssOnlyPanelTrigger.addEventListener('click', () => cssOnlyPanel.classList.toggle('forge-expansion-panel--open'));

const animationTypeSelect = document.getElementById('opt-animation-type') as HTMLSelectElement;
animationTypeSelect.addEventListener('change', () => {
  setPanelProperty('animationType', animationTypeSelect.value as IExpansionPanelComponent['animationType']);
});

const openToggle = document.getElementById('opt-open') as ISwitchComponent;
openToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  setPanelProperty('open', selected);
});

const horizontalOrientationToggle = document.getElementById('opt-horizontal-orientation') as ISwitchComponent;
horizontalOrientationToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  setPanelProperty('orientation', selected ? 'horizontal' : 'vertical');
});

getAllPanels().forEach(panel => {
  panel.addEventListener('forge-expansion-panel-toggle', evt => console.log(evt));
});

function setPanelProperty<T extends keyof IExpansionPanelComponent>(property: T, value: IExpansionPanelComponent[T]): void {
  getAllPanels().forEach(p => (p[property] = value));
}

function getAllPanels(): IExpansionPanelComponent[] {
  return Array.from(document.querySelectorAll<IExpansionPanelComponent>('forge-expansion-panel'));
}
