import '$src/shared';
import { ISwitchComponent } from '@tylertech/forge/switch';
import { ISliderComponent } from '@tylertech/forge/slider';
import '@tylertech/forge/slider';

const slider = document.querySelector('#slider') as ISliderComponent;

// Default (single)
slider.addEventListener('forge-slider-input', evt => {
  console.log('forge-slider-input', evt.detail);
});
slider.addEventListener('forge-slider-change', evt => {
  console.log('forge-slider-change', evt.detail);
});

// Range
slider.addEventListener('forge-slider-range-input', evt => {
  console.log('forge-slider-range-input', evt.detail);
});
slider.addEventListener('forge-slider-range-change', evt => {
  console.log('forge-slider-range-change', evt.detail);
});

const minInput = document.querySelector('#slider-min') as HTMLInputElement;
minInput.addEventListener('change', ({ target }) => (slider.min = (target as HTMLInputElement).valueAsNumber));

const maxInput = document.querySelector('#slider-max') as HTMLInputElement;
maxInput.addEventListener('change', ({ target }) => (slider.max = (target as HTMLInputElement).valueAsNumber));

const stepInput = document.querySelector('#slider-step') as HTMLInputElement;
stepInput.addEventListener('change', ({ target }) => (slider.step = (target as HTMLInputElement).valueAsNumber));

const rangeToggle = document.querySelector('#slider-range') as ISwitchComponent;
rangeToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (slider.range = selected));

const tickmarksToggle = document.querySelector('#slider-tickmarks') as ISwitchComponent;
tickmarksToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (slider.tickmarks = selected));

const disabledToggle = document.querySelector('#slider-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (slider.disabled = selected));

const readonlyToggle = document.querySelector('#slider-readonly') as ISwitchComponent;
readonlyToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (slider.readonly = selected));

const labelsToggle = document.querySelector('#slider-labeled') as ISwitchComponent;
labelsToggle.addEventListener('forge-switch-change', ({ detail: selected }) => (slider.labeled = selected));

const labelBuilderToggle = document.querySelector('#slider-label-builder') as ISwitchComponent;
labelBuilderToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  slider.labelBuilder = selected ? (value: number) => `Value: ${value}` : undefined;
});
