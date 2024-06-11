import '$src/shared';
import '@tylertech/forge/state-layer';
import '@tylertech/forge/focus-indicator';
import './state-layer.scss';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import type { IStateLayerComponent } from '@tylertech/forge/state-layer';

const stateLayerDemoEl = document.querySelector('.state-layer-demo') as HTMLElement;
const stateLayer = stateLayerDemoEl.querySelector('forge-state-layer') as IStateLayerComponent;

const disabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  stateLayer.disabled = selected;
});

const selectedToggle = document.querySelector('#opt-selected') as ISwitchComponent;
selectedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  stateLayerDemoEl.classList.toggle('selected', selected);
});

const circularToggle = document.querySelector('#opt-circular') as ISwitchComponent;
circularToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  stateLayerDemoEl.classList.toggle('circular', selected);
});

const playRippleAnimationButton = document.querySelector('#opt-btn-play-ripple-animation') as HTMLButtonElement;
playRippleAnimationButton.addEventListener('click', () => stateLayer.playAnimation());
