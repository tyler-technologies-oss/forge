import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { action } from 'storybook/actions';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs, standaloneStoryParams } from '../../utils.js';
import { IOption } from '@tylertech/forge/select';
import { IAutocompleteSelectEventData } from '@tylertech/forge/autocomplete';
import { ref, createRef } from 'lit/directives/ref.js';
import { IChipFieldComponent } from '@tylertech/forge/chip-field';

import '@tylertech/forge/chip-field';
import '@tylertech/forge/autocomplete';

const component = 'forge-chip-field';

const US_STATES: IOption[] = [
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

const addedAction = action('forge-chip-field-member-added');
const removedAction = action('forge-chip-field-member-removed');

const meta = {
  title: 'Components/Chip Field',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    const addMember = (evt: CustomEvent): void => {
      if (evt.target) {
        const chipField = evt.target as HTMLElement;
        const name = evt.detail;
        const newChip = document.createElement('forge-chip');
        newChip.setAttribute('slot', 'member');
        newChip.setAttribute('type', 'field');
        newChip.setAttribute('dense', '');
        newChip.addEventListener('forge-chip-delete', onChipRemoveButtonClicked);
        newChip.value = name;
        newChip.textContent = name;

        chipField.appendChild(newChip);
      }
      addedAction(evt);
    };

    const removeMember = (evt: CustomEvent): void => {
      evt.detail.remove();
      removedAction(evt);
    };

    const onChipRemoveButtonClicked = (evt: Event): void => {
      if (evt.target) {
        const member = evt.target as HTMLElement;
        member.remove();
      }
    };

    return html`
      <forge-chip-field
        .addOnBlur=${args.addOnBlur}
        .floatLabel=${args.floatLabel}
        .labelPosition=${args.labelPosition}
        .labelAlignment=${args.labelAlignment}
        .invalid=${args.invalid}
        .required=${args.required}
        .optional=${args.optional}
        .disabled=${args.disabled}
        .dense=${args.dense}
        .popoverIcon=${args.popoverIcon}
        .popoverExpanded=${args.popoverExpanded}
        .variant=${args.variant}
        .theme=${args.theme}
        .shape=${args.shape}
        .density=${args.density}
        @forge-chip-field-member-added=${addMember}
        @forge-chip-field-member-removed=${removeMember}
        style=${style}>
        <label slot="label" for="tag-input">Tags</label>
        <input type="text" id="tag-input" />
        <div slot="support-text">Press enter to create a tag</div>
      </forge-chip-field>
    `;
  },
  component,
  subcomponents: {
    ['Chip']: 'forge-chip'
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['value', 'popoverTargetElement', 'supportTextInset'],
      controls: {
        labelPosition: { control: 'select', options: ['inline-start', 'inline-end', 'block-start', 'inset', 'none'] },
        labelAlignment: { control: 'select', options: ['default', 'center', 'baseline', 'start', 'end'] },
        variant: { control: 'select', options: ['plain', 'outlined', 'tonal', 'filled', 'raised'] },
        shape: { control: 'select', options: ['default', 'rounded', 'square'] },
        density: { control: 'select', options: ['default', 'extra-small', 'small', 'medium', 'large', 'extra-large'] },
        theme: { control: 'select', options: ['default', ...GLOBAL_THEME_OPTIONS] }
      }
    })
  },
  args: {
    addOnBlur: false,
    floatLabel: false,
    labelPosition: 'inset',
    labelAlignment: 'default',
    invalid: false,
    required: false,
    optional: false,
    disabled: false,
    density: 'default',
    dense: false,
    popoverIcon: false,
    popoverExpanded: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithAutocomplete: Story = {
  ...standaloneStoryParams,
  render: () => {
    const chipFieldRef = createRef<IChipFieldComponent>();
    const selectedAutocompleteValues: string[] = [];

    const filter = (filterText: string): IOption[] => {
      const remainingStates = US_STATES.filter(({ value }) => !selectedAutocompleteValues.includes(value));
      return remainingStates.filter(({ label }) => label.toLowerCase().includes(filterText.toLowerCase()));
    };

    const onSelect = (evt: CustomEvent<IAutocompleteSelectEventData>): void => {
      const exists = selectedAutocompleteValues.includes(evt.detail.value);
      if (!exists) {
        addMember(evt.detail.value);
        selectedAutocompleteValues.push(evt.detail.value);
      }
    };

    function addMember(value: string): void {
      const newChip = document.createElement('forge-chip');
      newChip.setAttribute('slot', 'member');
      newChip.type = 'field';
      newChip.dense = true;
      newChip.value = value;
      newChip.textContent = value;

      newChip.addEventListener('forge-chip-delete', () => {
        newChip.remove();
        selectedAutocompleteValues.splice(selectedAutocompleteValues.indexOf(value), 1);
      });

      chipFieldRef.value?.appendChild(newChip);
    }

    return html`
      <forge-autocomplete .filter=${filter} mode="stateless" @forge-autocomplete-select=${onSelect}>
        <forge-chip-field ${ref(chipFieldRef)} popover-icon show-clear>
          <label slot="label" for="tag-input">Tags</label>
          <input type="text" id="tag-input" />
        </forge-chip-field>
      </forge-autocomplete>
    `;
  }
};
