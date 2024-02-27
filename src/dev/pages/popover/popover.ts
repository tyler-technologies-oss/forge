import '$src/shared';
import type { IPopoverComponent, IPopoverToggleEventData, PopoverTriggerType } from '@tylertech/forge/popover';
import type { ISelectComponent } from '@tylertech/forge/select/select';
import type { ISwitchComponent } from '@tylertech/forge/switch/switch';
import type { ICheckboxComponent } from '@tylertech/forge/checkbox/checkbox';
import { toggleClass } from '@tylertech/forge-core';
import '@tylertech/forge/button';
import '@tylertech/forge/popover';
import '@tylertech/forge/checkbox';
import '@tylertech/forge/label';
import './popover.scss';

const delayInput = document.querySelector('#opt-delay') as HTMLInputElement;
const popover = document.querySelector('#my-popover') as IPopoverComponent;
const showPopoverButton = document.querySelector('#popover-trigger') as HTMLButtonElement;
const closeButton = document.querySelector('#close-button') as HTMLButtonElement;
const clippingContainer = document.querySelector('.clipping-container') as HTMLElement;
const preventCloseToggle = document.querySelector('#opt-prevent-close') as ISwitchComponent;
const richTooltipPopover = document.querySelector('#rich-tooltip-popover') as IPopoverComponent;

delayInput.addEventListener('input', (e) => {
 popover.delay = Number(delayInput.value);
});

popover.addEventListener('forge-popover-beforetoggle', (evt: CustomEvent<IPopoverToggleEventData>) => {
  console.log('forge-popover-beforetoggle', evt.detail);
  if (preventCloseToggle.on && evt.detail.newState === 'closed' && evt.cancelable) {
    console.log('PREVENTING BEFORETOGGLE');
    evt.preventDefault();
  }
});

popover.addEventListener('forge-popover-toggle', (evt: CustomEvent<IPopoverToggleEventData>) => {
  console.log('forge-popover-toggle', evt.detail);
});

richTooltipPopover.addEventListener('forge-popover-beforetoggle', (evt: CustomEvent<IPopoverToggleEventData>) => {
  console.log('RICH TOOLTIP forge-popover-beforetoggle', evt.detail);
  if (evt.detail.newState === 'closed' && preventRichTooltipCloseCheckbox.checked) {
    console.log('PREVENTING RICH TOOLTIP BEFORETOGGLE');
    evt.preventDefault();
  }
});

const preventRichTooltipCloseCheckbox = document.querySelector('#prevent-rich-tooltip-close') as ICheckboxComponent;
preventRichTooltipCloseCheckbox.addEventListener('change', ({ detail: selected }) => {
  richTooltipClose.style.display = selected ? 'none' : 'block';
});

const richTooltipClose = document.querySelector('#rich-tooltip-close') as HTMLButtonElement;
richTooltipClose.addEventListener('click', () => richTooltipPopover.open = false);

centerDemoButton();

showPopoverButton.addEventListener('click', () => showPopoverButton.setAttribute('aria-expanded', 'true'));
closeButton.addEventListener('click', () => popover.open = false);

const placementSelect = document.getElementById('opt-placement') as ISelectComponent;
placementSelect.addEventListener('change', ({ detail: selected }) => popover.placement = selected);

const animationTypeSelect = document.getElementById('opt-animation-type') as ISelectComponent;
animationTypeSelect.addEventListener('change', ({ detail: selected }) => popover.animationType = selected);

const triggerTypeSelect = document.getElementById('opt-trigger-type') as ISelectComponent;
triggerTypeSelect.addEventListener('change', ({ detail: selected }: CustomEvent<PopoverTriggerType[]>) => {
  popover.triggerType = selected;
  persistentHoverToggle.disabled = !selected.includes('hover');
});

const persistentToggle = document.getElementById('opt-persistent') as ISwitchComponent;
persistentToggle.addEventListener('forge-switch-change', ({ detail: selected }) => popover.persistent = selected);

const arrowToggle = document.getElementById('opt-arrow') as ISwitchComponent;
arrowToggle.addEventListener('forge-switch-change', ({ detail: selected }) => popover.arrow = selected);

const useOffsetToggle = document.getElementById('opt-use-offset') as ISwitchComponent;
useOffsetToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  popover.offset = selected ? { mainAxis: 4 } : null;
});

const persistentHoverToggle = document.getElementById('opt-persistent-hover') as ISwitchComponent;
persistentHoverToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  popover.persistentHover = selected;
});

const noAnchorToggle = document.getElementById('opt-no-anchor') as ISwitchComponent;
noAnchorToggle.addEventListener('forge-switch-change', ({ detail: selected }) => popover.noAnchor = selected);

const forceContainmentToggle = document.getElementById('opt-force-containment') as ISwitchComponent;
forceContainmentToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  toggleClass(clippingContainer, selected, 'force-containment');
});

const allowContextmenuToggle = document.getElementById('opt-allow-contextmenu') as ISwitchComponent;
allowContextmenuToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    const contextPopoverEl = document.createElement('forge-popover');
    contextPopoverEl.id = 'contextmenu-popover';
    contextPopoverEl.textContent = 'Context menu popover!';
    contextPopoverEl.triggerType = 'contextmenu';
    document.body.appendChild(contextPopoverEl);
  } else {
    document.getElementById('contextmenu-popover')?.remove();
  }
});

const centerButton = document.getElementById('opt-center') as HTMLButtonElement;
centerButton.addEventListener('click', centerDemoButton);

function centerDemoButton(): void {
  showPopoverButton.scrollIntoView({ block: 'center', inline: 'center' });
}
