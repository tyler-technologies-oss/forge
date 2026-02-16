import '$src/shared';
import { toggleClass } from '@tylertech/forge-core';
import { VirtualElement } from '@tylertech/forge/core/utils/position-utils';
import '@tylertech/forge/button';
import '@tylertech/forge/overlay';
import './overlay.scss';
import { IOverlayComponent, OverlayFlipState, OverlayHideState } from '@tylertech/forge/overlay';
import { ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';

const overlay = document.querySelector('#my-overlay') as IOverlayComponent;
const nestedOverlay = overlay.querySelector('#my-nested-overlay') as IOverlayComponent;
const showOverlayButton = document.querySelector('#my-btn') as HTMLButtonElement;
const showNestedOverlayButton = document.querySelector('#nested-btn') as HTMLButtonElement;
const clippingContainer = document.querySelector('.clipping-container') as HTMLElement;

overlay.addEventListener('forge-overlay-light-dismiss', (evt: CustomEvent) => {
  console.log(evt.type);
  showOverlayButton.setAttribute('aria-expanded', 'false');
});

showOverlayButton.addEventListener('click', () => {
  overlay.open = !overlay.open;

  showOverlayButton.setAttribute('aria-expanded', String(overlay.open));

  const arrowEl = overlay.querySelector('.arrow') as HTMLElement;
  if (arrowEl) {
    const offset = Math.sqrt(2 * arrowEl.offsetWidth ** 2) / 2;
    overlay.arrowElementOffset = offset;
  }
});
showNestedOverlayButton.addEventListener('click', () => (nestedOverlay.open = !nestedOverlay.open));
centerDemoButton();

const allowContextmenu = document.getElementById('opt-allow-contextmenu') as ISwitchComponent;
const contextOverlay = document.querySelector('#context-overlay') as IOverlayComponent;
document.addEventListener('contextmenu', (evt: MouseEvent) => {
  if (!allowContextmenu.on) {
    return;
  }

  evt.preventDefault();
  if (contextOverlay.open) {
    contextOverlay.anchorElement = VirtualElement.fromEvent(evt);
  } else {
    contextOverlay.textContent = 'Context menu';
    contextOverlay.anchorElement = VirtualElement.fromEvent(evt);
    contextOverlay.open = true;
  }
});

const placementSelect = document.getElementById('opt-placement') as ISelectComponent;
placementSelect.addEventListener('change', ({ detail: selected }) => (overlay.placement = selected));

const positionStrategySelect = document.getElementById('opt-position-strategy') as ISelectComponent;
positionStrategySelect.addEventListener('change', ({ detail: selected }) => (overlay.positionStrategy = selected));

const flipSelect = document.getElementById('opt-flip') as ISelectComponent;
flipSelect.addEventListener('change', ({ detail: selected }) => (overlay.flip = selected as OverlayFlipState));

const hideSelect = document.getElementById('opt-hide') as ISelectComponent;
hideSelect.addEventListener('change', ({ detail: selected }) => (overlay.hide = selected as OverlayHideState));

const inlineToggle = document.getElementById('opt-inline') as ISwitchComponent;
inlineToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (overlay.inline = selected));

const persistentToggle = document.getElementById('opt-persistent') as ISwitchComponent;
persistentToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (overlay.persistent = selected));

const noAnchorToggle = document.getElementById('opt-no-anchor') as ISwitchComponent;
noAnchorToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (overlay.noAnchor = selected));

const shiftToggle = document.getElementById('opt-shift') as ISwitchComponent;
shiftToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (overlay.shift = selected));

const showArrowToggle = document.getElementById('opt-show-arrow') as ISwitchComponent;
showArrowToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    const arrowEl = document.createElement('div');
    arrowEl.classList.add('arrow');
    overlay.appendChild(arrowEl);
    overlay.arrowElement = arrowEl;
  } else {
    overlay.querySelector('.arrow')?.remove();
    overlay.arrowElement = null;
  }
});

const setBoundaryToggle = document.getElementById('opt-set-boundary') as ISwitchComponent;
setBoundaryToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  overlay.boundaryElement = selected ? clippingContainer : null;
});

const useSmallContainerToggle = document.getElementById('opt-use-small-container') as ISwitchComponent;
useSmallContainerToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  toggleClass(clippingContainer, selected, 'use-small-container');
  centerDemoButton();
});

const forceContainmentToggle = document.getElementById('opt-force-containment') as ISwitchComponent;
forceContainmentToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  toggleClass(clippingContainer, selected, 'force-containment');
});

const useOffsetToggle = document.getElementById('opt-use-offset') as ISwitchComponent;
useOffsetToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  overlay.offset = selected ? { mainAxis: 16 } : null;
});

const centerButton = document.getElementById('opt-center') as HTMLButtonElement;
centerButton.addEventListener('click', centerDemoButton);

function centerDemoButton(): void {
  showOverlayButton.scrollIntoView({ block: 'center', inline: 'center' });
}
