import '$src/shared';
import './autocomplete.scss';
import data from './data.json';

// Components
import '@tylertech/forge/avatar';

// Icons
import type { AutocompleteFilterCallback, IAutocompleteComponent } from '@tylertech/forge';
import { IconRegistry, IOption, IOptionGroup } from '@tylertech/forge';
import { IListDropdownOptionGroup } from '@tylertech/forge/list-dropdown';
import { tylIconArrowDropDown } from '@tylertech/tyler-icons/standard';
import { randomTimeout } from '../../src/utils/utils';

IconRegistry.define(tylIconArrowDropDown);

const autocomplete = document.querySelector('#autocomplete') as IAutocompleteComponent;
autocomplete.filter = filterOptions as AutocompleteFilterCallback<string>;

// State
const states = data as IOption[];
let asyncFilter = false;
let useGroupedData = false;
let useGroupHeaderBuilder = false;
const filterCache = new Map();

// Options
const simulateAsyncCheckbox = document.querySelector('#autocomplete-simulate-async') as HTMLInputElement;
simulateAsyncCheckbox.addEventListener('change', () => asyncFilter = simulateAsyncCheckbox.checked);

const groupCheckbox = document.querySelector('#autocomplete-group') as HTMLInputElement;
groupCheckbox.addEventListener('change', () => useGroupedData = groupCheckbox.checked);

const groupHeaderBuilderCheckbox = document.querySelector('#autocomplete-group-header-builder') as HTMLInputElement;
groupHeaderBuilderCheckbox.addEventListener('change', () => useGroupHeaderBuilder = groupHeaderBuilderCheckbox.checked);

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
