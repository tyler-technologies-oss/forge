import '$src/shared';
import './autocomplete.scss';
import data from './data.json';

// Components
import '@tylertech/forge/autocomplete';
import '@tylertech/forge/label-value';

// Icons
import type { AutocompleteFilterCallback, IAutocompleteComponent, IListItemComponent, ISelectComponent } from '@tylertech/forge';
import { IconRegistry, IOption, IOptionGroup } from '@tylertech/forge';
import { IListDropdownOption, IListDropdownOptionGroup } from '@tylertech/forge/list-dropdown';
import { tylIconArrowDropDown, tylIconClose } from '@tylertech/tyler-icons/standard';
import { randomTimeout } from '../../src/utils/utils';

IconRegistry.define([
  tylIconArrowDropDown,
  tylIconClose
]);

const autocomplete = document.querySelector('#autocomplete') as IAutocompleteComponent;
autocomplete.filter = filterOptions as AutocompleteFilterCallback<string>;

// State
const states = data as IOption[];
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
const multipleCheckbox = document.querySelector('#autocomplete-multiple') as HTMLInputElement;
multipleCheckbox.addEventListener('change', () => {
  autocomplete.multiple = multipleCheckbox.checked;
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

const filterOnFocusCheckbox = document.querySelector('#autocomplete-filter-on-focus') as HTMLInputElement;
filterOnFocusCheckbox.addEventListener('change', () => {
  autocomplete.filterOnFocus = filterOnFocusCheckbox.checked;
});

const itemBuilderCheckbox = document.querySelector('#autocomplete-item-builder') as HTMLInputElement;
itemBuilderCheckbox.addEventListener('change', () => {
  autocomplete.optionBuilder = itemBuilderCheckbox.checked ? itemBuilder : undefined;
});

const allowUnmatchedCheckbox = document.querySelector('#autocomplete-allow-unmatched') as HTMLInputElement;
allowUnmatchedCheckbox.addEventListener('change', () => {
  autocomplete.allowUnmatched = allowUnmatchedCheckbox.checked;
});

const selectedTextBuilderCheckbox = document.querySelector('#autocomplete-selected-text-builder') as HTMLInputElement;
selectedTextBuilderCheckbox.addEventListener('change', () => {
  autocomplete.selectedTextBuilder = selectedTextBuilderCheckbox.checked ? selectedTextBuilder : undefined;
});

const scrollObserverCheckbox = document.querySelector('#autocomplete-scroll-observer') as HTMLInputElement;
scrollObserverCheckbox.addEventListener('change', () => {
  autocomplete.observeScroll = scrollObserverCheckbox.checked;
});

const syncPopupWidthCheckbox = document.querySelector('#autocomplete-sync-popup-width') as HTMLInputElement;
syncPopupWidthCheckbox.addEventListener('change', () => {
  autocomplete.syncPopupWidth = syncPopupWidthCheckbox.checked;
});

const headerBuilderCheckbox = document.querySelector('#autocomplete-header-builder') as HTMLInputElement;
headerBuilderCheckbox.addEventListener('change', () => {
  autocomplete.popupHeaderBuilder = headerBuilderCheckbox.checked ? headerBuilderCallback : undefined;
});

const footerBuilderCheckbox = document.querySelector('#autocomplete-footer-builder') as HTMLInputElement;
footerBuilderCheckbox.addEventListener('change', () => {
  autocomplete.popupFooterBuilder = footerBuilderCheckbox.checked ? footerBuilderCallback : undefined;
});

const simulateAsyncCheckbox = document.querySelector('#autocomplete-simulate-async') as HTMLInputElement;
simulateAsyncCheckbox.addEventListener('change', () => asyncFilter = simulateAsyncCheckbox.checked);

const groupCheckbox = document.querySelector('#autocomplete-group') as HTMLInputElement;
groupCheckbox.addEventListener('change', () => useGroupedData = groupCheckbox.checked);

const groupHeaderBuilderCheckbox = document.querySelector('#autocomplete-group-header-builder') as HTMLInputElement;
groupHeaderBuilderCheckbox.addEventListener('change', () => useGroupHeaderBuilder = groupHeaderBuilderCheckbox.checked);


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
      window.setTimeout(function() {
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
        .filter(function(key) { return !!key; })
        .slice(0, 4)
        .forEach(function(key) {
          filterCache.delete(key);
        });
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

  const button = document.createElement('button');
  button.style.marginLeft = '8px';
  button.type = 'button';
  button.addEventListener('click', () => {
    autocomplete.open = false;
  });

  const icon = document.createElement('forge-icon');
  icon.name = 'close';
  button.appendChild(icon);

  const iconButton = document.createElement('forge-icon-button');
  iconButton.appendChild(button);
  window.requestAnimationFrame(() => {
    iconButton.layout();
  });
  
  div.appendChild(textField);
  div.appendChild(iconButton);

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
