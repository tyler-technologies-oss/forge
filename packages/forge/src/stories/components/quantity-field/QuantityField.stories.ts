import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge/quantity-field';

const component = 'forge-quantity-field';

const changeAction = action('change');
const inputAction = action('input');

const meta = {
  title: 'Components/Quantity Field',
  component,
  render: args => html`
    <forge-quantity-field .invalid=${args.invalid} .required=${args.required}>
      <label slot="label" for="quantity">Quantity</label>
      <input id="quantity" type="number" value="1" aria-label="Set a quantity" step="2" @change=${changeAction} @input=${inputAction} />
      <span slot="support-text">Enter a quantity</span>
    </forge-quantity-field>
  `,
  argTypes: {
    invalid: { control: 'boolean' },
    required: { control: 'boolean' }
  },
  args: {
    invalid: false,
    required: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
