import '$src/shared';
import './autocomplete.scss';
import data from './data.json';

// Components
import '@tylertech/forge/autocomplete';
import '@tylertech/forge/label-value';

// Icons
import type { AutocompleteFilterCallback, IAutocompleteComponent, IAutocompleteOption } from '@tylertech/forge/autocomplete';
import type { IListItemComponent } from '@tylertech/forge/list/list-item';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { IOption, IOptionGroup } from '@tylertech/forge/select';
import { IconRegistry } from '@tylertech/forge/icon';
import { IListDropdownOption, IListDropdownOptionGroup } from '@tylertech/forge/list-dropdown';
import { tylIconClose } from '@tylertech/tyler-icons';
import { randomTimeout } from '../../src/utils/utils';

IconRegistry.define([
  tylIconClose
]);

const autocomplete = document.querySelector('#autocomplete') as IAutocompleteComponent;
autocomplete.filter = filterOptions as AutocompleteFilterCallback<string>;

// State
let states = data as IAutocompleteOption[];
let asyncFilter = false;
let useGroupedData = false;
let useGroupHeaderBuilder = false;
const filterCache = new Map();

const valueContainer = document.querySelector('#autocomplete-value');
autocomplete.addEventListener('forge-autocomplete-change', ({ detail }) => {
  console.log('[forge-autocomplete-change]', detail);
  valueContainer.textContent = detail ? JSON.stringify(detail, null, '  ') : 'No value selected';
});

autocomplete.addEventListener('forge-autocomplete-select', ({ detail }) => {
  console.log('[forge-autocomplete-select] (stateless)', detail);
});

// Options
const multipleToggle = document.querySelector('#autocomplete-multiple') as HTMLInputElement;
multipleToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  autocomplete.multiple = selected;
});

const debounceThresholdInput = document.querySelector('#autocomplete-debounce') as HTMLInputElement;
debounceThresholdInput.addEventListener('input', () => {
  autocomplete.debounce = +debounceThresholdInput.value;
});

const autocompleteModeSelect = document.querySelector('#autocomplete-mode') as ISelectComponent;
autocompleteModeSelect.addEventListener('change', ({ detail: mode }) => {
  autocomplete.mode = mode;
});

const optionLimitInput = document.querySelector('#autocomplete-option-limit') as HTMLInputElement;
optionLimitInput.addEventListener('input', () => {
  autocomplete.optionLimit = +optionLimitInput.value;
});

const filterOnFocusToggle = document.querySelector('#autocomplete-filter-on-focus') as HTMLInputElement;
filterOnFocusToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  autocomplete.filterOnFocus = selected;
});

const filterFocusFirstToggle = document.querySelector('#autocomplete-filter-focus-first') as HTMLInputElement;
filterFocusFirstToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  autocomplete.filterFocusFirst = selected;
});

const itemBuilderToggle = document.querySelector('#autocomplete-item-builder') as HTMLInputElement;
itemBuilderToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  autocomplete.optionBuilder = selected ? itemBuilder : undefined;
});

const allowUnmatchedToggle = document.querySelector('#autocomplete-allow-unmatched') as HTMLInputElement;
allowUnmatchedToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  autocomplete.allowUnmatched = selected;
});

const selectedTextBuilderToggle = document.querySelector('#autocomplete-selected-text-builder') as HTMLInputElement;
selectedTextBuilderToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  autocomplete.selectedTextBuilder = selected ? selectedTextBuilder : undefined;
});

const scrollObserverToggle = document.querySelector('#autocomplete-scroll-observer') as HTMLInputElement;
scrollObserverToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  autocomplete.observeScroll = selected;
});

const syncPopupWidthToggle = document.querySelector('#autocomplete-sync-popup-width') as HTMLInputElement;
syncPopupWidthToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  autocomplete.syncPopupWidth = selected;
});

const headerBuilderToggle = document.querySelector('#autocomplete-header-builder') as HTMLInputElement;
headerBuilderToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  autocomplete.popupHeaderBuilder = selected ? headerBuilderCallback : undefined;
});

const footerBuilderToggle = document.querySelector('#autocomplete-footer-builder') as HTMLInputElement;
footerBuilderToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  autocomplete.popupFooterBuilder = selected ? footerBuilderCallback : undefined;
});

const simulateAsyncToggle = document.querySelector('#autocomplete-simulate-async') as HTMLInputElement;
simulateAsyncToggle.addEventListener('forge-switch-change', ({ detail: selected }) => asyncFilter = selected);

const groupToggle = document.querySelector('#autocomplete-group') as HTMLInputElement;
groupToggle.addEventListener('forge-switch-change', ({ detail: selected }) => useGroupedData = selected);

const groupHeaderBuilderToggle = document.querySelector('#autocomplete-group-header-builder') as HTMLInputElement;
groupHeaderBuilderToggle.addEventListener('forge-switch-change', ({ detail: selected }) => useGroupHeaderBuilder = selected);

const secondaryLabelToggle = document.querySelector('#autocomplete-secondary-label') as HTMLInputElement;
secondaryLabelToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  states = selected ? data.map(state => ({...state, secondaryLabel: state.value})) : data;
});


function itemBuilder(option: IListDropdownOption, filterText: string, _listItem: IListItemComponent): HTMLElement {
  const item = document.createElement('div');
  item.style.display = 'flex';
  item.style.alignItems = 'center';

  const avatar = document.createElement('forge-avatar');
  avatar.style.fontSize = '12px';
  avatar.style.setProperty('--forge-avatar-font-size', '12px');
  avatar.text = option.value;
  avatar.style.marginRight = '8px';
  item.appendChild(avatar);

  const label = document.createElement('div');
  label.style.flex = '1';
  label.appendChild(highlightText(option, filterText));
  item.appendChild(label);

  return item;
}

function selectedTextBuilder(selectedOptions: IListDropdownOption[]): string {
  return selectedOptions.map(o => o.label).join(', ');
}

function filterOptions(filter: string, value: string): Promise<IOption[] | IListDropdownOptionGroup[]> | IOption[] | IListDropdownOptionGroup[] {
  console.log('[autocomplete] filter:', filter || null, value);

  if (asyncFilter) {
    // Uncomment to simulate caching filter requests
    // var cachedData = filterCache.get(filter);
    // if (cachedData) {
    //   return useGroupedData ? groupOptions(cachedData) : cachedData;
    // }

    return new Promise(resolve => {
      window.setTimeout(() => {
        const result = executeFilter(filter);
        resolve(useGroupedData ? groupOptions(result) : result);
      }, randomTimeout(250, 1500));
    });
  }
  const options = executeFilter(filter);
  return useGroupedData ? groupOptions(options) : options;
}

function executeFilter(filter: string): IOption[] {
  const filteredData = states.filter(item => {
    return item.label.toLowerCase().includes(filter.toLowerCase());
  });

  if (asyncFilter) {
    if (filterCache.size > 10) {
      Array.from(filterCache.keys())
        .filter(key => !!key)
        .slice(0, 4)
        .forEach(key => filterCache.delete(key));
    }
    filterCache.set(filter, filteredData);
  } else {
    filterCache.clear();
  }

  return filteredData;
}

function groupOptions(options: IOption[]): IOptionGroup[] {
  return options.reduce((prev, curr) => {
    const firstChar = curr.label[0].toUpperCase();
    const existingGroup = prev.find(group => group.text === firstChar);
    if (existingGroup) {
      existingGroup.options.push(curr);
    } else {
      const optionGroup: IListDropdownOptionGroup = { text: firstChar, options: [curr] };
      if (useGroupHeaderBuilder) {
        optionGroup.builder = groupHeaderBuilder;
      }
      prev.push(optionGroup);
    }
    return prev;
  }, []);
}

function groupHeaderBuilder(group: IOptionGroup): HTMLElement {
  const div = document.createElement('div');
  const avatar = document.createElement('forge-avatar');
  avatar.text = group.text;
  avatar.style.fontSize = '12px';
  avatar.style.setProperty('--forge-avatar-font-size', '12px');
  div.appendChild(avatar);
  return div;
}


function highlightText(option: IListDropdownOption, filterText: string): HTMLElement {
  const text = option.label.toLowerCase();
  const startIndex = text.indexOf(filterText.toLowerCase());
  const endIndex = startIndex + filterText.length;
  const span = document.createElement('span');
  span.innerHTML = option.label.substring(0, startIndex) + '<b>' + option.label.substring(startIndex, endIndex) + '</b>' + option.label.substring(endIndex);
  return span;
}


function headerBuilderCallback(): HTMLElement {
  const div = document.createElement('div');
  div.style.padding = '16px';
  div.style.display = 'flex';
  div.style.alignItems = 'center';

  const input = document.createElement('input');
  input.type = 'text';

  const textField = document.createElement('forge-text-field');
  textField.appendChild(input);

  const button = document.createElement('forge-icon-button');
  button.style.marginLeft = '8px';
  button.type = 'button';
  button.addEventListener('click', () => autocomplete.open = false);

  const icon = document.createElement('forge-icon');
  icon.name = 'close';
  button.appendChild(icon);
  
  div.appendChild(textField);
  div.appendChild(button);

  return div;
}

function footerBuilderCallback(): HTMLElement {
  const div = document.createElement('div');
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.padding = '16px';

  const span = document.createElement('span');
  span.textContent = 'Footer element';
  div.appendChild(span);

  return div;
}
