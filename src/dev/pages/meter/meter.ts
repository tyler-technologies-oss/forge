import '$src/shared';
import '@tylertech/forge/meter';
import { ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';

const meter = document.querySelector('forge-meter');
const valueInput = document.getElementById('opt-value') as HTMLInputElement;
const minInput = document.getElementById('opt-min') as HTMLInputElement;
const maxInput = document.getElementById('opt-max') as HTMLInputElement;
const lowInput = document.getElementById('opt-low') as HTMLInputElement;
const highInput = document.getElementById('opt-high') as HTMLInputElement;
const tickmarksInput = document.getElementById('opt-tickmarks') as HTMLInputElement;
const densitySelect = document.getElementById('opt-density') as ISelectComponent;
const shapeSelect = document.getElementById('opt-shape') as ISelectComponent;
const innerShapeSelect = document.getElementById('opt-inner-shape') as ISelectComponent;
const themeSelect = document.getElementById('opt-theme') as ISelectComponent;
const mutedSwitch = document.getElementById('opt-muted') as ISwitchComponent;

valueInput.min = minInput.value;
valueInput.max = maxInput.value;

valueInput.addEventListener('input', () => {
  meter.value = parseFloat(valueInput.value);
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
  meter.low = parseFloat(lowInput.value);
});

highInput.addEventListener('input', () => {
  meter.high = parseFloat(highInput.value);
});

tickmarksInput.addEventListener('input', () => {
  const value = parseFloat(tickmarksInput.value);
  meter.tickmarks = value > 0;
  meter.style.setProperty('--forge-meter-tickmarks', value.toString());
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
