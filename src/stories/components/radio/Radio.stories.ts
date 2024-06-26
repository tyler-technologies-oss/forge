import { html, nothing } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes, getCssVariableArgs } from '../../utils';

import '@tylertech/forge/radio';
import { styleMap } from 'lit/directives/style-map.js';

const component = 'forge-radio';

const meta = {
  title: 'Components/Radio',
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;

    return html`
      <forge-radio
        name="radios"
        value="1"
        .labelPosition=${args.labelPosition}
        .dense=${args.dense}
        .disabled=${args.disabled}
        .defaultChecked=${args.defaultChecked}
        .readonly=${args.readonly}
        style=${style}>
        Option 1
      </forge-radio>
      <forge-radio
        name="radios"
        value="1"
        .labelPosition=${args.labelPosition}
        .dense=${args.dense}
        .disabled=${args.disabled}
        .defaultChecked=${args.defaultChecked}
        .readonly=${args.readonly}
        style=${style}>
        Option 2
      </forge-radio>
      <forge-radio
        name="radios"
        value="1"
        .labelPosition=${args.labelPosition}
        .dense=${args.dense}
        .disabled=${args.disabled}
        .defaultChecked=${args.defaultChecked}
        .readonly=${args.readonly}
        style=${style}>
        Option 3
      </forge-radio>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['value', 'defaultChecked', 'checked', 'required', 'name', 'labels', 'form'],
      controls: {
        labelPosition: {
          control: 'select',
          options: ['start', 'end']
        }
      }
    })
  },
  args: {
    dense: false,
    disabled: false,
    readonly: false,
    labelPosition: 'end'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
