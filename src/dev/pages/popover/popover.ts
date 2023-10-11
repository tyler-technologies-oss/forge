import '$src/shared';
import type { IPopoverComponent, ISelectComponent, ISwitchComponent, PopoverToggleEventData } from '@tylertech/forge';
import { toggleClass } from '@tylertech/forge-core';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import '@tylertech/forge/popover';
import './popover.scss';

const popover = document.querySelector('#my-popover') as IPopoverComponent;
const showPopoverButton = document.querySelector('#popover-trigger') as HTMLButtonElement;
const closeButton = document.querySelector('#close-button') as HTMLButtonElement;
const clippingContainer = document.querySelector('.clipping-container') as HTMLElement;
const preventDialogCloseToggle = document.querySelector('#opt-prevent-dialog-close') as ISwitchComponent;

popover.addEventListener('forge-popover-beforetoggle', (evt: CustomEvent<PopoverToggleEventData>) => {
  console.log('forge-popover-beforetoggle', evt.detail);
  if (preventDialogCloseToggle.selected && evt.cancelable) {
    console.log('PREVENTING BEFORETOGGLE');
    evt.preventDefault();
  }
});

popover.addEventListener('forge-popover-toggle', (evt: CustomEvent<PopoverToggleEventData>) => {
  console.log('forge-popover-toggle', evt.detail);
});

centerDemoButton();

showPopoverButton.addEventListener('click', () => showPopoverButton.setAttribute('aria-expanded', 'true'));
closeButton.addEventListener('click', () => popover.open = false);

const placementSelect = document.getElementById('opt-placement') as ISelectComponent;
placementSelect.addEventListener('change', ({ detail: selected }) => popover.placement = selected);

const animationTypeSelect = document.getElementById('opt-animation-type') as ISelectComponent;
animationTypeSelect.addEventListener('change', ({ detail: selected }) => popover.animationType = selected);

const triggerTypeSelect = document.getElementById('opt-trigger-type') as ISelectComponent;
triggerTypeSelect.addEventListener('change', ({ detail: selected }) => popover.triggerType = selected);

const dialogToggle = document.getElementById('opt-dialog') as ISwitchComponent;
dialogToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  preventDialogCloseToggle.disabled = !selected;
  modalToggle.disabled = !selected;
  if (!selected) {
    modalToggle.selected = false;
  }
  popover.dialog = selected;
});

const modalToggle = document.getElementById('opt-modal') as ISwitchComponent;
modalToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  dialogToggle.selected = true;
  popover.modal = selected;
});

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
