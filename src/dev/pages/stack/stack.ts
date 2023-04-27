// Styles
import './stack.scss';
import '@tylertech/forge/stack/stack.scss';

// Components
import '@tylertech/forge/stack';

import '$src/shared';
import type { ISwitchComponent } from '@tylertech/forge/switch';


const inlineToggle = document.querySelector('#inline-switch') as ISwitchComponent;
const wrapToggle = document.querySelector('#wrap-switch') as ISwitchComponent;
const stackContainer = document.querySelector('forge-stack');

inlineToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    stackContainer.setAttribute('inline', 'true');
  } else {
    stackContainer.setAttribute('inline', 'false');
  }
});

wrapToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    stackContainer.setAttribute('wrap', 'true');
  } else {
    stackContainer.setAttribute('wrap', 'false');
  }
});
