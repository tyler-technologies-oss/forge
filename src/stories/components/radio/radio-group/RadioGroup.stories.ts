import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../../utils';

import '@tylertech/forge/radio';

const component = 'forge-radio-group';

const meta = {
  title: 'Components/Radio/Radio Group',
  render: args => {
    return html`
      <forge-radio-group name="radios">
        <forge-radio
          name="radios"
          value="1"
          .labelPosition=${args.labelPosition}
          .dense=${args.dense}
          .disabled=${args.disabled}
          .defaultChecked=${args.defaultChecked}
          .readonly=${args.readonly}
          >Option 1</forge-radio
        >
        <forge-radio
          name="radios"
          value="1"
          .labelPosition=${args.labelPosition}
          .dense=${args.dense}
          .disabled=${args.disabled}
          .defaultChecked=${args.defaultChecked}
          .readonly=${args.readonly}
          >Option 2</forge-radio
        >
      </forge-radio-group>
    `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['form', 'labels', 'name']
    })
  },
  args: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
