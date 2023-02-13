import '$src/shared';
import '@tylertech/forge/chips';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon-button/forge-icon-button.scss';
import { IChipSetComponent, IconRegistry, ISwitchComponent } from '@tylertech/forge';
import type { IChipComponent } from '@tylertech/forge';
import { tylIconAlarm, tylIconBookmark, tylIconDirections, tylIconEvent, tylIconFace, tylIconPlace, tylIconRefresh } from '@tylertech/tyler-icons/standard';
import { showToast } from '$src/utils/utils';

IconRegistry.define([
  tylIconRefresh,
  tylIconFace,
  tylIconEvent,
  tylIconBookmark,
  tylIconAlarm,
  tylIconDirections,
  tylIconPlace
]);

const chipsDenseToggle = document.querySelector('#opt-dense') as ISwitchComponent;
const chipsDisabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;

// Action example
const actionExample = document.querySelector('#chips-action');
const actionChipSet = actionExample.querySelector('forge-chip-set');
actionChipSet.addEventListener('forge-chip-select', ({ detail: { value }}) => {
  showToast(`Action Chip Selected: ${value}`);
});

// Input example
let deletedChips = [];
const inputExample = document.querySelector('#chips-input');
const inputChipSet = inputExample.querySelector('forge-chip-set[type=input]');
inputChipSet.addEventListener('forge-chip-delete', ({ target }) => {
  deletedChips.push(target);
  (target as IChipComponent).remove();
});
const refreshButton = inputExample.querySelector('forge-icon-button > button');
refreshButton.addEventListener('click', () => {
  deletedChips.forEach(chip => {
    inputChipSet.appendChild(chip);
  });
  deletedChips = [];
});

// Dense toggling
chipsDenseToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  const chipSets = document.querySelectorAll('forge-chip-set') as NodeListOf<IChipSetComponent>;
  for (const chipSet of chipSets) {
    chipSet.dense = selected;
  }
});

// Disabled toggling
chipsDisabledToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  const chipSets = document.querySelectorAll('forge-chip-set') as NodeListOf<IChipSetComponent>;
  for (const chipSet of chipSets) {
    chipSet.disabled = selected;
  }
});
