// Styles
import './stack.scss';
import '@tylertech/forge/stack/stack.scss';

// Components
import '@tylertech/forge/stack';

import '$src/shared';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import { IStackComponent, ITextFieldComponent } from '@tylertech/forge';


const inlineToggle = document.querySelector('#inline-switch') as ISwitchComponent;
const wrapToggle = document.querySelector('#wrap-switch') as ISwitchComponent;
const stretchToggle = document.querySelector('#stretch-switch') as ISwitchComponent;
const gapInput = document.querySelector('#gap-input') as HTMLInputElement;
const stackContainer = document.querySelector('forge-stack') as IStackComponent;

inlineToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    stackContainer.setAttribute('inline', 'true');
  } else {
    stackContainer.removeAttribute('inline');
  }
});

wrapToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    stackContainer.setAttribute('wrap', 'true');
  } else {
    stackContainer.removeAttribute('wrap');
  }
});

stretchToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    stackContainer.setAttribute('stretch', 'true');
  } else {
    stackContainer.removeAttribute('stretch');
  }
});

gapInput.addEventListener('input', () => {
  stackContainer.setAttribute('gap', gapInput.value);
});
