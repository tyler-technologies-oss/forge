// Styles
import './stack.scss';
import '@tylertech/forge/stack/stack.scss';

// Components
import '@tylertech/forge/stack';

import '$src/shared';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import { ISelectComponent, IStackComponent, ITextFieldComponent } from '@tylertech/forge';


const inlineToggle = document.querySelector('#inline-switch') as ISwitchComponent;
const wrapToggle = document.querySelector('#wrap-switch') as ISwitchComponent;
const stretchToggle = document.querySelector('#stretch-switch') as ISwitchComponent;
const gapInput = document.querySelector('#gap-input') as HTMLInputElement;
const stackContainer = document.querySelector('#main-demo') as IStackComponent;

inlineToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    stackContainer.setAttribute('inline', 'true');
    wrapToggle.disabled = false;
  } else {
    stackContainer.removeAttribute('inline');
    wrapToggle.disabled = true;
    wrapToggle.selected = false;
  }
});

wrapToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    stackContainer.wrap = true;
  } else {
    stackContainer.wrap = false;
  }
});

stretchToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  if (selected) {
    stackContainer.stretch = true;
  } else {
    stackContainer.stretch = false;
  }
});

const alignSelect = document.getElementById('align-select') as ISelectComponent;
alignSelect.addEventListener('change', () => {
  stackContainer.alignment = alignSelect.value;
});

gapInput.addEventListener('input', () => {
  stackContainer.gap = Number(gapInput.value);
});
