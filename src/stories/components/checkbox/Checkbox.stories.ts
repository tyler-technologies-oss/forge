import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';

import '@tylertech/forge/checkbox';

const component = 'forge-checkbox';

const changeAction = action('forge-checkbox-change');

const meta = {
  title: 'Components/Checkbox',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-checkbox
        .checked=${args.checked}
        .indeterminate=${args.indeterminate}
        .disabled=${args.disabled}
        .required=${args.required}
        .readonly=${args.readonly}
        .dense=${args.dense}
        .labelPosition=${args.labelPosition}
        @change=${changeAction}
        style=${style}>
        ${args.label}
      </forge-checkbox>
    `;
  },
  component,
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['defaultChecked', 'value', 'form', 'labels', 'name'],
      controls: {
        labelPosition: { control: 'select', options: ['start', 'end'] }
      }
    }),
    label: { control: 'text' }
  },
  args: {
    label: 'Label',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    readonly: false,
    dense: false,
    labelPosition: 'end'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
