import '$src/shared';
import '@tylertech/forge/focus-indicator';
import '@tylertech/forge/state-layer';
import '@tylertech/forge/button';
import '@tylertech/forge/text-field';
import '@tylertech/forge/focus-indicator/forge-focus-indicator.scss';
import './focus-indicator.scss';

const spacer = document.getElementById('shift-spacer') as HTMLElement;
const toggleButton = document.getElementById('toggle-shift-content') as HTMLElement;
toggleButton.addEventListener('mousedown', evt => evt.preventDefault());
toggleButton.addEventListener('click', () => {
  spacer.hidden = !spacer.hidden;
});
