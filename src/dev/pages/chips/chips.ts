import '$src/shared';
import '@tylertech/forge/chips';
import '@tylertech/forge/icon-button';
import { IChipSetComponent, IconRegistry, ISelectComponent, ISwitchComponent } from '@tylertech/forge';
import type { IChipComponent } from '@tylertech/forge';
import { tylIconAlarm, tylIconBookmark, tylIconDirections, tylIconEvent, tylIconOpenInNew, tylIconPlace, tylIconRefresh } from '@tylertech/tyler-icons/standard';
import { tylIconAccount, tylIconAlert } from '@tylertech/tyler-icons/extended';
import { showToast } from '$src/utils/utils';

IconRegistry.define([
  tylIconRefresh,
  tylIconAccount,
  tylIconEvent,
  tylIconBookmark,
  tylIconAlarm,
  tylIconDirections,
  tylIconPlace,
  tylIconOpenInNew,
  tylIconAlert
]);

const chipsDenseToggle = document.querySelector('#opt-dense') as ISwitchComponent;
const chipsDisabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;

// Action example
const actionExample = document.querySelector('#chips-action');
const actionChipSet = actionExample.querySelector('forge-chip-set');
actionChipSet.addEventListener('forge-chip-select', ({ detail: { value }}) => {
  console.log('[forge-chip-select]', value);
  showToast(`Action Chip Selected: ${value}`);
});

// Input example
let deletedChips = [];
const inputExample = document.querySelector('#chips-input');
const inputChipSet = inputExample.querySelector('forge-chip-set[type=input]');
inputChipSet.addEventListener('forge-chip-delete', ({ target }) => {
  console.log('[forge-chip-delete]', target);
  deletedChips.push(target);
  (target as IChipComponent).remove();
});
const refreshButton = inputExample.querySelector('#refresh-button');
refreshButton.addEventListener('click', () => {
  deletedChips.forEach(chip => {
    inputChipSet.appendChild(chip);
  });
  deletedChips = [];
});

// Theme
const themeSelect = document.querySelector('#opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail }) => {
  const chipSets = document.querySelectorAll('forge-chip-set') as NodeListOf<IChipSetComponent>;
  for (const chipSet of chipSets) {
    chipSet.theme = detail;
  }
});

// Dense toggling
chipsDenseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const chipSets = document.querySelectorAll('forge-chip-set') as NodeListOf<IChipSetComponent>;
  for (const chipSet of chipSets) {
    chipSet.dense = selected;
  }
});

// Disabled toggling
chipsDisabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  const chipSets = document.querySelectorAll('forge-chip-set') as NodeListOf<IChipSetComponent>;
  for (const chipSet of chipSets) {
    chipSet.disabled = selected;
  }
});
