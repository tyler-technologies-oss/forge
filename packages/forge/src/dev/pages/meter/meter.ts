import '$src/shared';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/meter';
import { ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';
import { tylIconLens } from '@tylertech/tyler-icons';
import './meter.scss';

IconRegistry.define([tylIconLens]);

const meter = document.querySelector('forge-meter');
const valueInput = document.getElementById('opt-value') as HTMLInputElement;
const minInput = document.getElementById('opt-min') as HTMLInputElement;
const maxInput = document.getElementById('opt-max') as HTMLInputElement;
const lowInput = document.getElementById('opt-low') as HTMLInputElement;
const highInput = document.getElementById('opt-high') as HTMLInputElement;
const optimumInput = document.getElementById('opt-optimum') as HTMLInputElement;
const tickmarksInput = document.getElementById('opt-tickmarks') as HTMLInputElement;
const valueModeSelect = document.getElementById('opt-value-mode') as ISelectComponent;
const directionSelect = document.getElementById('opt-direction') as ISelectComponent;
const densitySelect = document.getElementById('opt-density') as ISelectComponent;
const shapeSelect = document.getElementById('opt-shape') as ISelectComponent;
const innerShapeSelect = document.getElementById('opt-inner-shape') as ISelectComponent;
const themeSelect = document.getElementById('opt-theme') as ISelectComponent;
const mutedSwitch = document.getElementById('opt-muted') as ISwitchComponent;

const valueSpan = document.getElementById('value');

valueInput.min = minInput.value;
valueInput.max = maxInput.value;
tickmarksInput.min = '0';

valueInput.addEventListener('input', () => {
  meter.value = parseFloat(valueInput.value);
  valueSpan.textContent = valueInput.value + '%';
});

minInput.addEventListener('input', () => {
  meter.min = parseFloat(minInput.value);
  valueInput.min = minInput.value;
});

maxInput.addEventListener('input', () => {
  meter.max = parseFloat(maxInput.value);
  valueInput.max = maxInput.value;
});

lowInput.addEventListener('input', () => {
  if (!lowInput.value) {
    meter.low = null;
    return;
  }
  meter.low = parseFloat(lowInput.value);
});

highInput.addEventListener('input', () => {
  if (!highInput.value) {
    meter.high = null;
    return;
  }
  meter.high = parseFloat(highInput.value);
});

optimumInput.addEventListener('input', () => {
  if (!optimumInput.value) {
    meter.optimum = null;
    return;
  }
  meter.optimum = parseFloat(optimumInput.value);
});

tickmarksInput.addEventListener('input', () => {
  const value = parseFloat(tickmarksInput.value);
  meter.tickmarks = value > 0;
  meter.style.setProperty('--forge-meter-tickmarks', value.toString());
});

valueModeSelect.addEventListener('change', () => {
  meter.valueMode = valueModeSelect.value as any;
});

directionSelect.addEventListener('change', () => {
  meter.direction = directionSelect.value as any;
});

shapeSelect.addEventListener('change', () => {
  meter.shape = shapeSelect.value as any;
});

innerShapeSelect.addEventListener('change', () => {
  meter.innerShape = innerShapeSelect.value as any;
});

densitySelect.addEventListener('change', () => {
  meter.density = densitySelect.value as any;
});

themeSelect.addEventListener('change', () => {
  meter.theme = themeSelect.value as any;
});

mutedSwitch.addEventListener('change', () => {
  meter.muted = mutedSwitch.on;
});
