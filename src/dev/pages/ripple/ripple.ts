import '$src/shared';
import '@tylertech/forge/ripple';
import '@tylertech/forge/ripple/forge-ripple.scss'; // TODO: Remove need for global ripple styles
import '@tylertech/forge/card';
import './ripple.scss';
import type { IRippleComponent } from '@tylertech/forge';

const activateButton = document.querySelector('#opt-ripple-activate');
activateButton.addEventListener('click', () => getRipples().forEach(ripple => ripple.activate()));

const deactivateButton = document.querySelector('#opt-ripple-deactivate');
deactivateButton.addEventListener('click', () => getRipples().forEach(ripple => ripple.deactivate()));

function getRipples(): NodeListOf<IRippleComponent> {
  return document.querySelectorAll('#demo-content forge-ripple');
}
