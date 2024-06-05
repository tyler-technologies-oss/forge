import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/autocomplete';
import { AutocompleteFilterCallback } from '@tylertech/forge/autocomplete';

const component = 'forge-autocomplete';

const meta = {
  title: 'Components/Autocomplete',
  render: args => {
    const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    const stateFilter: AutocompleteFilterCallback = (filterText: string, value: string) => {
      return states.filter(state => state.toLowerCase().includes(filterText.toLowerCase())).map(state => ({ value: state, label: state }));
    };

    return html`
    <forge-autocomplete
      .debounce=${args.debounce}
      .filterOnFocus=${args.filterOnFocus}
      .filterFocusFirst=${args.filterFocusFirst}
      .mode=${args.mode}
      .multiple=${args.multiple}
      .observeScroll=${args.observeScroll}
      .oberveScrollThreshold=${args.observeScrollThreshold}
      .optionLimit=${args.optionLimit}
      .filter=${stateFilter}>
      <forge-text-field>
        <input type="text" id="state" />
        <label for="state" aria-label="choose state">Choose state</label>
        
        <!-- You can optionally provide a clear button with a data-forge-autocomplete-clear attribute that will be detected automatically. -->
        <forge-icon-button data-forge-autocomplete-clear slot="trailing" dense density="3" aria-label="test">
          <forge-icon name="close"></forge-icon>
        </forge-icon-button>

        <!-- The existence of the data-forge-dropdown-icon attribute controls the open state rotation automatically. -->
        <forge-icon slot="trailing" name="arrow_drop_down" data-forge-dropdown-icon></forge-icon>
      </forge-text-field>
    </forge-autocomplete>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      include: ['allowUnmatched', 'debounce', 'filterOnFocus', 'filterFocusFirst', 'mode', 'multiple', 'observeScroll', 'oberveScrollThreshold', 'optionLimit'],
      controls: {
        mode: {
          control: 'select',
          options: ['default', 'stateless']
        },
        debounce: {
          control: 'number'
        },
        observeScrollThreshold: {
          control: 'number'
        }
      }
    }),
  },
  args: {
    debounce: 500,
    filterOnFocus: true,
    filterFocusFirst: true,
    mode: 'default',
    optionLimit: 10,
    observeScroll: true,
    allowUnmatched: false,
    multiple: false
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
