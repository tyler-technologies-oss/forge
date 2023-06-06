import '$src/shared';
import { ISwitchComponent } from '@tylertech/forge';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import '@tylertech/forge/dialog';
import '@tylertech/forge/overlay';
import '@tylertech/forge/popover';
import '@tylertech/forge/exp/select';
import '@tylertech/forge/exp/form-field';
import type { IOverlayComponent } from '@tylertech/forge';
import './overlay.scss';
import { toggleClass } from '@tylertech/forge-core';

const DEFAULT_OFFSET = { x: 0, y: 16 }; // TODO: consider logical property names (inline, block)

//
// DOM references
//
const overlay = document.querySelector('#my-overlay') as IOverlayComponent;
const showOverlayButton = document.querySelector('#my-btn') as HTMLButtonElement;
const clippingContainer = document.querySelector('.clipping-container') as HTMLElement;

//
// Configure overlay
//
overlay.targetElement = showOverlayButton; // TODO: use heuristic in consuming components (such as <forge-popover>) to locate optionally slotted button OR property via configuration

//
// Demo listeners/configuration
//
// showOverlayButton.addEventListener('click', () => overlay.open = !overlay.open);
centerButton();

//
// Options
//

const useSmallContainerToggle = document.getElementById('opt-use-small-container') as ISwitchComponent;
useSmallContainerToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  toggleClass(clippingContainer, selected, 'use-small-container');
  centerButton();
  // tryForceReposition();
});

const forceClippingToggle = document.getElementById('opt-force-clipping') as ISwitchComponent;
forceClippingToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  toggleClass(clippingContainer, selected, 'force-clipping');
  // tryForceReposition();
});

const useOffsetToggle = document.getElementById('opt-use-offset') as ISwitchComponent;
useOffsetToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  overlay.offset = selected ? DEFAULT_OFFSET : { x: 0, y: 0 }; // TODO: need to test with changes to core package
  // tryForceReposition();
  // TODO: overlay is not adjusting offset dynamically while open
});

//
// Functions
//
function centerButton(): void {
  showOverlayButton.scrollIntoView({ block: 'center', inline: 'center' });
}

// function tryForceReposition(): void {
//   if (overlay.open) {
//     window.requestAnimationFrame(() => overlay.position());
//   }
// }
