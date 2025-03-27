import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { generateCustomElementArgTypes, standaloneStoryParams } from '../../utils';
import { AutocompleteFilterCallback, AutocompleteOptionBuilder, IAutocompleteComponent } from '@tylertech/forge/autocomplete';
import { IOption } from '@tylertech/forge/select';
import { createRef, ref } from 'lit/directives/ref.js';
import { storyStyles } from '../../decorators';

import '@tylertech/forge/autocomplete';
import '@tylertech/forge/avatar';

const component = 'forge-autocomplete';

const filterCallbackAction = action('filter callback executed');
const changeAction = action('forge-autocomplete-change');
const selectAction = action('forge-autocomplete-select');
const scrolledBottomAction = action('forge-autocomplete-scrolled-bottom');

const states = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'H' },
  { label: 'New Jersey', value: 'J' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'C' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' }
];

const meta = {
  title: 'Components/Autocomplete',
  decorators: [
    storyStyles(`
      forge-autocomplete {
        width: 256px;
      }
    `)
  ],
  render: args => {
    const filterCb: AutocompleteFilterCallback = (filterText, value) => {
      filterCallbackAction(filterText, value);
      return states.filter(state => state.label.toLowerCase().includes(filterText.toLowerCase()));
    };

    return html`
      <forge-autocomplete
        .debounce=${args.debounce}
        .filterOnFocus=${args.filterOnFocus}
        .filterFocusFirst=${args.filterFocusFirst}
        .mode=${args.mode}
        .multiple=${args.multiple}
        .observeScroll=${args.observeScroll}
        .observeScrollThreshold=${args.observeScrollThreshold}
        .optionLimit=${args.optionLimit}
        .filter=${filterCb}
        .allowUnmatched=${args.allowUnmatched}
        .popupClasses=${args.popupClasses}
        .syncPopupWidth=${args.syncPopupWidth}
        .constrainPopupWidth=${args.constrainPopupWidth}
        .wrapOptionText=${args.wrapOptionText}
        @forge-autocomplete-change=${changeAction}
        @forge-autocomplete-select=${selectAction}
        @forge-autocomplete-scrolled-bottom=${scrolledBottomAction}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: [
        'value',
        'popupTarget',
        'filterText',
        'optionBuilder',
        'filter',
        'selectedTextBuilder',
        'popupElement',
        'beforeValueChange',
        'isInitialized',
        'popupHeaderBuilder',
        'popupFooterBuilder',
        'matchKey',
        'open'
      ],
      controls: {
        mode: {
          control: 'select',
          options: ['default', 'stateless']
        }
      }
    })
  },
  args: {
    debounce: 500,
    filterOnFocus: true,
    filterFocusFirst: true,
    mode: 'default',
    optionLimit: 10,
    observeScroll: true,
    allowUnmatched: false,
    multiple: false,
    syncPopupWidth: false,
    observeScrollThreshold: 100,
    constrainPopupWidth: true,
    wrapOptionText: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const CustomOptions: Story = {
  ...standaloneStoryParams,
  render: () => {
    const filterCb: AutocompleteFilterCallback = filterText => {
      return states.filter(state => state.label.toLowerCase().includes(filterText.toLowerCase()));
    };

    const optionBuilder: AutocompleteOptionBuilder = option => {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.gap = '16px';
      container.style.alignItems = 'center';

      const avatar = document.createElement('forge-avatar');
      avatar.text = option.value.split('').join(' ');
      avatar.letterCount = 2;
      container.appendChild(avatar);

      const text = document.createElement('span');
      text.textContent = option.label;
      container.appendChild(text);

      return container;
    };

    return html`
      <forge-autocomplete .filter=${filterCb} .optionBuilder=${optionBuilder}>
        <forge-text-field show-clear popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `;
  }
};

export const InfiniteScroll: Story = {
  ...standaloneStoryParams,
  render: () => {
    const autocompleteRef = createRef<IAutocompleteComponent>();
    let currentOptions: IOption[] = [];

    const filterCb: AutocompleteFilterCallback = filterText => {
      currentOptions = states.filter(state => state.label.toLowerCase().includes(filterText.toLowerCase())).slice(0, 5);
      return currentOptions;
    };

    const onScrolledBottom = () => {
      const currentLength = currentOptions.length;
      const nextOptions = states.slice(currentLength, currentLength + 5);
      currentOptions = [...currentOptions, ...nextOptions];
      autocompleteRef.value?.appendOptions(nextOptions);
    };

    const beforeClose = () => {
      // Reset the current options when the autocomplete is closed for demo purposes
      currentOptions = [];
    };

    return html`
      <forge-autocomplete
        ${ref(autocompleteRef)}
        observe-scroll
        .filter=${filterCb}
        @forge-autocomplete-scrolled-bottom=${onScrolledBottom}
        .beforeCloseCallback=${beforeClose}>
        <forge-text-field popover-icon>
          <input type="text" id="state" />
          <label for="state" aria-label="choose state">Choose state</label>
        </forge-text-field>
      </forge-autocomplete>
    `;
  }
};
