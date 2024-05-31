import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { GLOBAL_THEME_OPTIONS, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';

import '@tylertech/forge/chip-field';

const component = 'forge-chip-field';

const addedAction = action('forge-chip-field-member-added');
const removedAction = action('forge-chip-field-member-removed');

const meta = {
  title: 'Components/ChipField',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    const addMember = (evt: CustomEvent) => {
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

    const removeMember = (evt: CustomEvent) => {
      evt.detail.remove();
      removedAction(evt);
    };

    const onChipRemoveButtonClicked = (evt: Event) => {
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
        <div slot="helper-text">Press enter to create a tag</div>
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
        theme: { control: 'select', options: ['default', ...GLOBAL_THEME_OPTIONS] },
      }
    }),
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
    dense: false,
    popoverIcon: false,
    popoverExpanded: false,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
