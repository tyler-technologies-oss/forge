import '$src/shared';
import type { IPopoverComponent, ISelectComponent, ISwitchComponent } from '@tylertech/forge';
import { toggleClass } from '@tylertech/forge-core';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import '@tylertech/forge/popover';
import './popover.scss';

const popover = document.querySelector('#my-popover') as IPopoverComponent;
const showPopoverButton = document.querySelector('#my-btn') as HTMLButtonElement;
const closeButton = document.querySelector('#close-button') as HTMLButtonElement;
const clippingContainer = document.querySelector('.clipping-container') as HTMLElement;

centerDemoButton();

showPopoverButton.addEventListener('click', () => showPopoverButton.setAttribute('aria-expanded', 'true'));
closeButton.addEventListener('click', () => popover.open = false);

const placementSelect = document.getElementById('opt-placement') as ISelectComponent;
placementSelect.addEventListener('change', ({ detail: selected }) => popover.placement = selected);

const animationTypeSelect = document.getElementById('opt-animation-type') as ISelectComponent;
animationTypeSelect.addEventListener('change', ({ detail: selected }) => popover.animationType = selected);

const triggerTypeSelect = document.getElementById('opt-trigger-type') as ISelectComponent;
triggerTypeSelect.addEventListener('change', ({ detail: selected }) => popover.triggerType = selected);

const arrowToggle = document.getElementById('opt-arrow') as ISwitchComponent;
arrowToggle.addEventListener('forge-switch-select', ({ detail: selected }) => popover.arrow = selected);

const inlineToggle = document.getElementById('opt-inline') as ISwitchComponent;
inlineToggle.addEventListener('forge-switch-select', ({ detail: selected }) => popover.inline = selected);

const staticToggle = document.getElementById('opt-static') as ISwitchComponent;
staticToggle.addEventListener('forge-switch-select', ({ detail: selected }) => popover.static = selected);

const useOffsetToggle = document.getElementById('opt-use-offset') as ISwitchComponent;
useOffsetToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  popover.offset = selected ? { mainAxis: 4 } : null;
});

const forceContainmentToggle = document.getElementById('opt-force-containment') as ISwitchComponent;
forceContainmentToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  toggleClass(clippingContainer, selected, 'force-containment');
});

const centerButton = document.getElementById('opt-center') as HTMLButtonElement;
centerButton.addEventListener('click', centerDemoButton);

function centerDemoButton(): void {
  showPopoverButton.scrollIntoView({ block: 'center', inline: 'center' });
}
