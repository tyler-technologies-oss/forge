import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { generateCustomElementArgTypes, getCssVariableArgs } from '../../utils.js';

import '@tylertech/forge/radio';

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

export const CSSOnly: Story = {
  parameters: {
    controls: { include: ['dense', 'disabled'] }
  },
  args: {
    dense: false,
    disabled: false
  },
  render: ({ dense, disabled }) => {
    const classes = {
      'forge-radio': true,
      'forge-radio--dense': dense
    };
    return html`
      <div
        role="radiogroup"
        aria-label="Select an option"
        style="display: grid; grid-template-columns: auto auto; inline-size: fit-content; align-items: center;">
        <div class=${classMap(classes)}>
          <input type="radio" name="css-radio" ?disabled=${disabled} id="css-radio-1" />
        </div>
        <label class="forge-typography--label2" for="css-radio-1">Option 1</label>
        <div class=${classMap(classes)}>
          <input type="radio" name="css-radio" ?disabled=${disabled} id="css-radio-2" />
        </div>
        <label class="forge-typography--label2" for="css-radio-2">Option 2</label>
        <div class=${classMap(classes)}>
          <input type="radio" name="css-radio" ?disabled=${disabled} id="css-radio-3" />
        </div>
        <label class="forge-typography--label2" for="css-radio-3">Option 3</label>
      </div>
    `;
  }
};
