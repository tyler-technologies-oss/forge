import '$src/shared';
import { randomTimeout } from '$src/utils/utils';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/menu';
import '@tylertech/forge/divider';
import '@tylertech/forge/button';
import { tylIconArrowBack, tylIconArrowForward, tylIconHelp, tylIconLoop, tylIconPerson, tylIconSettings } from '@tylertech/tyler-icons/standard';
import { IMenuComponent, IMenuOption } from '@tylertech/forge/menu';
import { IListItemComponent } from '@tylertech/forge/list';
import { ISwitchComponent } from '@tylertech/forge/switch';

IconRegistry.define([
  tylIconArrowBack,
  tylIconArrowForward,
  tylIconLoop,
  tylIconSettings,
  tylIconPerson,
  tylIconHelp
]);

const menu = document.getElementById('forge-menu-example') as IMenuComponent;

const complexToggle = document.getElementById('opt-complex') as ISwitchComponent;
const denseToggle = document.getElementById('opt-dense') as ISwitchComponent;
const asyncToggle = document.getElementById('opt-async') as ISwitchComponent;
const optionBuilderToggle = document.getElementById('opt-option-builder') as ISwitchComponent;
const allowPersistentSelectionToggle = document.getElementById('opt-allow-persistent-selection') as ISwitchComponent;
const cancelSelectToggle = document.getElementById('opt-cancel-select') as ISwitchComponent;
const setSelectedButton = document.getElementById('opt-set-selected') as HTMLButtonElement;

const selectedComplexOptionIndex = 4;
const selectedComplexChildOptionIndex = 4;
const selectedComplexGrandchildOptionIndex = 1;
const selectedSimpleOptionIndex = 2;

const complexOptions: IMenuOption[] = [
  { value: 'back', label: 'Back', leadingIcon: 'arrow_back', leadingIconType: 'component' },
  { value: 'forward', label: 'Forward', leadingIcon: 'arrow_forward', leadingIconType: 'component', disabled: true },
  { value: 'reload', label: 'Reload', leadingIcon: 'loop', leadingIconType: 'component' },
  { label: null, value: null, divider: true },
  {
    value: { action: 'settings' },
    label: 'Settings',
    leadingIcon: 'settings',
    leadingIconType: 'component',
    options: [
      { value: 'one', label: 'One'},
      { value: 'two', label: 'Two', disabled: true },
      {
        value: 'three',
        label: 'Three',
        options: [
          { value: 'five', label: 'Five'},
          { value: 'six', label: 'Six'},
          { value: 'seven', label: 'Seven'}
        ]
      },
      { label: null, value: null, divider: true },
      { value: 'four', label: 'Four' }
    ]
  },
  { value: 'account', label: 'Account', leadingIcon: 'person', leadingIconType: 'component' },
  {
    value: 'help',
    label: 'Help & Feedback',
    leadingIcon: 'help',
    leadingIconType: 'component',
    options: [
      { label: 'Test one', value: 'test-one' },
      { label: 'Test two', value: 'test-two' }
    ]
  }
];
const simpleOptions: IMenuOption[] = [
  { value: 'back', label: 'Back' },
  { value: 'forward', label: 'Forward', tooltip: { text: 'Custom option tooltip!', type: 'label' } },
  { value: 'reload', label: 'Reload' },
  { value: 'help', label: 'Help & Feedback' },
  { value: 'settings', label: 'Settings' }
];

menu.options = simpleOptions;
menu.placement = 'bottom-start';

menu.addEventListener('forge-menu-select', evt => {
  if (cancelSelectToggle.checked) {
    console.log('[forge-menu-select] default prevented', evt.detail);
    evt.preventDefault();
    return;
  }
  console.log('[forge-menu-select]', evt.detail);
});

complexToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  setOptions(selected);
});

denseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  menu.dense = selected;
});

asyncToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    menu.options = asyncOptions;
  } else {
    menu.options = asyncToggle.selected ? complexOptions : simpleOptions;
  }
});

optionBuilderToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  menu.optionBuilder = selected ? optionBuilderCallback : undefined;
});

allowPersistentSelectionToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  menu.persistSelection = selected;
  setSelectedButton.disabled = !selected;
});

setSelectedButton.addEventListener('click', evt => {
  complexOptions.forEach(option => option.selected = false);
  simpleOptions.forEach(option => option.selected = false);
  complexOptions[selectedComplexOptionIndex].selected = true;

  const firstParent = complexOptions.find(x => x.options?.length > 0);
  (firstParent.options[selectedComplexChildOptionIndex] as IMenuOption).selected = true;

  const firstSubParent = firstParent.options.find(x => x.options?.length > 0);
  (firstSubParent.options[selectedComplexGrandchildOptionIndex] as IMenuOption).selected = true;

  simpleOptions[selectedSimpleOptionIndex].selected = true;
  setOptions(complexToggle.selected);
});


function setOptions(selected: boolean): void {
  if (asyncToggle.selected) {
    return;
  }
  menu.options = selected ? complexOptions : simpleOptions;
}

function asyncOptions(): Promise<IMenuOption[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(complexToggle.selected ? complexOptions : simpleOptions);
    }, randomTimeout(250, 1500));
  });
}

function optionBuilderCallback(option: IMenuOption, listItem: IListItemComponent): HTMLElement {
  const div = document.createElement('div');

  const prefixSpan = document.createElement('span');
  prefixSpan.style.fontWeight = 'bold';
  prefixSpan.textContent = 'Custom option: ';
  div.appendChild(prefixSpan);
  
  const labelSpan = document.createElement('span');
  labelSpan.style.fontStyle = 'italic';
  labelSpan.textContent = option.label;
  div.appendChild(labelSpan);

  return div;
}
