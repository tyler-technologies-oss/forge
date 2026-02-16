import '$src/shared';
import '@tylertech/forge/stack';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { IStackComponent } from '@tylertech/forge/stack';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import './stack.scss';

const inlineToggle = document.querySelector('#inline-switch') as ISwitchComponent;
const wrapToggle = document.querySelector('#wrap-switch') as ISwitchComponent;
const stretchToggle = document.querySelector('#stretch-switch') as ISwitchComponent;
const gapInput = document.querySelector('#gap-input') as HTMLInputElement;
const stackContainer = document.querySelector('#main-demo') as IStackComponent;

inlineToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  stackContainer.inline = selected;
  wrapToggle.disabled = !selected;

  if (!selected) {
    wrapToggle.selected = false;
  }
});

wrapToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  stackContainer.wrap = selected;
});

stretchToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  stackContainer.stretch = selected;
});

const alignSelect = document.getElementById('align-select') as ISelectComponent;
alignSelect.addEventListener('change', () => {
  stackContainer.alignment = alignSelect.value;
});

const justifySelect = document.getElementById('justify-select') as ISelectComponent;
justifySelect.addEventListener('change', () => {
  stackContainer.justify = justifySelect.value;
});

gapInput.addEventListener('input', () => {
  stackContainer.gap = gapInput.value;
});
