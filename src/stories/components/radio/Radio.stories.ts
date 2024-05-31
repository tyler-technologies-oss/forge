import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../utils';

import '@tylertech/forge/radio';

const component = 'forge-radio';

const meta = {
  title: 'Components/Radio',
  render: args => {
    return html`
      <forge-radio 
        name="radios"
        value="1"
        .labelPosition=${args.labelPosition}
        .dense=${args.dense}
        .disabled=${args.disabled}
        .defaultChecked=${args.defaultChecked}
        .readonly=${args.readonly}>Option 1</forge-radio>
        <forge-radio 
        name="radios"
        value="1"
        .labelPosition=${args.labelPosition}
        .dense=${args.dense}
        .disabled=${args.disabled}
        .defaultChecked=${args.defaultChecked}
        .readonly=${args.readonly}>Option 2</forge-radio>
      `;
  },
  component,
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      exclude: ['value', 'checked', 'required'],
      controls: {
        labelPosition: {
          control: 'select',
          options: ['start', 'end'],
        },
      },
    }),
  },
  args: {

  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
