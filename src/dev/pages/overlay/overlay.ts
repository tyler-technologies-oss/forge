import '$src/shared';
import { ISelectComponent, ISwitchComponent } from '@tylertech/forge';
import type { IOverlayComponent } from '@tylertech/forge';
import { toggleClass } from '@tylertech/forge-core';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import '@tylertech/forge/overlay';
import './overlay.scss';

const overlay = document.querySelector('#my-overlay') as IOverlayComponent;
const showOverlayButton = document.querySelector('#my-btn') as HTMLButtonElement;
const clippingContainer = document.querySelector('.clipping-container') as HTMLElement;

overlay.targetElement = showOverlayButton; // TODO: use heuristic in consuming components (such as <forge-popover>) to locate optionally slotted button OR property via configuration

showOverlayButton.addEventListener('click', () => overlay.open = !overlay.open);
centerDemoButton();

const placementSelect = document.getElementById('opt-placement') as ISelectComponent;
placementSelect.addEventListener('change', ({ detail: selected }) => overlay.placement = selected);

const positionStrategySelect = document.getElementById('opt-position-strategy') as ISelectComponent;
positionStrategySelect.addEventListener('change', ({ detail: selected }) => overlay.positionStrategy = selected);

const inlineToggle = document.getElementById('opt-inline') as ISwitchComponent;
inlineToggle.addEventListener('forge-switch-select', ({ detail: selected }) => overlay.inline = selected);

const staticToggle = document.getElementById('opt-static') as ISwitchComponent;
staticToggle.addEventListener('forge-switch-select', ({ detail: selected }) => overlay.static = selected);

const hideToggle = document.getElementById('opt-hide') as ISwitchComponent;
hideToggle.addEventListener('forge-switch-select', ({ detail: selected }) => overlay.hide = selected);

const shiftToggle = document.getElementById('opt-shift') as ISwitchComponent;
shiftToggle.addEventListener('forge-switch-select', ({ detail: selected }) => overlay.shift = selected);

const flipToggle = document.getElementById('opt-flip') as ISwitchComponent;
flipToggle.addEventListener('forge-switch-select', ({ detail: selected }) => overlay.flip = selected);

const autoToggle = document.getElementById('opt-auto') as ISwitchComponent;
autoToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  overlay.auto = selected;
  flipToggle.disabled = selected;
});

const useSmallContainerToggle = document.getElementById('opt-use-small-container') as ISwitchComponent;
useSmallContainerToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  toggleClass(clippingContainer, selected, 'use-small-container');
  centerDemoButton();
});

const forceContainmentToggle = document.getElementById('opt-force-containment') as ISwitchComponent;
forceContainmentToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  toggleClass(clippingContainer, selected, 'force-containment');
});

const useOffsetToggle = document.getElementById('opt-use-offset') as ISwitchComponent;
useOffsetToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  overlay.offset = selected ? { mainAxis: 16 } : null;
});

const centerButton = document.getElementById('opt-center') as HTMLButtonElement;
centerButton.addEventListener('click', centerDemoButton);

function centerDemoButton(): void {
  showOverlayButton.scrollIntoView({ block: 'center', inline: 'center' });
}
