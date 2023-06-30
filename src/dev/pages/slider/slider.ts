import '$src/shared';
import { ISwitchComponent } from '@tylertech/forge/switch';
import { ISliderComponent } from '@tylertech/forge/slider';
import '@tylertech/forge/slider';

const slider = document.querySelector('#slider') as ISliderComponent;
slider.addEventListener('forge-slider-input', evt => {
  console.log('forge-slider-input', evt.detail);
});
slider.addEventListener('forge-slider-change', evt => {
  console.log('forge-slider-change', evt.detail);
});

const minInput = document.querySelector('#slider-min') as HTMLInputElement;
minInput.addEventListener('input', ({ target }) => slider.min = (target as HTMLInputElement).valueAsNumber);

const maxInput = document.querySelector('#slider-max') as HTMLInputElement;
maxInput.addEventListener('input', ({ target }) => slider.max = (target as HTMLInputElement).valueAsNumber);

const stepInput = document.querySelector('#slider-step') as HTMLInputElement;
stepInput.addEventListener('input', ({ target }) => slider.step = (target as HTMLInputElement).valueAsNumber);

const rangeToggle = document.querySelector('#slider-range') as ISwitchComponent;
rangeToggle.addEventListener('forge-switch-select', ({ detail: selected }) => slider.range = selected);

const tickmarksToggle = document.querySelector('#slider-tickmarks') as ISwitchComponent;
tickmarksToggle.addEventListener('forge-switch-select', ({ detail: selected }) => slider.tickmarks = selected);

const disabledToggle = document.querySelector('#slider-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-select', ({ detail: selected }) => slider.disabled = selected);

const labelsToggle = document.querySelector('#slider-labels') as ISwitchComponent;
labelsToggle.addEventListener('forge-switch-select', ({ detail: selected }) => slider.labeled = selected);
