import '$src/shared';
import '@tylertech/forge/expansion-panel';
import '@tylertech/forge/card';
import '@tylertech/forge/open-icon';
import './expansion-panel.scss';
import { IExpansionPanelComponent } from '@tylertech/forge/expansion-panel';
import { ISwitchComponent } from '@tylertech/forge/switch';

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

function setPanelProperty<T extends keyof IExpansionPanelComponent>(property: T, value: IExpansionPanelComponent[T]): void {
  getAllPanels().forEach(p => p[property] = value);
}

function getAllPanels(): IExpansionPanelComponent[] {
  return Array.from(document.querySelectorAll<IExpansionPanelComponent>('forge-expansion-panel'));
}
